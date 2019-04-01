var CACHENAME = 'cache-v1';
var filestocache = ['favicon/android-icon-36x36.png', 
                    'favicon/android-icon-48x48.png',
                    'favicon/android-icon-72x72.png',
                    'favicon/android-icon-96x96.png',
                    'favicon/android-icon-144x144.png',
                    'favicon/android-icon-192x192.png',
                    'app.js',
                    'index.html',
                    'style.css'
                  ];

self.addEventListener('install', (event)=>{
  event.waitUntil(caches.open(CACHENAME).then((cache)=>{
    console.log('Cache berhasil diunduh');
    return cache.addAll(filestocache);
  }));
});

self.addEventListener('activate', (event)=>{
  return self.clients.claim();
});

self.addEventListener('fetch', (event)=>{
  event.respondWith(caches.match(event.request).then((response)=>{
    if(response)
    {
      return response;
    }

    return fetch(event.request);
  }));
});