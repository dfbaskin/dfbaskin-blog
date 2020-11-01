---
title: Deploying an ES6, JSPM, NodeJS Application to Azure
date: 2015-06-03T10:59:36.152Z
tags:
  - Node
  - ES6
  - JSPM
---

I have a simple NodeJS application that I want to deploy to [Microsoft Azure](http://azure.microsoft.com/en-us/).
Fortunately, there already exists
[detailed instructions](http://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/),
on how to accomplish this. But I want to add a couple of extra things. The Node application will be written using
[ES6](https://github.com/lukehoban/es6features), the latest version of Javascript, and also use
[JSPM](http://jspm.io/), a newer generation package manager for Javascript components.

Why do we need a new package manager? Doesn't [Bower](http://bower.io/) and [Browserify](http://browserify.org/)
already serve this purpose well? Yes, but JSPM brings a few more useful ideas to the table:

- JSPM pulls components directly from their source, either GitHub or NPM, rather than having to package
  components with a separate registration file.
- JSPM integrates with [Babel](https://babeljs.io/) to automatically compile ES6 source. The compilation
  of the source can happen in the browser (so that a build step is not required) or as part of
  generating a web application to be deployed in a production environment.

- JSPM (through the [SystemJS universal module loader](https://github.com/systemjs/systemjs))
  supports different module formats, such as ES6, AMD, or CommonJS, so your code works well
  with existing code. SystemJS also supports a plugin system that can do things like loading CSS
  style sheets dynamically.

### The AngularJS Application

The application to be deployed is [here](https://github.com/dfbaskin/angular-node-cookbook). It is a simple
AngularJS application. Since it is written in ES6, the way the application comes to life is a little bit
different from the more common AngularJS pattern of using the `ng-app` attribute.

This is a portion of the main HTML page:

```html
<body ng-controller="mainCtrl as vm" class="ng-cloak">
  <h1>Hello!</h1>

  <p>{{vm.message}} {{vm.today | date:'fullDate'}}</p>

  <script src="jspm_packages/system.js"></script>
  <script src="config.js"></script>
  <script>
    Promise.all([System.import("angular"), System.import("js/app/mainCtrl")])
      .then(function (modules) {
        var angular = modules[0];
        angular.bootstrap(document, ["mainApp"]);
      })
      .catch(function (err) {
        console.log("Bootstrap error:");
        console.log(err);
      });
  </script>
</body>
```

You see the controller, `mainCtrl`, but there is no `ng-app` attribute.
Since the application's modules are loaded dynamically, the bootstrap process needs to wait
until these source files are loaded. JSPM incorporates the
[SystemJS universal module loader](https://github.com/systemjs/systemjs) to load
modules dynamically, including the Angular code and the main controller (which, in turn, loads
other dependencies, like the application's Angular module). A call to the `anglar.bootstrap`
function initializes and runs the application.

The main controller simply sets a couple of properties that are bound in the view. We still have
to use the same module syntax for AngularJS (at least until Angular 2 is available), but we can
use the ES6 `import` syntax to load dependencies.

```javascript
import appModule from "./appModule";

class MainCtrl {
  constructor() {
    this.message = "Today is";
    this.today = new Date();
  }
}

appModule.controller("mainCtrl", [MainCtrl]);
```

### Deploying to Azure

These
[instructions](http://azure.microsoft.com/en-us/documentation/articles/web-sites-nodejs-develop-deploy-mac/)
provide steps to deploying a Node application to Azure. Azure provides
a Git repository that you can push to from your local repository or other Git repository.

If we follow these steps with our AngularJS application, it will deploy but it won't run correctly.
The application will not be able to load the Javascript code that it needs.
The problem is that we need an extra step in our deployment.

Normally, a NodeJS application's dependencies, the modules organized under the `node_modules` path,
are not a part of the files stored in source control. Part of deploying the application is to pull down these
node modules using the `npm install` command.

With `jspm`, we would use the same workflow by using the `jspm install` command. To do this we'll need
to customize the script used by Azure when deploying the application.

Microsoft has provided the
[Azure Command Line Interface](https://azure.microsoft.com/en-us/documentation/articles/xplat-cli-install/)
to help with this. This tool provides a cross-platform command-line interface to manage Azure assets
(more details [here](https://azure.microsoft.com/en-us/documentation/articles/virtual-machines-command-line-tools/)).

The command we are interested in is:

```
azure site deploymentscript --node --scriptType bash
```

This command creates two files, `.deployment` and `deploy.sh`. The first file is a deployment
configuration file that points to the second file, a bash script that executes deployment steps.
(In this case we are using a bash script, but this command can also generate a Windows `.cmd`
batch script type.)

In the script we can see where the Node package dependencies are installed:

```bash
# 3. Install npm packages
if [ -e "$DEPLOYMENT_TARGET/package.json" ]; then
  cd "$DEPLOYMENT_TARGET"
  eval $NPM_CMD install --production
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi
```

We need to do a similar thing with JSPM packages by adding the JSPM install command (after
the node packages are installed):

```
  eval "node_modules/.bin/jspm" install
  exitWithMessageOnError "jspm failed"
```

One more thing we will need to do is to tell Azure what version of Node we are interested
in using. We can update our `package.json` file to add the following:

```javascript
  "engines": {
    "node": "0.12.x"
  },
```

Now we can push our changes (via Git) up to Azure, the deployment script will install our
dependencies, and the application will be live on Azure.

```
--> git push azure master
...
remote: ok   Installed babel-runtime as npm:babel-runtime@^5.1.13 (5.4.2)
remote: ok   Installed github:jspm/nodelibs-process@^0.1.0 (0.1.1)
remote: ok   Installed babel as npm:babel-core@^5.1.13 (5.4.2)
remote: ok   Installed npm:process@^0.10.0 (0.10.1)
remote: ok   Installed core-js as npm:core-js@^0.9.4 (0.9.10)
remote: ok   Loader files downloaded successfully
remote:
remote: Finished successfully.
remote: Deployment successful.
```

### Production Deployment

One last step we can do is publish our application in "production" mode. The application as
deployed above compiles Javascript from ES6 into ES5 on the fly. This is fine when developing
the application, but this additional compile step should not be part of a production release.

There are
[different ways](https://github.com/jspm/jspm-cli/wiki/Production-Workflows)
that JSPM can be used to create a production deployment. We'll use the
self-executing bundle as our example.

```
jspm bundle-sfx js/app/mainCtrl src/js/app-bundle.js
```

This combines the AngularJS code and our application code into a single, pre-compiled file.
Then, instead of using `System.import`, we include the script directly and then call the
Angular bootstrap function.

```html
<script src="js/app-bundle.js"></script>
<script>
  angular.bootstrap(document, ["mainApp"]);
</script>
```

(Note, I created a separate index page, `index-with-bundle.html`, so that you can see
the difference in the HTML when using this bundle.)
