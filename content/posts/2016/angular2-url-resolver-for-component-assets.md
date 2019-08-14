---
title:          Angular2 UrlResolver for Component Assets
date:           2016-06-15T23:34:32.198Z
tags:
    - Angular2
    - UrlResolver
---

[Thoughtram](http://thoughtram.io/) published a piece about
[Component Relative Paths in Angular2](http://blog.thoughtram.io/angular/2016/06/08/component-relative-paths-in-angular-2.html).
This is great! It makes working with components much easier.

However, I wasn't sure about other component-specific assets, like images for example.  So I asked about it:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/dfbaskin">@dfbaskin</a> That&#39;s a good point! There&#39;s no isolated solution for that yet</p>&mdash; Pascal Precht ʕ•̫͡•ʔ (@PascalPrecht) <a href="https://twitter.com/PascalPrecht/status/743086388460068864">June 15, 2016</a></blockquote>

There is a solution, it turns out. There may be some better options in the future, but you
can use the [UrlResolver](https://angular.io/docs/ts/latest/api/compiler/index/UrlResolver-class.html) object
to do this.

You can inject the resolver object into your component and then create a `resolvePath` function that
can be used by the view.

```javascript
import {Component} from '@angular/core';
import {UrlResolver} from '@angular/compiler';

@Component({
    moduleId: module.id,
    selector: 'title-page',
    styleUrls: ['title-page.component.css'],
    templateUrl: 'title-page.component.html'
})
export class TitlePageComponent {

    constructor(private urlResolver: UrlResolver) {
    }

    public resolvePath(path) {
        return this.urlResolver.resolve(module.id, path);
    }
}
```

In the view, just bind an image element to the `resolvePath` function.

```html
<img [src]="resolvePath('angular.svg')">
```

As the Thoughtram article mentioned, this solution is tied to using the CommonJS format for modules.
In other words, the `module.id` property I'm using here as an input into the `UrlResolver` object
would not exist for other formats.

### Updated Mar-19-2017

This technique is now obsolete.
[https://angular.io/docs/ts/latest/guide/change-log.html](https://angular.io/docs/ts/latest/guide/change-log.html#!#all-mention-of-moduleid-removed-component-relative-paths-cookbook-deleted-2017-03-13-)
