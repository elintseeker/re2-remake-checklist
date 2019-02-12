self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('re2chklist-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/about.html',
        '/reference.html',
        '/modal.html',
        '/css/app.min.css',
        '/js/script.min.js',
        '/assets/powerpanel-chief.jpg',
        '/assets/powerpanel-jail.jpg',
        '/assets/powerpanel-chiefb.jpg',
        '/assets/powerpanel-jailb.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});