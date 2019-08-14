---
title:          NG-CONF 2017 Day One Highlights
date:           2017-04-07T00:01:53.251Z
tags:
    - ng-conf
    - Angular
---

I’m glad to be back again at ng-conf in Salt Lake City. I’ve used
Angular since the very beginning and it continues to get better. Here
are some of the highlights that stood out to me from the first day of
the conference.

## Keynote

During the keynote, there was discussion about gauging the success of
Angular. They estimated that the community is around 1.3 million users
of AngularJS (version 1 of the framework) and 810 thousand users of
Angular (versions 2 and 4 of the framework, they [skipped version
3](http://angularjs.blogspot.com/2016/12/ok-let-me-explain-its-going-to-be.html)).
Of all the applications out there, about 90% of them are internal
applications (ones we can’t see because they are behind the corporate
firewall). 17% of the public Angular applications are already on version
4 of the framework.

There are over 200 applications internal to Google that are using the
framework. These applications serve as an initial test bed for all
updates of the framework, helping to ensure smooth updates to new
versions.

Impressive statistics.

Version 4, [released a short time
ago](https://github.com/angular/angular/blob/master/CHANGELOG.md#400-invisible-makeover-2017-03-23),
has some great improvements in performance and the size of payloads. The
team worked hard to ensure that upgrades went smoothly and there were no
breaking changes in the framework APIs. They’ve released the first
version of the [Angular CLI](https://cli.angular.io/), a helpful tool
for building and maintaining Angular applications (more details below).

For enterprises that can’t upgrade on a regular cycle, they announced
Long-Term Support (LTS) for Angular version 4 through October 2018. This
ensures that critical bug-fixes and security patches will be applied for
a while.

## Tools

JavaScript tooling has always been the biggest source of frustration for
building applications. Angular is improving in this area by introducing
the [Angular CLI](https://cli.angular.io/), a command-line tool that can
construct an initial Angular application as well as assist in the
continuing development of the application, adding new components,
modules, services, etc. It does many of the chores of constructing
module definitions and building development and production versions of
the application. It also includes unit testing and end-to-end testing.

The CLI can be configured if required, but at some point if you out-grow
the CLI, you can eject the build scripts and customize them as much as
you need.

[Minko Gechev](https://twitter.com/mgechev) created a tool, called
[Codelyzer](http://codelyzer.com/), that extends
[TSLint](https://palantir.github.io/tslint/) to check source code for
common problems, specifically in Angular applications. But he also went
farther by building a tool that creates an abstract syntax tree specific
to Angular as well as a tool to [visualize this
tree](https://github.com/mgechev/ngrev). And just for fun, created a
tool to see this [visualization in
3D](https://github.com/mgechev/ngworld).

## Components

Angular (the name for all versions of framework after version 1, as
opposed to AngularJS which is the name used for version 1) has fully
embraced the component model. These means that you construct your
application by building a tree (hierarchy) of components. This provides
a good way to organize your application into logical pieces (areas of
your application) as well as functional pieces (responsibilities). Some
components can be container (“decision”, “smart”) components that know
how to interact with business services, where others are presentation
(“presenter”, “dumb”) components that are only concerned with presenting
user interface. Container components generally pass data down to
presentation components and respond to events from the presentation
components by translating them into some business function.

[Justin Schwartzenberger](https://twitter.com/schwarty) presented a talk
that dug into some of the performance and architectural decisions that
should be considered when creating your component hierarchy. He talked
about different “taxes” paid for different implementations, the tax paid
for rendering components and change detection tracking, the tax paid for
using HTML elements just for containment, the tax paid for coupling
parent and children components. It was really a great explanation of how
to think about the organization of your components.

Related to this, the [Material Design](https://material.angular.io/)
team has done great work to make the Material components integrate
better with standard HTML markup. For example, instead of defining a
`<md-button>` custom component, you can attach an `md-button`
attribute to the button element itself instead, `<button
md-button ...>`. These, along with many other optimizations make the
library much more flexible and more natural to those creating HTML
markup.

## Other Highlights

-   The [Angular
    Animations](https://angular.io/docs/ts/latest/guide/animations.html)
    module has been updated to include a feature that has been requested
    frequently, the ability to add animations to route transitions.

-   The Angular team wants to continue to improve the CLI in many areas,
    including increasing the speed of building the application, reducing
    the size of the output, using a common configuration for both
    development and production (to reduce differences in operation
    between environments), better error messages. They also want to get
    to the point where the CLI is more like an SDK that can be
    customized with plugins, custom templates, and additional tooling.

-   [Tobias Bosch](https://twitter.com/tbosch1009) did a deep dive into
    the Angular Ahead-of-Time (AOT) compiler, explaining what was going
    on in building components and HTML templates into JavaScript
    executed at run time.
