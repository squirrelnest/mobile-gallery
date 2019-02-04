# mobile-gallery

## Summary

This is a web-based, touch-enabled photo gallery for mobile devices, created with pure HTML, CSS, plain vanilla Javascript.

## Dependencies

None - I kept this barebones for the sake of simplicity, expediency, and curiosity.

## Usage

View web app in production at https://bit.ly/2RcvdhW or https://mobile-gallery.herokuapp.com

After logging in (password: hordor), tap or click on a tile to switch from grid view to detail view.

In detail view, you can swipe left or right to move between images.
Tap on the image to toggle the tool drawer.

To exit detail view, open the tool drawer and click on the X or <-.

## Setup Development Environment

1. Download source files
2. Navigate to project directory
3. Install an http server to serve the files, e.g. [simplehttpserver](https://www.npmjs.com/package/simplehttpserver)
4. Point the server to index.html as the entry point for the app
5. Set the port number for the server to listen on
6. Start the server
7. Open a mobile browser
8. Navigate to [your IP address]:[port number you set in step 5]

## My Process

1. Gather design and functional specs
2. Gather assets - images, icons, etc.
3. Layout elements with HTML
4. Define dynamically generated HTML DOM element objects with Javascript
5. Style elements with CSS to match mockups
6. Attach event listeners
7. Define event handlers
8. Create CSS transitions and animations
9. Experiment with a few different interaction styles
10. Clean up unused or unnecessary code
11. Break up code into reusable chunks
12. Add simple password protection to scare off barbarians
13. Deploy to host server (in my case, Heroku)
14. Test remotely hosted app on mobile device
15. Make changes and test on locally hosted app before re-deploying to production

## Explanation of Design Choices

I decided not to use any dependencies for this project - no React, no packages, no UI library, no framework. I wanted to understand the underlying Javascript, HTML, and CSS required to build mobile swipe interactions (which I had never made before) instead of abstracting those away behind magical frameworks that do all that for you already. The downside of this approach is I didn't get to account for all use cases (e.g. scrolling the detail view in landscape orientation) and resolve conflicting DOM events in time for submission. I assumed this was an exercise in iterative development and focused on making a functional and aesthetically pleasing swipe interaction work on a Chrome mobile browser in a Pixel 2 and Pixel 3 XL. With more time, I would test on other devices, add automated testing, experiment with other designs and interactions, add secondary actions, and a bevy of other things (see TODO list below).

I chose to mimic some of the interactions in Google Photos but deviated in order to show alternatives to the status quo. The interaction style I came up with is called "Bubble". It means that incoming content is heralded with bells and whistles (in this case, animation), while outgoing content goes away immediately - the bubble "pops". For example, dismissing the tools overlay in detail view does not have a transition or animation, whereas opening the overlay does (the tools slide in from the top and bottom of the screen). When I'm dismissing something, I prefer it go away immediately rather than sit through an albeit brief animation. This is entirely a personal preference and I would defer to our UX designers to choose the best experience for most, if not all, our users.

An API was not provided for the images; I hardcoded the images to expedite development of the frontend rather than the backend (API, database) as I saw this more as a UX protoyping exercise than a full stack project. In later iterations, I would pull images from an external database instead of storing them alongside the source code.

My simple password protection is not very secure (inputs are not even hashed). It was only meant to restrict traffic and the app does not hold any sensitive information at this stage of development.

As for my infrastructure choices, I chose Heroku to host my app because it is free, popular, and I wanted to learn how to use Heroku.

## TODO

This code is by no means polished or complete. Shortcuts were made due to time constraints.
Here are some areas for improvement:

* Use more secure password protection (encryption or htaccess) or move private files (such as photos) outside of web root
* Use an API and CDN to get images instead of hard-coding and storing on host
* Add router to enable deep linking
* Add secondary actions, such as sharing and commenting
* Add keyboard and mouse events for desktop so users can tab between fields or move between images
* Support multi-touch interactions, like pinch-zoom
* Support other browsers and devices - this app was only tested on Chrome browsers on Pixel 2, Pixel 3 XL, and a Mac laptop
* Load and render images in batches instead of all at once
* Bundle and minify static assets
* Transpile ES6 to ES5 for legacy browsers
* Add test coverage
