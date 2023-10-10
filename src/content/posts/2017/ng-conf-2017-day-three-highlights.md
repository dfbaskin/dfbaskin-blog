---
title: NG-CONF 2017 Day Three Highlights
slug: ng-conf-2017-day-three-highlights
pubDate: 2017-04-11T14:34:46.232Z
tags:
  - ng-conf
  - Angular
---

## Keynote

[Brad Green](https://twitter.com/bradlygreen) spent some time discussing how Google as a company is fully embracing Angular as an application development framework. In fact, the goal is to have all web application development within Google to be using Angular by the end of 2017. He also explained that it makes sense for them to invest so many resources into Angular as an open-source project because of the additional benefits to Google itself. The primary benefit is the large ecosystem that has grown around Angular. Libraries and tools would probably not exist if Angular was simply an internal Google project. In addition, Google has built several tools internally that have been reproduced in other open-source projects. It makes sense that there is benefit to sharing these efforts with the community. It also helps with hiring within Google, where proprietary in-house tools require additional training and ramp-up for new hires. And, of course, the overall quality of the source code is improved by the great feedback received from the community through PRs, documentation, and training.

For example, the Angular team originally went down the path of creating its own JavaScript super-set called [AtScript](https://docs.google.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/mobilebasic?viewopt=127). It became evident that [TypeScript](https://www.typescriptlang.org/) was a more viable option, though, so the Angular team abandoned this effort and fully embraced TypeScript. Interestingly though, behind the scenes at Google, there was a formal process for approving a new development language and TypeScript needed to go through this process to gain approval for use in Google projects. It turned out, however, that this process had been set up but nobody had attempted to walk through it. TypeScript was the first to go through this process. But after much back and forth over two years, the process was completed and TypeScript was finally approved.

Google over the years has also implemented tools to build JavaScript applications at a very large scale and tools like the [Angular CLI](https://cli.angular.io/) were not really appropriate for building applications within Google. A tool named “Blaze” is what is currently used for these builds. But they are beginning to open source components of this tool in a project called the [“Bazel”](https://bazel.build/) (the name “Blaze” with letters rearranged).

[Rob Wormald](https://twitter.com/robwormald) then focused on the goals of the Angular project in general. He talked about three general categories of web applications, highly interactive sites (like a commerce application and shopping cart), mostly static sites (like a blog), and mixtures of interactive and static content. Whatever the application, Google’s own analysis has shown that users expect a web page to display in less than two seconds and will most likely abandon the page if it takes longer than three seconds. Rob emphasized that a goal for the Angular project was to help make web applications that meet these expectations.

So, improvements have been made to what was formerly called Angular Universal and brought in under the main core framework as the [platform-server](https://github.com/angular/angular/tree/master/packages/platform-server) package. Functionality has been added to support these scenarios, allowing the construction of the page server-side, rendering to more complete HTML before being delivered to the browser. (_More details below._)

## Upgrade Story

[“AngularJS”](https://angularjs.org/) is the name that is used for Angular version 1 applications, [“Angular”](https://angular.io/) is the name for all other versions. If you’ve already started a project in AngularJS, there is a path to upgrading the application to “Angular” through the [NgUpgrade](https://angular.io/docs/ts/latest/guide/upgrade.html) module. This module allows you to run both AngularJS and Angular components within the same application at the same time (you end up with two “instances” of the Angular framework running together). It allows you to share components and services between the instances of AngularJS and Angular. It also allows you to share routes between them.

[Victor Savkin](https://twitter.com/victorsavkin) gave some practical instructions for upgrading your application. You could approach upgrading using “vertical slicing” where overall features of the application are upgraded individually. Or approach using “horizontal slicing” where individual components and services are upgraded. There are also different ways that you might arrange the routing within the application.

Whatever approach you take, components and services can be upgraded to be used by Angular or downgraded to be used by AngularJS. This should give you a good iterative way to progressively migrate your application over to the latest version.

## Pre-Rendering

[Jeff Cross](https://twitter.com/jeffbcross) dug more deeply into pre-rendering, the process of generating more complete HTML before the content is sent to the browser. The NodeJS-based server module (in the platform-server package) provides services for rendering an Angular application offline. It also provides functionality that can deal with HTTP requests and routing as well.

The main reasons for pre-rendering are ensuring that your application can to load and become interactive as quickly as possible, to allow the pages to be scrapeable (i.e. in order to display the preview pane you see in other applications like Twitter or Facebook), and to allow the pages to be crawlable (i.e. for Search Engine Optimization).

Jeff displayed a graph with axes of “Completeness” vs. “When Rendered”. How much pre-rendering you might do in your application depends on different factors, such as the number of pages that are included, the volume of content, localization used, the amount of user-customized content, the freshness of the data, and the frequency of deployment and rebuilding content.

An additional consideration is what to do with user-generated events that occur before the page has been made fully interactive (i.e. before the Angular application has been bootstrapped and is fully functional). If the user begins typing or clicking on the page before it is ready, what should happen? To address this, a component called [“preboot”](https://github.com/angular/preboot) is used to record these user events and then play them back accordingly. This does require some careful consideration of exactly what happens, though.

Right now, the documentation for the pre-rendering functionality is not yet available, but it should be included on the [Angular.io](https://angular.io/) site soon.

## Packaging Libraries

The Angular team has put together [a specification](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/preview) for the requirements and best practices of building packages that can be used as libraries within Angular applications. There are a number of things that should be included in a library package such as TypeScript definition files (`*.d.ts`) and a `*.metadata.json` file. Common packages that are used by the library should be added as peer dependencies in the project’s `package.json` file. The Angular compiler, [ngc](https://github.com/angular/angular/tree/master/packages/compiler-cli), which wraps the TypeScript compiler, can be used to build the artifacts required for the library.

To take advantage of optimizations like tree shaking, the recommendation is to create a single [NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html) for each component within the library. Having multiple (or all) components in the library within a single NgModule will end up bringing in code that may not be used by the consumer of the library.

## Other Highlights

- The [Angular Language Service](https://github.com/angular/vscode-ng-language-service) can be used in our code editors to help with code completion, errors, and references between components and templates. This service is available in Visual Studio Code and WebStorm and will be available for other editors soon.

- If you’ve used the [Redux](http://redux.js.org/) library in your application, you have probably also used selectors from the [Reselect](http://redux.js.org/docs/recipes/ComputingDerivedData.html) library. [Kara Erickson](https://twitter.com/karaforthewin) demonstrated using selectors for form validations when building [reactive forms](https://angular.io/docs/ts/latest/guide/reactive-forms.html). But she also talked about how reactive forms will be moving towards using [observable streams](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754) for validations rather than the current implementation. This gives complete control over form validation, including debouncing frequent field changes, prioritizing asynchronous validations, and presenting errors less frequently. It also allows for push validations, i.e. validations that come from the server (for example, the highest bid for a product has changed and a current bid is no longer valid).
