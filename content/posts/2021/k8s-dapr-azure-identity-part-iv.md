---
title: Kubernetes, DAPR, and Azure Identity Example - Part IV
date: 2021-02-11T06:00:00.000Z
tags:
  - Kubernetes
  - DAPR
  - Azure
  - Identity
---

This post will step through setting up simple back end services, including a configuration service as well as services that require user authentication. It will also include a service that calls the Microsoft Graph on behalf of the authenticated user.

We will be using [.NET Core v5](https://docs.microsoft.com/en-us/dotnet/core/dotnet-five) application to implement the Web API.

The source related to this post is contained in the [`adding-users-api`](https://github.com/dfbaskin/azure-and-dapr-identity-example/tree/adding-users-api) branch of the repo.

## Adding an API Scope

To protect our API, we'll need a scope that is related to our application and the services that it exposes. Details about this are included in these links:

- [Protected Web API Registration](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-protected-web-api-app-registration) - details about exposing delegated permissions (i.e. scopes) for our API.

- [Verifying Scopes](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-protected-web-api-verification-scope-app-roles) - how the back end should verify the scope when an API is called.

- [Protecting Web API .NET Core](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v2-aspnet-core-web-api) - details about features available in .NET core that can be used to protect a web API.

We will also need some additional setup to allow the Web API to call the Microsoft Graph "Me" method on behalf of the authenticated user. Additional details about configuring on-behalf-of flow are included in these links:

- [On-Behalf-Of Flow](https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-on-behalf-of-flow) - details about the on-behalf-of flow.

- [.NET Core On-Behalf-Of](https://docs.microsoft.com/en-us/azure/active-directory/develop/scenario-web-app-call-api-app-configuration?tabs=aspnetcore) - details about features available in .NET Core that can be used to make web API calls on behalf of the authenticated user.

- [Adding a Client Secret](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app#add-a-client-secret) - details about creating a client secret that will be used in the on-behalf-of flow.

Specifically, to configure the example application:

- Update the `app-config.json` file to include the API scope that you created and the `azureAD` configuration.

```
{
  "authentication": {
    "clientId": "f7edc002-e261-42e5-9140-8dde2e83260c",
    "authority": "https://login.microsoftonline.com/fa1ee923-839f-4da5-a453-6eefaf3c9699/",
    "apiScope": "api://f7edc002-e261-42e5-9140-8dde2e83260c/access_as_user"
  },
  "azureAD": {
    "clientId": "f7edc002-e261-42e5-9140-8dde2e83260c",
    "tenantId": "fa1ee923-839f-4da5-a453-6eefaf3c9699",
    "instance": "https://login.microsoftonline.com/"
  }
}
```

- Create a client secret and also an additional file, `app-config.secrets.json`, where you record this secret.

```
{
  "azureAD": {
    "clientSecret": "...client secret..."
  }
}
```

## The Users API

The API includes three endpoints:

- `/api/config/auth` - retreives configuration for signing in the user.

- `/api/ping` - a simple service that sends back a response with a timestamp and the current authenticated user's name.

- `/api/current-user/me` - a service that calls the Microsoft Graph "Me" method on behalf of the authenticated user.

### `/api/config/auth`

Previously we had coded the authentication configuration directly into the web application. Now we've changed the application to pull this information from the API.

```
[HttpGet]
[AllowAnonymous]
[Route("auth")]
public async Task<AuthConfig> Get()
{
    return await AppConfig.GetAuthenticationConfiguration();
}
```

Which just pulls the data from our app configuration:

```
public Task<AuthConfig> GetAuthenticationConfiguration()
{
    return Task.FromResult(new AuthConfig
    {
        ClientId = Config["authentication:clientId"],
        Authority = Config["authentication:authority"],
        ApiScope = Config["authentication:apiScope"],
    });
}
```

### `/api/ping`

The ping service just returns a response with a timestamp and the authenticated user's name (from the claims provided by the authentication token).

```
[HttpGet]
[Route("ping")]
public PingResponse Ping()
{
    return new PingResponse
    {
        Timestamp = DateTime.UtcNow,
        UserName = User.Claims
            .Where(c => c.Type == "name")
            .Select(c => c.Value)
            .FirstOrDefault()
    };
}
```

### `/api/current-user/me`

To authenticate users and call the Microsoft Graph on behalf of the user, middleware is included to add configuration and acquire tokens for the downstream API.

```
services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(Configuration, "AzureAd")
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddInMemoryTokenCaches();
```

The `user.read` permission has delegated access so the web API can request access on behalf of the user. The middleware handles the on-behalf-of flow behind the scenes and provides an access token that is used when calling the Microsoft Graph API.

```
private static readonly string[] requiredScopes = new string[] { "access_as_user" };
private static readonly string[] apiScopes = new string[] { "user.read" };

[HttpGet]
[Route("me")]
public async Task<IActionResult> Me(CancellationToken cancellationToken)
{
    HttpContext.VerifyUserHasAnyAcceptedScope(requiredScopes);
    string accessToken = await Tokens.GetAccessTokenForUserAsync(apiScopes);

    using var reqMsg = new HttpRequestMessage(HttpMethod.Get, "https://graph.microsoft.com/v1.0/me");
    reqMsg.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
    using var rspMsg = await Client.SendAsync(reqMsg, HttpCompletionOption.ResponseContentRead, cancellationToken);
    rspMsg.EnsureSuccessStatusCode();
    return new ContentResult
    {
        Content = await rspMsg.Content.ReadAsStringAsync(),
        ContentType = MediaTypeNames.Application.Json,
        StatusCode = (int)HttpStatusCode.OK,
    };
}
```

We are using a simple HTTP Client request rather than the more full-featured Microsoft Graph client in order to show the details of the operation.

## Running the Web API Server Locally

We can still run the web application and the users API on our local machine outside of Kubernetes. This requires updating the `packages/browser-frontend/src/setupProxy.js` file so that the requests will be proxied to our users API server.

```
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:31003",
      changeOrigin: true,
    })
  );
};
```

Then run two commands:

- `npm start` (in the `packages/browser-frontend` path)
- `dotnet start` (in the `packages/users-api` path)

Navigate to [https://testing.local:3000/](https://testing.local:3000/) and sign into the application and test the API calls to verify everything is working.

> _It's worth mentioning here that if you are running on a Windows 10 box, I highly recommend using [Microsoft Terminal](https://github.com/microsoft/terminal) for your command-line work. You can even script it to [open multiple tabs in different directories, each running its own command](https://gist.github.com/dfbaskin/033f8c81582fd310a428e302a60dca7c)._

## Building the Users API Container Image

Like we did for the static web assets, we need to build another image for the users API. The `Dockerfile` that describes this image uses a .NET v5 runtime image where the artifacts of the users API build will be copied. The `ENTRYPOINT` then specifies how the web API server is started.

```
FROM mcr.microsoft.com/dotnet/aspnet:5.0
COPY ./build/ App/
WORKDIR /App
ENTRYPOINT ["dotnet", "ExampleApp.Users.dll"]
```

To build the User API web application and the container image, run the script:

```
packages/users-api/deploy/build-users-api-image.ps1
```

This script builds the application then runs `docker build` to build the container image. An alternative approach is to build the application [within a container itself](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-5.0#the-dockerfile), which then subequently builds the container image.

## Updating the Ingress

Before adding the new image to the Kubernetes cluster, we need to update the ingress definitions so that incoming requests are routed to both the NGINX server for the static web assets and the new Users API web server.

We could add an additional path to our Ingress definition we created previously. But then we have a single definition that must always change as new services are added.

A better solution is to use [Mergable Ingress resources](https://docs.nginx.com/nginx-ingress-controller/configuration/ingress-resources/cross-namespace-configuration/) in the NGINX Ingress Controller definition. This allows us to [split the definition](https://github.com/nginxinc/kubernetes-ingress/tree/master/examples/mergeable-ingress-types) into a "master" definition and multiple "minion" definitions.

In our example, the "master" definition will define the TLS termination and the host name:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: example-application-ingress-master
  annotations:
    nginx.org/mergeable-ingress-type: master
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - testing.local
      secretName: example-app-ingress-nginx-ingress-default-server-tls
  rules:
    - host: testing.local
```

There are two "minion" definitions, one for the static web assets:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: frontend-ingress
  annotations:
    nginx.org/mergeable-ingress-type: minion
spec:
  ingressClassName: nginx
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
```

And another for the new Users API:

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: users-api-ingress
  annotations:
    nginx.org/mergeable-ingress-type: minion
spec:
  ingressClassName: nginx
  rules:
    - host: testing.local
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: users-api-service
                port:
                  number: 80
```

The users API gets all requests starting with the path `/api` and the front end (NGINX) application gets everything else. To the front end application, this ingress definition makes it appear to be a single web site even though it is running separate services within the cluster. So there is no [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) configuration required either.

Of course, the front end application could access other web APIs outside of this system (as it does querying the Microsoft Graph API, for example). So it is not a requirement to configure your application this way.

In the next post we will show how DAPR can provide an abstraction around these endpoints so that we do not have to declare the routing explicitly.

## Updating the Kubernetes Cluster

Now that all the pieces are in place, we can update the Kubernetes cluster. First the users API:

```
packages/users-api/deploy/build-users-api-image.ps1
packages/users-api/deploy/initialize-users-api.ps1
```

Then the front end application:

```
packages/browser-frontend/deploy/build-frontend-image.ps1
packages/browser-frontend/deploy/initialize-frontend.ps1
```

And finally the ingress (from the `packages/nginx-ingress` path):

```
kubectl apply -f ingress-master.yaml -n azure-dapr-identity-example
```

Navigate to [https://testing.local:31001/](https://testing.local:31001/) to access the application within the Kubernetes cluster.

Next up, we will incorporate the DAPR runtime into our application.
