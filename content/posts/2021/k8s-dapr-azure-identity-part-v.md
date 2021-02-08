---
title: Kubernetes, DAPR, and Azure Identity Example - Part V
date: 2021-02-12T06:00:00.000Z
tags:
  - Kubernetes
  - DAPR
  - Azure
  - Identity
---

This post will incorporate [DAPR](https://dapr.io/) services into the application.

The source related to this post is contained in the [`azure-and-dapr-identity-example`](https://github.com/dfbaskin/azure-and-dapr-identity-example) repo.

## Installing DAPR Into the Cluster

There are a few scripts that you can run to initialize DAPR into the cluster:

```
packages/dapr-initialization/initialize-dapr.ps1
packages/dapr-initialization/initialize-dapr-redis.ps1
```

These scripts just encapsulate the initialization steps described in the DAPR documentation. They also create create [REDIS](https://redis.io/) servers for state management and pub/sub events.

To ensure that DAPR is up an running you can run and view the DAPR dashboard using:

```
packages/dapr-initialization/show-dapr-dashboard.ps1
```

## Incorporating DAPR

Up to this point, everything we've done has just been using Kubernetes. DAPR was not involved.

DAPR provides a number of [building blocks](https://docs.dapr.io/developing-applications/building-blocks/) that solve common development challenges for distributed applications. We will be using [Service Invocation](https://v1-rc3.docs.dapr.io/developing-applications/building-blocks/service-invocation/service-invocation-overview/) which gives us service discovery, which will automatically route requests on the Ingress for user APIs without requiring us to code the routes between services manually.

It also gives us [service-to-service security](https://v1-rc3.docs.dapr.io/developing-applications/building-blocks/service-invocation/service-invocation-overview/#service-to-service-security). Previously we were doing TLS termination and traffic within our cluster was unencrypted. DAPR [protects communciations between the sidecars](https://v1-rc3.docs.dapr.io/concepts/security-concept/#sidecar-to-sidecar-communication) using [mutual TLS](https://en.wikipedia.org/wiki/Mutual_authentication). This gives us another layer of security, communications are encrypted and caller and callee both identify themselves to the other. Note that this is mutually verifying the identities of the applications themselves, not the identity of the user accessing the service – which is still handled as before using identity flows.

To get the DAPR runtime to create the sidecars, we just annotate our deployments with additional DAPR-specific configuration. This will include updating the Users API definitions and the Ingress definitions.

### User API

For the Users API we add this configuration to the deployment definition.

```
annotations:
  dapr.io/enabled: "true"
  dapr.io/app-id: "users-api"
  dapr.io/app-port: "80"
```

We no longer need the service and ingress definitions for the API. We can remove these from the cluster (from our previous work) by using the commands:

```
kubectl delete svc users-api-service -n azure-dapr-identity-example
kubectl delete ing users-api-ingress -n azure-dapr-identity-example
```

### Ingress

For the Ingress, we no longer need the mergeable ingress definitions. We will annotate the Ingress depolyment to allow the DAPR runtime to determine the location of the services (though we will still route requests for static web assets to the NGINX server).

We can remove the front end and master ingress definitions from the cluster (from our previous work) by using the command:

```
kubectl delete ing frontend-ingress -n azure-dapr-identity-example
kubectl delete ing example-application-ingress-master -n azure-dapr-identity-example
```

Since the NGINX Ingress controller was installed using a Helm chart, we update the annotations that are supplied to the chart (in `packages/nginx-ingress/ingress-config-template.yaml`):

```
pod:
  annotations:
    dapr.io/enabled: "true"
    dapr.io/app-id: "nginx-ingress"
    dapr.io/app-port: "80"
```

We also update the ingress definition itself:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-application-ingress
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - testing.local
      secretName: example-app-ingress-nginx-ingress-default-server-tls
  rules:
    - host: testing.local
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: frontend-service
                port:
                  number: 80
          - path: /v1.0/invoke
            pathType: Prefix
            backend:
              service:
                name: nginx-ingress-dapr
                port:
                  number: 80
```

This definition defines two paths, the `/` path just routes requests for the static web assets to the NGINX server. The second path redirects all service invocations (in DAPR service invocations are prefixed with `/v1.0/invoke`) to the DAPR sidecar, which then routes the request to the correct endpoint within the cluster.

By doing this, we delegate all incoming service invocations to the DAPR runtime. DAPR does the hard part of figuring out where those services actually live.

## Change in API Endpoints

Finally, this changes the end points of the users API. Previously our endpoints were:

- `/api/config/auth`
- `/api/ping`
- `/api/current-user/me`

DAPR now augments the endpoints to be more "disoverable". We added a DAPR application id to the users API in the annotation:

```
  dapr.io/app-id: "users-api"
```

DAPR will use this application id in the endpoint URL:

- `/v1.0/invoke/users-api/method/api/config/auth`
- `/v1.0/invoke/users-api/method/api/ping`
- `/v1.0/invoke/users-api/method/api/current-user/me`

Note that this did not require changes to the Users WEB API application, only to its deployment definition.

Of course, the changes to the endpoints do require a change to our front end application as well.

## Running the Updated Application

Make sure the previous definitions are deleted (as described above), then run the following scripts to update the cluster:

```
packages/users-api/deploy/initialize-users-api.ps1
packages/browser-frontend/deploy/build-frontend-image.ps1
packages/browser-frontend/deploy/initialize-frontend.ps1
packages/users-api/deploy/initialize-users-api.ps1 -Upgrade
```

Then navigate to [https://testing.local:31001/](https://testing.local:31001/).

Finally, we can still run the web application locally outside of the cluster but redirect API requests to the cluster by updating the proxy configuration:

```
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1.0",
    createProxyMiddleware({
      target: "https://testing.local:31001",
      changeOrigin: true,
      secure: false,
    })
  );
};
```

Also, you can run the DAPR dashboard to see the components we've added:

```
packages/dapr-initialization/show-dapr-dashboard.ps1
```
