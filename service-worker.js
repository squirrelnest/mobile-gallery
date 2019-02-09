const CACHE_NAME = "V1"

// The install event is fired when the registration succeeds
this.addEventListener('install', async function() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
        '/index.html',
        '/index.css',
        '/index.js',
    ])
})

// The fetch event is fired every time the browser sends a request 
self.addEventListener('fetch', function(event) {
    // console.log(event.request.url);
});