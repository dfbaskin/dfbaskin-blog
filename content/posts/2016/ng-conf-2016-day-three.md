---
title: NG-Conf 2016 - Day Three Wrap Up
date: 2016-05-07T04:14:51.045Z
tags:
  - ng-conf
  - Angular
---

The last day of [ng-conf 2016](https://www.ng-conf.org/) continued with lots of
great information. Some highlights:

- Daniel Rosenwasser gave a
  [good overview of TypeScript](https://youtu.be/dzPjBWLdGz0?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j)
  and a little bit of its history. He also
  demonstrated benefits of using TypeScript with Javascript directly. It can be beneficial in catching
  things in regular Javascript code (serving a similar purpose to the [ESLint](http://eslint.org/)
  Javascript lint tool). He also showed some new features coming in TypeScript, like async/await and handling
  null and undefined types.

- Aysegul Yonet talked about the
  [new features of pipes](https://youtu.be/joSHg-4ZBZ8?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j)
  in Angular2, including how pipes can be configured to better handle change detection.

- Ken Synder presented
  [details about transclusion udpates](https://youtu.be/59IY2MIl5u0?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j).
  In Angular1 you can now have multiple slots for injecting
  transcluded elements. The `ng-transclude` directive now supports a name property and directives can specify multiple
  transclusion slots that correspond to these names. This allows Angular1 to come closer to how `ng-content` tags work
  in Angular2.

- Matias Niemela gave a whirlwind tour of the
  [new animation features in Angular2](https://youtu.be/Hr4IKlr9mhg?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j).
  After evaluating the different options of working with animations in the DOM (through CSS transitions, Key Frames, or
  direct Javascript), they settled on using Javascript, which they call "web animations". The benefit is that it gives
  an application very fine-tuned control over animations, works around various issues with key frames and CSS
  transitions, provides better performance and less UI jank, and allows for better rendering (including in offline
  scenarios).

- One of the biggest complaints about using Angular has been the friction around setting up a project and its build
  tools, even when working with a simple Angular project. Mike Brocchi demonstrated the
  [Angular2 command line interface](https://youtu.be/wHZe6gGI5RY?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j) that
  aims to address this issue. It is not only for creating a new Angular project, but it also aims to assist in
  growing and maintaining the application. It can add components, services, routes and other important pieces of an
  Angular application, but it will also automate upgrades to newer versions of Angular that will come in the
  future. In addition, it will incorporate the offline template compiler.

- If you feel a little lost in all of the terminology and moving parts of the Angular framework, you
  should watch Scott Moss present ["Angular for the Rest of Us"](https://youtu.be/GE5gZX6V6Zs).
  He does a great job (and uses some excellent metaphors) describing Angular2 development.

- One thing that Scott mentions and was echoed in other presentations as well, is that error reporting is much better
  in Angular2. In Angular1, the source of an error message was easily lost, usually showing a call stack
  consisting of references within the Angular1 source code. Angular2 does a great job of helping you to identify
  the actual source of an error. It also fixes issues with setting breakpoints correctly in the browser developer
  tools.

- Rob Wormald showed the
  [Angular-specifc implementation](https://youtu.be/mhA7zZ23Odw?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j) of the ideas
  behind [Redux](http://redux.js.org/) (which I
  [blogged about](http://dfbaskin.com/posts/using-redux-to-manage-application-state/)
  a few days ago). He also included a demo of the time-travelling debugger that can be used to diagnose
  changes to application state, all by including a single element, `<ngrx-devtools></ngrx-devtools>`, into
  the page. The [`ngrx/store`](https://github.com/ngrx/store) project is integrated with the Angular framework and
  provides a "predicatable state container". This is one project of a collection that focus on Reactive Programming
  implementations for Angular2.

- In Angular2, you can build input forms using templates like you do in Angular1, but
  you can also build forms using a FormBuilder component that allows you to specify data binding
  and validations within your component rather than in the template. Deborah Kurata does a great job of
  [showing the differences](https://youtu.be/ihYc9y7dQA0)
  between template forms and model driven forms (and using a hybrid approach that falls somewhere in
  between).

Of course, there were other presentations as well over the last three days. They are on the
[ng-conf 2016 YouTube channel](https://www.youtube.com/playlist?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j).
Unfortunately, the break-out sessions from Day Two did not get recorded, as far as I know.

Last up was the usual panel of Angular team members where folks could ask questions. Some of the team's
answers that stood out to me were:

- The question always comes up, "When is Angular2 going to be ready?" A key piece is the template
  compiler. When that is ready, then Angular2 will be ready. However, Brad Green stated clearly that
  for several large customers and internal Google projects, it is production ready now. If I understood
  correctly, [AdWords](https://www.google.com/adwords/), which may be the biggest money-making application
  on the planet, has already deployed Angular2 components.

- And it's not an "us vs. them" mentality. Angular is one of many solutions and can work alongside of
  other solutions (including React).

- The template compiler might even be available for preview by release candidate 2. (They are at
  release candidate 1 as of this writing.)

- HTTP2 is a technology that is very interesting to the Angular team. It may reduce or eliminate the
  need for bundling and has already been proven to have other performance benefits as well.

- TypeScript is highly recommended for Angular2 projects, even though it is not strictly
  Javascript. The TypeScript team is eager to work with the standards organizations to make sure
  TypeScript doesn't diverge from Javascript in problematic ways. The Angular team even did some research
  to determine if type systems (like implemented in TypeScript) would be useful in the browser, and
  came to the conclusion that it was not a good fit.

- If your team decided that TypeScript was not a good solution, you can always use the Javascript generated by the
  TypeScript compiler moving forward since it would be close to the original source anyway (unlike CoffeeScript which
  is generally a separate language, not a superset of Javascript like TypeScript is).

I would like to personally say thanks again to all of the organizers and sponsers of ng-conf.
My third year at ng-conf has been as satisfying as the first two. I would also like to give a special thanks
to the Angular team for all of their efforts. The Angular2 framework is very exciting and I am looking forward
to building great things with it.
