---
title:          Angular Benchpress and Performance Tests
date:           2015-07-17T03:39:12.986Z
tags:
    - Angular
    - React
    - Benchpress
---

Ben Nadel wrote a [blog post](http://www.bennadel.com/blog/2864-rendering-large-datasets-with-angularjs-and-reactjs.htm)
that explored the performance of rendering a large dataset using Angular (version one) and React. It was a good
post and demonstrated the perceptible difference between an Angular 1 application and a React application.
 
The example application (found
[here](https://github.com/bennadel/JavaScript-Demos/tree/master/demos/render-large-datasets-angularjs-reactjs))
was intended to give a feel for this performance difference. In other words, does React _feel_ faster
than Angular?

But what if we could put actual numbers on this difference?

I've been playing around with the 
[Angular2 Benchpress tool](https://github.com/angular/angular/blob/master/modules/benchpress/README.js.md).
Performance is critical to the Angular2 team. They didn't have a tool that could collect performance
information in an automated and repeatable fashion, so they built their own tool. Benchpress is the result.

We can use Benchpress to measure the actual performance of the application using Angular version 1, React,
and just for good measure, Angular version 2.

Of course, Angular2 is still in early Alpha so there may be problems with the tool itself or some of my
code, so take all of this with a healthy skepticism. Buyer beware.

Benchpress runs the tests multiple times and gives back average times and variances for a number of
metrics, including memory and timings.  These are the raw numbers I saw on my machine (Windows 8.1, 16GB memory):

Test            |   forcedGcAmount  | forcedGcTime 	 |    gcAmount 	      |        gcTime 	|   majorGcTime  |   renderTime 	 |    scriptTime
----------------|-------------------|----------------|--------------------|-----------------|----------------|-------------------|------------------
Angular v1	    |   7293.41+-44% 	|    49.62+-33%  |    41525.56+-1% 	  |     92.69+-2%   |	659.66+-1% 	 |    124.72+-1% 	 |     752.35+-1%
React	        |   4661.45+-18% 	|    25.29+-10%  |    13350.06+-0% 	  |     16.05+-5%   |	174.47+-5% 	 |     91.14+-2% 	 |     190.53+-5%
Angular v2	    |   3545.39+-9% 	|    53.67+-5% 	 |    17022.78+-0% 	  |     13.67+-3%   |	155.66+-4% 	 |    125.70+-1% 	 |     169.37+-4%

This test measured mounting the grid, which basically measures the time to render repeated content on to the page.  
You can see the formidable gap between Angular 1 and React. No surprise there.  But you can also see that Angular2 is
heading in the right direction.  The great thing is that we can put actual numbers on performance rather than
depending on our perception of the performance.

The project, along with the Benchpress tests can be found here:

- [https://github.com/dfbaskin/render-large-datasets-angularjs-reactjs](https://github.com/dfbaskin/render-large-datasets-angularjs-reactjs)

