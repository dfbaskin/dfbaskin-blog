---
title: NG-Conf 2016 - Day Two Wrap Up
slug: ng-conf-2016-day-two
pubDate: 2016-05-06T04:41:58.489Z
tags:
  - ng-conf
  - Angular
---

Some highlights of day two of [ng-conf 2016](https://www.ng-conf.org/):

- Day two started with a focus on the future of Angular2. No they didn't announce Angular3, but they
  did focus on the work they are finishing up and looking towards the future. For example, work is in progress
  to build an offline compiler for Angular2 applications. This should greatly reduce the payload delivered
  to the browser. In fact the Angular2 team's aggressive goal is to have the "Hello World" version of an
  an Angular2 application be only 10K!

- A second [release candidate](https://github.com/angular/angular/blob/master/CHANGELOG.md) came out today.
  Part of the changes from beta to release candidate includes changing the package references. For
  example, `angular2/core` is now referenced as `@angular/core`. This change allows for better use of the
  ES2015 modules and better optimization when using the offline compiler.

- The [Material Design](https://github.com/angular/material2) team is creating a base set of services that are
  common to user interface components in general, such as mobile usage, accessibility, internationalization, overlays,
  and more. The broad set of material design components build on these services, but other components can as well. They
  are also looking to expand the set of components to things like a Google Map component, a video player, rich text
  editor, and more.

- Tools have been created for assisting in
  [upgrading Angular1 applications to Angular2](https://angular.io/docs/ts/latest/guide/upgrade.html).
  During the upgrade, Angular1 hosts Angular2 components. Angular1 components and services can be upgraded to be
  used by Angular2 components and services. Likewise, Angular2 components and services can be downgraded
  and used by Angular1 components. This allows you to migrate an Angular1 application piecemeal instead of using
  a "big-bang" rewrite.

- The Component Router was updated significantly from Beta to the Release Candidate. The Beta router was in fact
  deprecated. There are still features to add to the latest router code (such as the RouteData service, default
  routes, and protected routes), but it is functional as it is. In the Angular2 router, components define their own
  routes, rather than defining all routes up front. This also allows for dynamically loading routes, rather than having to
  load an entire SPA implementation all at once.

- [NativeScript](https://www.nativescript.org/) continues to impress. NativeScript allows you to write truly native
  mobile applications using Javascript. These applications use native user interface on the device, not user interface
  run within a web frame. It is similar to the recently acquired [Xamarin](https://www.xamarin.com/) platform, except
  that Javascript is the language used rather than C#. The integration with Angular2 allows you to use the
  same property and event binding as you would in web applications, except on native components.

- The NativeScript team was so impressed with the
  ["Generative Art"](https://youtu.be/vsl5O4ps7LE?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j) presentation
  that they took the code and published an
  [Android application](https://play.google.com/store/apps/details?id=org.nativescript.nativescriptng2windchimes)
  in the Google Play Store the very next day! Nice!

- Jeffrey Whelpey and Patrick Stapleton gave a more in-depth presentation about Angular Universal features that
  really demonstrated its power. The team has created a [starter application](https://github
  .com/angular/universal-starter) that you can learn from and talked about some of the configuration and setup required
  to use it. Universal delivers the server-rendered Angular2 application while the preboot function records events
  from a user (such as a keystroke or mouse click) and then replays these events once the server-rendered application
  is replaced with the client-rendered code. This should greatly enhance the user's experience with
  our web applications. There are even scenarios where Universal can be used in dealing with static rendering
  that is stored on a CDN (Content Delivery Network).

Looking forward to Day Three!
