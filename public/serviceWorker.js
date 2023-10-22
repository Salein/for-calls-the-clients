const CACHE = "network-or-cache-v1"

const cachedFile = [
    'index.html',
    '/src/index.js',
    '/src/index.css',
]



self.addEventListener("install", async event => {
    const cache = await caches.open(CACHE)
    await cache.addAll(cachedFile)
})

self.addEventListener('fetch', event => {
    event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
   const cached = await caches.match(request)
   return cached ?? await fetch(request)
}