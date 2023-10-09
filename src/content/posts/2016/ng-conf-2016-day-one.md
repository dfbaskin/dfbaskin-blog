---
title: NG-Conf 2016 - Day One Wrap Up
slug: ng-conf-2016-day-one
pubDate: 2016-05-05T03:49:27.730Z
tags:
  - ng-conf
  - Angular
---

I just finished up the first day of [ng-conf 2016](https://www.ng-conf.org/) and as usual, it
has been a great informative conference. Thanks to the organizers, sponsors, and Angular team
members for all your efforts.

Here are some highlights from today:

- [Brad Green's keynote address](https://youtu.be/gdlpE9vPQFs?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j), of course,
  covered the big picture of the Angular development work. The [Angular1 site](https://angularjs.org/) had 1.3 million
  visitors and the [Angular2 site](https://angular.io/) has already had 306 thousand visitors, even though the first
  release candidate was only made available yesterday. The team is focused on making Angular2 a robust framework, but
  there are still some gaps to fill before it will be ready for production release.

- What was really impressive is the breadth of applications that can be created with Angular2. Web applications
  we all know and love are just part of the story. You can create progressive apps that can be used offline. You
  can create mobile web applications with native-like user interface using
  [Ionic](http://ionicframework.com/docs/v2/getting-started/migration/). You can create truly native mobile
  applications with
  [NativeScript](https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular).
  You can create cross-platform desktop application on top of
  [Electron](http://electron.atom.io/).

- If need a quick look at what Angular2 actually looks like, John Papa does a great job of [live-coding
  an Angular2 application](https://youtu.be/WAPQF_GA7Qg?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j).

- The features around localized CSS are a very nice addition to Angular2. Being able to create a component
  with it's own CSS that doesn't leak out to other HTML elements will really help in the creation of
  reusable components. Justin Schwartzenberger
  [provides the details](https://youtu.be/J5Bvy4KhIs0?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j).

- Universal applications (where the Angular2 application is rendered on the server rather than just
  in the browser) will provide a lot of value. This is not only for Search Engine Optimization (SEO),
  but it will also help with Progressive Web Applications. Jeffrey Whelpey and Patrick Stapleton
  talk about [some of the issues](https://youtu.be/TCj_oC3m6_U?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j)
  they had to work through to create the framework for Universal applications.

- Misko Hevery gives a [big picture view](https://youtu.be/d8yAdeshpcw?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j)
  of the important features of the router in Angular2.
  As I mentioned, the first Angular2 release candidate (RC1) was made available just yesterday and
  I'm in the process of upgrading my
  [Angular2/Redux example application](https://github.com/ng-cookbook/angular2-redux-complex-ui)
  to the release candidate. But the router functionality was changed significantly from the Beta
  release. These changes are detailed
  [here](https://docs.google.com/document/d/1WLSNV3V1AKdwLwRiLuN7JqbPBKQ_S5quRlcT5LPIldw/edit?pref=2&pli=1#heading=h.blfh5ya9sf5r).

- [Augury](https://augury.angular.io/) is the new tool that replaces the [Batarang](https://github.com/angular/batarang)
  tool used for Angular1 applications. It will have a much broader feature set than the original.

- The documentation has been updated at [Angular.io](https://angular.io/) and now also includes the
  [Angular2 Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html).

- Julie Ralph gave some [interesting details](https://youtu.be/DltUEDy7ItY?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j)
  about how [Zones.js](https://github.com/angular/zone.js/) is used to improve testing in Angular2.

- One of the most interesting presentations was by Tero Parviainen demonstrating
  ["Generative Art"](https://youtu.be/vsl5O4ps7LE?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j) using Angular2.
  It was an impressive demo not only because of the application being demonstrated, but I thought
  it also showed the elegance of Angular2 itself.

- And of course, Shai Reznik does another
  [hilarious ribbing of the Angular team](https://youtu.be/aSFfLVxT5vA?list=PLOETEcp3DkCq788xapkP_OU-78jhTf68j).

Looking forward to Day Two!
