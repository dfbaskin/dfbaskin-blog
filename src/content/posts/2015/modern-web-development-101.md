---
title: Modern Web Development 101
slug: modern-web-development-101
pubDate: 2015-02-08T08:15:01Z
tags:
  - Web
  - Build
  - Javascript
  - Web Applications
---

Maybe you've heard the term "Modern Web" before. It embodies the idea of a constantly evolving, exciting platform that unique and powerful user experiences can be built upon. It is a platform that new capabilities are added to regularly, not waiting for long release cycles.

And maybe you've been asked to build a "modern web application".

So what does that mean exactly? Perhaps you've already got a few HTML pages, some nice-looking CSS along with pleasing images, and some Javascript to give the pages that extra little pizzazz. What else do you need?

Let's look at what a Modern Web Application might look like, considering only the pieces that are loaded into the browser (the client-side pieces), putting aside for now the whole story about what is running on the web server itself.

## Client-Side Code

[Javascript](http://en.wikipedia.org/wiki/JavaScript) is the language that the browser knows how to speak. It is a dynamic language, meaning that it doesn't get compiled first, like a Java or C# application would. A compilation step helps identify certain types of errors in your code, but with Javascript, you'll need additional help in determining whether your code is correct or not.

Some choose to do this with the language itself. Instead of using Javascript, they will use a language that ultimately gets compiled into Javascript and (perhaps) smooths out some of Javascript's rough edges. For example, [CoffeeScript](http://coffeescript.org/) defines a syntax that is simpler to use so there is less to type and thus you might introduce fewer typing errors. [TypeScript](http://www.typescriptlang.org/) defines additional annotations that can help ensure that variables and parameters are of the expected type. Google created [Dart](https://www.dartlang.org/) to define a more structured way to approach problems of large-scale Javascript applications.

Meanwhile, the ECMA Script committee has been busy finalizing ECMAScript 6. This is the next version of Javascript that brings new features (classes, arrow functions, spread operators, generator functions) and standardizes some techniques that are already in wide use (promises, modules). Existing libraries will be (and have already been) ported over to this new version of the language.

A next step is analyzing the code itself. In Javascript, you won't get the full level of static analysis that you can get in a compiled language, but you can certainly check for many issues in your code related to syntax, variable declaration and scoping, and coding style. Tools like [JSHint](http://jshint.com/about/) and [ESLint](http://eslint.org/docs/about/) can take a close look at your code and identify many issues that might cause your application to fail at runtime.

If you really want to track the health of your source code, a tool like [Plato](https://github.com/es-analysis/plato) can be used to analyze the complexity and overall maintainability of your code. Taking snapshots of your code through this tool helps you determine if your team is heading in the right direction while maintaining and enhancing the code.

## Unit Testing

The primary way to validate your code is, of course, testing. [Test-Driven Development](http://en.wikipedia.org/wiki/Test-driven_development) (TDD) is a lifestyle for many teams and testing is especially important for Modern Web applications due to the heavy use of client Javascript code. But testing for a web application can be difficult if your application is not architected well.

Many applications intermix code that interacts with the browser's DOM (Document Object Model) with code that performs business logic with code that calls web APIs. In these cases it's very hard to test the code in isolation. There are too many overlapping concerns that tests cannot be easily written to verify that the code is working correctly. Too often in the face of this, teams just abandon testing - at least all but the most laborious manual testing delegated to the unfortunate QA team.

If you do apply a bit of rigor to your development, you should be able to create isolated components. Then you can write tests using one of many testing frameworks. [Jasmine](http://jasmine.github.io/2.2/introduction.html), [Mocha](http://mochajs.org/), and [QUnit](http://qunitjs.com/) are all popular testing frameworks. These are generally used to create Unit Tests, which differ from end-to-end or integration tests in that the goal is to test a single component in isolation, usually mocking the dependencies that the component may have.

When you mock a dependency within a unit test, you are simulating an expected result the dependency might produce or just verifying that the component that is under test used the dependency in the expected manner. [Jasmine](http://jasmine.github.io/2.2/introduction.html) has "spies" that can be used for this purpose, but other libraries exist that provide additional mocking functionality as well, like [Sinon.JS](http://sinonjs.org/).

Writing the tests is one task for your project, but there are also tools that help you run the tests, even automatically after you save files within your editor. A tool like [Karma](http://karma-runner.github.io/0.12/index.html) can watch for changes in your source code and automatically run the tests, giving you immediate feedback if your changes have inadvertently broken something. Systems like [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/) can also be configured to watch files and run tests (and other build steps too, see below).

## End-to-End / Integration Testing

Unit testing is important and can catch errors in the individual components of your application, but end-to-end and integration tests catch errors and validate functionality when these components are brought together. An end-to-end test would test from the browser page itself all the way to the back end Web APIs as if a user was sitting in front of the application. An integration test might only test portions of the stack, maybe just testing a service that calls a back-end Web API.

For this type of testing, you are testing with a real browser. You need a way to operate the browser itself and examine results. And you need to work with multiple browsers. Fortunately, [Selenium WebDriver](http://www.seleniumhq.org/projects/webdriver/) is a tool that can be used to automate user interactions on many different browsers. It can "drive" a browser, navigating to pages, interacting with user interface elements, and inspecting the results.

You can certainly write scripts to test your application with Selenium, but there are other tools that sit on top of Selenum that can then be used to write tests similar to the unit tests you might write. For example, [Protractor](http://angular.github.io/protractor), wraps Selenium and provides a testing environment and functionality that helps to identify and inspect components within [AngularJS](https://angularjs.org/) applications.

If you want to expand testing to the widest variety of browsers, including browsers that run on devices like an iPad tablet or Android phone, then there are services that provide access to physical and simulated devices that automated tests can be run against. [SauceLabs](https://saucelabs.com/) and [BrowserStack](http://www.browserstack.com/) are two popular options.

## Building Blocks

How do you build your Modern Web application? These days, you certainly don't start from scratch. There are too many good frameworks and libraries to build on. Most are free to use within your own application due to a community that values openly sharing these foundational tools with each other.

But you do have to make some hard decisions about how you will build your application. You thought discussing politics or religion was hard? Try talking about Javascript frameworks. So at the risk of doing terrible injustice to all that I'm about to mention, here is some brief overview.

Any framework deals with an abstraction on top of the Brower's DOM and related services (like the [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object). [jQuery](http://jquery.com/) was the first to really popularize these kinds of abstractions. Later, [Backbone.js](http://backbonejs.org/) sought to focus on the model data you might use in your application, providing ways to define your models and interact with web services. [Knockout.js](http://knockoutjs.com/) focused on more easily integrating application code with DOM events.

Then higher-level and more comprehensive abstractions became popular. [Ember](http://emberjs.com/) and [AngularJS](https://angularjs.org/) provide a framework that covers more of what a web application might do. They prescribe patterns and provide conventions that can be used to make web applications more scalable and maintainable.

Other patterns were introduced as well. [React](http://facebook.github.io/react/) is geared towards narrowly-focused user interface components, and includes a shadow-DOM that optimizes and enhances the performance of updating the browser's real DOM (operations that have been traditionally slow). The idea of Isomorphic Javascript was implemented in frameworks like [Meteor](https://www.meteor.com/) where the Javascript code is shared between client and server.

[Web Components](http://webcomponents.org/) are yet another way to abstract and extend browser functionality.

You also have to consider how important [Search Engine Optimization](http://en.wikipedia.org/wiki/Search_engine_optimization) (SEO) is to your application. If the application renders all of the content dynamically with Javascript, then it is possible that search engines won't be able to correctly catalog these pages (even though Google is [making progress in cataloging dynamic content](http://googlewebmastercentral.blogspot.com.es/2014/05/understanding-web-pages-better.html)). You may need to render content on the web server to be delivered to the browser directly rather than dynamically loading or generating it. But most frameworks have techniques to address SEO, some better than others.

## Content

You also have to consider the content of your web application, including how the content is generated as well as how it will look.

You might use templates to generate the HTML. A template specifies a subset of the overall HTML that is rendered into the page. Multiple templates can be merged together to generate the final HTML. [Handlebars](http://handlebarsjs.com/) and [Jade](http://jade-lang.com/) are used widely. On the server side you might dynamically render your HTML from your application, but you can also pre-render templates and have your web server deliver the resulting pre-generated content.

The content itself will be styled using [CSS](http://en.wikipedia.org/wiki/Cascading_Style_Sheets). But fortunately, you don't have to start from scratch with design. [Bootstrap](http://getbootstrap.com/) and [ZURB Foundation](http://foundation.zurb.com/) provide a great starting point for nice-looking web content. They also have the advantage of providing a "[Responsive Design](http://en.wikipedia.org/wiki/Responsive_web_design)". This is where a web site looks good on a web browser but also collapses and otherwise adapts itself to display well on smaller devices (like a phone).

Just as other languages can get compiled into Javascript, CSS has pre-processors that focus on simplifying the creation and reuse of CSS definitions. They provide variables and nesting that make it easier to define style sheets. [LESS](http://lesscss.org/) and [SASS](http://sass-lang.com/) are the two most popular options, where SASS can be extended with [Compass](http://compassstyle.org/help/) and other components to provide a more rich framework.

When designing your application for mobile platforms, responsive design helps to ensure that your web application works well on whatever device it is used. But there are other considerations as well. For example, for images that are displayed within your application, you might want to [optimize these images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization) for best download speed.

You can also optimize the overall performance of your application by moving assets like your images and Javascript files to a [Content Delivery Network](http://en.wikipedia.org/wiki/Content_delivery_network) (CDN). For an application with broad use, it moves the static files to servers distributed throughout the world to take some of the load off your web application servers.

## Client Side Building

So you may have noticed that some of this work has to be done offline. This is a major component of a Modern Web Application - assets for your web application are generally built (pre-processed) before becoming part of your web application.

To perform this build, almost certainly you'll end up using [NodeJS](http://nodejs.org/) (or the recent forked version of it, [io.js](https://iojs.org/)). All of the components to build assets for Modern Web applications will be found in Node modules.

There are a number of build system implemented in Node. I already mentioned [Gulp](http://gulpjs.com/) and [Grunt](http://gruntjs.com/). What do you build, then?

You would automate the validation of your Javascript, passing it through a Lint operation and automating the tests. If needed, you would generate the Javascript from Coffeescript or TypeScript files. You might decide to go ahead and start writing your Javascript in ES6 syntax, but until it has wide browser support, you'll need to use a tool like [6to5](https://6to5.org/) to transform ES6 syntax into ES5 (the form supported by most modern browsers today).

CSS files supports vendor prefixes which are specific to a particular type of browser. The [Autoprefixer](https://github.com/postcss/autoprefixer) tool can automatically identify the CSS elements that need these additional prefixes and add them to your CSS.

You'll want to minify your Javascript and CSS files. This takes out extra spaces and reformats code so that it is smaller, and thus loads more quickly. You might also supply [map files](http://en.wikipedia.org/wiki/MAP_%28file_format%29) that correlates the minified file back to the original source files. You might concatenate these minified files together as well.

Google's [Closure Compiler](https://developers.google.com/closure/compiler/) could minify and analyze your Javascript.

You'll want to ensure that the correct version of your Javascript and CSS files get to the browser. Why is this necessary? If the file name is fixed, a browser has to determine if the file has been cached or not. It makes the decision based on expiry information that comes from the server when the file was originally requested. If a file is updated, that expiry information may no longer be valid and the browser may not request the updated version of the file. Also, proxy servers that sit between the browser and the web server may have also cached the file.

To ensure that the latest copy of the files always get to the browser, a version number or other identifier is added to the file name, either as a query string parameter or by modifying the name of the file. This identifier ensures that the browser will request the file if the identifier is changed. This is called [cache-busting](http://webassets.readthedocs.org/en/latest/expiring.html).

If files are concatenated together or the file name is changed, then the reference to the file must be changed as well. This might be a `<script>` tag within an HTML file, but there may also be changes to references within Javascript or CSS files.

There are many other tasks, minifying your HTML files, automating the analysis of your image files for optimal delivery, or setting up watches for files being changed to automatically build the affected assets.

## So ... What Next?

If you made it this far, you might be overwhelmed by the scope of technology involved in Modern Web Applications. Fear not, though. And don't give up. It is truly amazing what you can do with web applications these days. It's worth the effort to learn this stuff and a great time to be working with it.
