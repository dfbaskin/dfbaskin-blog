---
title:          NG-CONF 2017 Day Two Highlights
date:           2017-04-09T15:37:30.672Z
tags:
    - ng-conf
    - Angular
---

Day Two changes things up from the Day One and Day Three single-track
format. There are breakout sessions focused on a specific topic as well
as chances to sit down and ask questions of others who have expertise in
Angular, including members of the Angular team themselves. It’s a good
chance to listen to how others are approaching their development
challenges and opportunity to discuss lots of interesting details in
depth.

## Practices and Performance

The first session of the day had a few large organizations talk about
the things they are doing within their organization to manage Angular
projects, how they approach analyzing the performance of these
applications, and what kinds of things might help them improve these
operations.

In terms of analysis, there was a great emphasis on metrics (“plan and
measure”). This included low level tracking of “time to first paint”,
“time to meaningful content”, and “time to interactive”. But it also
included higher-level tracking of things like “perceived performance”
(obtaining feedback about how the user perceives the performance of the
application).

Tools were mentioned that help in this analysis. The primary tool, of
course, is the Developer Tools within the browser (there was a lot of
praise for the capabilities of Chrome Developer tools particularly).
Other tools mentioned were:

-   [Lighthouse](https://developers.google.com/web/tools/lighthouse/) –
    a chrome extension / command-line tool that audits for performance,
    accessibility, and other interesting metrics. This can be used in a
    continuous integration environment as well.

-   [Source Map Explorer](https://github.com/danvk/source-map-explorer)
    – a tool that helps analyze code bundles to avoid bringing in
    additional code that is not used, improving the size of bundles.

-   [Webpack Bundle
    Analyzer](https://github.com/th0r/webpack-bundle-analyzer) – a tool
    for analyzing the bundles that are created specifically by
    [Webpack](https://webpack.js.org/) (generated from its own log
    files).

-   [Bazel](https://bazel.build/) – an open-source version of Google’s
    own build tool. It represents work that they’ve done internally for
    fast, optimized builds on an extremely large scale.

Generally, the presenters seemed satisfied with what they could do with
Angular within their own organizations. They were also continuing to
research and investigate additional optimizations, such as better
performance by using web workers or service workers.

## About Angular

In the “Ask the Experts” room, several of us surrounded [Rob
Wormald](https://twitter.com/robwormald). My thanks to him for his
patience while we peppered him with our questions.

It was a very useful discussion for me. I am currently in the middle of
a big React-based project. At the beginning of the project we had
in-depth discussions about what platform that we should build on.
Obviously React is very popular and perfectly acceptable for building
big web applications. But even after diving into deep into React, there
are still some things that I prefer in Angular when on large projects
with distributed teams.

AngularJS (version 1) of the framework and its shortcomings are well
known, but Angular (the name used for all later versions) has addressed
these concerns. However, since it is a full framework, rather than
having a narrower focus on just the view (as React does), it is
definitely more complex. It requires a build system and is best used
with TypeScript. There are additional requirements for optimizing
production builds. It requires registration of components, directives,
and services within an
[NgModule](https://angular.io/docs/ts/latest/guide/ngmodule.html).
Decorators are used to describe how a component is to be used. And
[Observables](http://reactivex.io/rxjs/manual/overview.html#observable)
are used throughout the framework to deal with asynchronous operations.

But this additional complexity is not haphazard and comes from trying to
build a great framework for building applications in the browser, for
mobile devices, and for the desktop. The Angular team also wants to be
supportive of the community overall and so they don’t spend a lot of
time trying to explain to folks why Angular is better. It just leads to
toxic, unhelpful discussions so many times.

Rob emphasized that they want the documentation to be better overall,
which should include more “philosophical” information about the
framework, i.e. why a particular tact was taken for some feature.

Ultimately, your team will make the decisions about what platforms they
will use to build an application. I look forward to seeing more
information about the technical distinctions of Angular to help teams
make better informed decisions when choosing from the wide breadth of
options.

## Reactive Applications

One thing that was evident is that “[reactive
programming](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754)” is
where Angular has a strong focus. This is certainly one of the reasons
that [RxJS](http://reactivex.io/rxjs/) is such a key component of the
Angular framework. Reactive programming views information as an
asynchronous stream of data. The application can orchestrate these
streams in interesting ways. Even for simple HTTP requests, observable
versions of these requests can easily be enhanced by adding automatic
retries upon failure, caching and expiration of resources, combinations
with other requests (in series or in parallel), and data refreshes upon
change using simple `async` binding.

There are several libraries that also provide additional functionality
[built on top of observables](https://github.com/ngrx). For example, the
[store](https://github.com/ngrx/store) component provides an
implementation inspired by the [Redux pattern](http://redux.js.org/) but
using observables to communicate application state changes.

## WebPack

[Sean Larkin](https://twitter.com/TheLarkInn) is a member of the
[WebPack](https://webpack.js.org/) team and a primary advocate for the
tool as well. He did a talk to a large audience going into some of the
inner workings of WebPack. Interest is high in this tool and many
projects have adopted it, including Angular. The talk emphasized that
“everything is a plugin”. A plugin just expresses the events that it is
interested in and responds accordingly. The result is a tool that is
extremely flexible and configurable.

This flexibility is what has made WebPack so popular. It ends up
replacing build tools (like gulp or grunt) and has a large ecosystem to
transform, analyze, and optimize your JavaScript projects. Sean also
talked about work to expand this ecosystem further by making
[WebAssembly](http://webassembly.org/) a first-class citizen in the
plugin architecture, which should allow even further optimization and
additional inputs into our builds.

Sean stepped us through a project that he had set up to [demonstrate
writing a plugin](https://github.com/thelarkinn/everything-is-a-plugin)
yourself (a brave move for such a large audience all trying to work
through the examples at the same time!) But it was a successful and very
helpful talk. Definitely worth
[watching](https://www.youtube.com/watch?v=4tQiJaFzuJ8).
