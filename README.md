# mobile-gallery

## Summary

This is a web-based, touch-enabled photo gallery for mobile devices, created with HTML, CSS, and plain vanilla Javascript.

## Dependencies

None - I kept this barebones for the sake of performance, simplicity, expediency, and curiosity. See the Explanation and Optimization sections below.

## Usage

View mobile-gallery in production at https://bit.ly/2RcvdhW or https://mobile-gallery.herokuapp.com

After logging in (password: hordor), tap or click on a tile to switch from grid view to detail view.

In detail view, you can swipe left, right, up, or down to move between images.
Tap on the image to toggle the tool drawer open and closed.

To exit detail view, open the tool drawer and click on the X or <-.

## Setup Development Environment

1. Download source files
2. Navigate to project directory
3. Install an http server to serve the files, e.g. [simplehttpserver](https://www.npmjs.com/package/simplehttpserver)
4. Point the server to index.html as the entry point for the app
5. Set the port number for the server to listen on
6. Start the server
7. Open a mobile browser
8. Navigate to [your IP address]:[port]

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

I decided not to use any dependencies for this project - no React, no libraries, no packages, no frameworks - for several reasons. First, I wanted to understand the underlying DOM API, Javascript, HTML, and CSS required to build swipe interactions before abstracting those away behind magical widgets. Second, from past experience, I found that direct DOM manipulation produced smoother, faster swipes than React. Calling React's setState() on each touchmove event led to stutter or lag during swipes ("swipe jank"?) because React batches state updates before re-rendering. Intermediate state updates get dropped and/or the listening component unmounts during re-render.

Third, using libraries like jQuery or React seemed overkill at this time. Though external libraries and frameworks can enhance the developer experience, their costs (increased load time and, for React, the overhead of calculating diffs) outweigh the benefits (syntactic sugar) at this early stage. Only a few methods would have been useful and they merely wrap Javascript code I could easily implement myself. 

The downside of not using any dependencies was slower development: I didn't have time to flesh out a fully-featured product, let alone implement other interactions (such as pinch-zoom) or tasks I identified in my TODO list (see below). I assumed this was an exercise in iterative development and that other concerns could be addressed in subsequent iterations. I limited my scope of work to a single user journey (log in -> scroll through grid view -> open detail view -> swipe between images <-> toggle the tools overlay -> return to grid view), with a focus on matching the given mockups and functional specs and experimenting with different interactions and transitions. 

I chose to mimic some of the interactions and transitions in Google Photos but deviated in order to show alternatives to the status quo. The interaction style I came up with is called "Bubble". It means that incoming content is heralded with bells and whistles (in this case, animation), while outgoing content goes away immediately - the bubble "pops". For example, dismissing the tools overlay in detail view does not have a transition or animation, whereas opening the overlay does (the tools slide in from the top and bottom of the screen). When I'm dismissing something, I prefer it go away immediately rather than sit through an (albeit brief) animation. This is entirely a personal preference and I would defer to our UX designers to choose the best experience for our users.

I chose Heroku to host my app because it is free, popular, and I wanted to learn how to use Heroku. But I later learned this decision would limit how I break up and send resources to users. Heroku does not support HTTP/2 yet, so to minimize network requests, I stuck with delivering as few files possible instead of splitting the code into component-specific files and delivering bits and pieces ad hoc.

With that constraint in mind, I kept all the HTML in one file (index.html), all non-critical CSS in index.css, and broke up the Javascript into just 2 files organized by functionality. Index.js contains code and data needed to create interactive components, such as the slides. Interaction.js defines event handlers and the actions they trigger (such as 'get the next image' or 'exit the slideshow'). 

An API was not provided for the images; I hardcoded the images to expedite development of the frontend rather than the backend (API, database) as I saw this more as a UX protoyping exercise than a full stack project. In later iterations, I would pull images from an external database or a CDN such as Cloudinary that can optimize images on-the-fly.

My simple password protection is not very secure (inputs are not even hashed). It was only meant to restrict traffic and the app does not hold any sensitive information at this stage of development. I was operating under the belief that the focus of this assignment was more on interactions, transitions, and UI design than security.

## Performance Optimizations: Application responsiveness

* Animating with CSS instead of Javascript - Javascript enables more complex animations but it runs on the main thread where it must compete with reflows, repaints, and style calculations for computing resources. On the other hand, CSS animations run off-main-thread on a separate thread (usually on the GPU). CSS suffices for the relatively simple animations of mobile-gallery and performs better for its use case: most of the animations in mobile-gallery involve Composite properties (transforms and opacity) instead of Layout and Paint properties. Changes to Composite properties do not require layout or style computations (which only run on the main thread) and hence can continue running even if the main thread is blocked. 

* translate3D() - I used translate3d() because it forces hardware acceleration (unlike translate()) and doesn't trigger reflows or repaints (unlike setting style properties like top or left).

* textContent - In an earlier iteration, I dynamically updated the titlebar text by creating a new node each time the title changed and replacing the old title node with the new one. This was causing a reflow each time so I refactored the code to update the node's text by assigning textContent instead of creating and replacing nodes. When updating just the text, textContent performs better than innerText or innerHTML because textContent only injects text - not markup. For this same reason, textContent is safe against XSS attacks.

## Performance Optimizations: Load time

The below optimizations halved the Time to Interactive and First Meaningful Paint:

* Optimized Images - I compressed, resized, and reencoded the images to reduce file sizes and page load times. I dropped the image quality down to 75%, which was the lowest level at which my humble human eyes could not perceive any difference from 100% quality. Though WebP and JPEG 2000 create smaller file sizes for similar image quality, I default to JPG (RGB) format because all graphical web browsers support it. WebP images are only served if the browser supports it.

* createDocumentFragment - Each time we add or remove a node to the DOM triggers a computationally expensive and browser-blocking reflow. I try to minimize reflows by creating and storing each node 'offsite' in a DocumentFragment (which lives outside the active DOM tree) then appending a batch of nodes to the DOM all at once - triggering only one reflow instead of several (one for each node).

* Eliminated Render Blocking Resources - To speed up initial render, I inlined critical CSS (CSS for the initial screen) into the head of the document and deferred loading of non-critical CSS with a small script at the end of the html file that dynamically appends a style node to the DOM after all resources have loaded (except for resources marked with the async or defer attribute). With the async attribute, I allow index.js to load asynchronously but pause the HTML parser to execute index.js because I need the script to attach event handlers and create DOM elements. With the defer attribute, I allow interaction.js to load asynchronously but defer its execution until after HTML parsing completes because the user cannot interact with elements that have not rendered yet.

## Scalability

A gallery of 500 photos would put us over the Lighthouse-recommended ~1000 node limit for maintaining decent runtime and memory performance. To support such massive galleries, I would consider reusing DOM nodes and replacing their content instead of creating and appending a new node to the tree. This would trigger a repaint but avoid the more costly reflow (layout thrashing). I began implementing this strategy as a circular buffer but ran out of time while debugging issues with two-way data binding as references to old nodes would disappear before the node was ready to be recycled. 

If the images are stored and served externally, another strategy I would consider for scalability and load time minimization is caching image metadata so that we fetch images over the network piecemeal instead of fetching the entire gallery at once. More images can be loaded as the user scrolls down the gallery, giving the effect of 'infinite scrolling'. I would merge incoming data into an object to prevent duplicate image data from getting added to the gallery.

## Maintainability

 As the codebase grows and dependencies may be added, I would break up the code further into reusable modules and use a dependency management tool such as Webpack to split up and deliver code as needed. Modularizing the code will also clean up the global namespace so global variables avoid conflicting with variables added later. For now, the small size of the app makes it acceptable to load all the scripts rather than making many network requests for such small amounts of code.

## TODO

* Support multi-touch interactions, like pinch-zoom
* Lazy load images as they move above the fold (infinite scrolling)
* Implement circular or ring buffer
* Bundle and minify code with Webpack
* Transpile ES6 to ES5 for legacy browsers
* Add test coverage
* Serve images from an API or CDN to optimize and serve images on-the-fly
* Use more secure password protection (encryption or htaccess)
* Add router to enable deep linking
* Add secondary actions, such as sharing and commenting
* Add keyboard and mouse events for desktop so users can tab between fields or images
* Complete conversion to PWA (cache assets)
