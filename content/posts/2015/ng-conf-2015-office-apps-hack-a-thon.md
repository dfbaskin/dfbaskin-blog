---
title: ng-conf 2015 - Office Apps Hack-a-thon
date: 2015-03-05T07:30:31Z
tags:
  - Angular JS
  - Microsoft Office
  - Web Applications
---

The night before ng-conf 2015 started, there were a number of lightning talks and hack-night activities. You
might be surprised to see Microsoft as part of the mix. With the lure of several Xbox Ones to give away, there
ended up being 11 teams competing for the prizes. Josh Carroll and I represented "Team Wintellect".

Why was Microsoft here? If you've been keeping up, the "new" Microsoft has really done a lot to be more open
and work with technology outside of Microsoft. Tonight, they were talking about building AngularJS application
as add-ons to Office 365 applications. These are Javascript-based components that can inject new functionality
into Excel, Outlook, and others. (There is more detailed information at the
[Office Dev Center](http://dev.office.com/) web site).

Our task was to take one of [Andrew Connell's](http://www.andrewconnell.com/About) starter projects:

- [https://github.com/andrewconnell/ngconf15-hackathon-outlook](https://github.com/andrewconnell/ngconf15-hackathon-outlook) -
  which looks up names found in Outlook messages for matching customers.

- [https://github.com/andrewconnell/ngconf15-hackathon-excel](https://github.com/andrewconnell/ngconf15-hackathon-excel) -
  which adds products to an Excel spreadsheet to generate invoices.

And create our own project that demonstrates some interesting add-on functionality to one of these office apps.

Oh ... and there was only two hours to complete it!

Josh and I decided to take a [D3.js](http://d3js.org/) visualization, specifically
this [Aster Plot](http://bl.ocks.org/bbest/2de0e25d4840c68f2db1), and have it take the data from an
Excel spreadsheet rather than from a CSV file.

This is what we came up with,
[https://github.com/Wintellect/ng-office-graphs](https://github.com/Wintellect/ng-office-graphs). I apologize
up front for the (lack of) quality of this code, but we were successfully able to update data in the
spreadsheet and draw the graph based on this data.

_(I hope to revisit this code and clean it up. I also forgot to take a screen shot, which I'll post later.)_

The main integration code is below:

```javascript
Office.initialize = function () {
  console.log(">>> Office.initialize()");

  Office.context.document.bindings.addFromPromptAsync('matrix', function (asyncResult) {
      if (asyncResult.status == Office.AsyncResultStatus.Succeeded) {
          console.log(asyncResult);

          asyncResult.value.getDataAsync(function(data) {
              console.log(data.value);

              drawObject.draw(data.value);

          });
      }
  });
```

After the Office application initializes, we were able to prompt the user for a range of data
([addFromPromptAsync](https://msdn.microsoft.com/en-us/library/office/fp142150.aspx)) and then pull the
data from the spreadsheet ([getDataAsync](https://msdn.microsoft.com/EN-US/library/office/fp161073.aspx)). The
rest was just drawing the D3 visualization.

Microsoft has created a nice extensibility interface for office apps and I'm interested to see what new
kinds of add-ons will be created.

Also, thanks to [Jeremy Thake](http://www.jeremythake.com/), Andrew, and Microsoft for the event.

And for the Xbox One, too!
