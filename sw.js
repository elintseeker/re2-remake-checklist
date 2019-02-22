var files = [
  './',
  'index.html',
  'about.html',
  'reference.html',
  'modal.html',
  'assets/app.min.css',
  'assets/app.min.js',
  'assets/powerpanel-chief.jpg',
  'assets/powerpanel-jail.jpg',
  'assets/powerpanel-chiefb.jpg',
  'assets/powerpanel-jailb.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('re2chklist-cache').then(function(cache) {
      return cache.addAll(files);
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