# mobile-gallery

## Summary

This is a web-based, touch-enabled photo gallery for mobile devices, created with pure HTML, CSS, plain vanilla Javascript.

## Dependencies

None - I kept this barebones for the sake of simplicity and curiosity

## Usage

After logging in, tap or click on a tile to switch from grid view to detail view.

In detail view, you can swipe left or right to move between images.
Tap on the image to toggle the tool drawer.

To exit detail view, open the tool drawer and click on the X or <-.

## Setup Development Environment

1. Download source files
2. Navigate to directory where you saved the source files
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

## TODO

This code is by no means polished or complete. Shortcuts were made due to time constraints.
Here are some improvements that could be made:

[] Use more secure password protection (encryption or htaccess) or move private files (such as photos) outside of web root
[] Use an API to serve image metadata and a CDN to serve images instead of hard-coding and storing on host
[] Add router to enable deep linking
[] Add secondary actions, such as sharing and commenting
[] Add keyboard and mouse events for desktop so users can tab between fields or move between images
[] Support multi-touch interactions, like pinch-zoom
[] Support other browsers and devices - this app was only tested on Chrome browsers on Pixel 2, Pixel 3 XL, and a Mac laptop
