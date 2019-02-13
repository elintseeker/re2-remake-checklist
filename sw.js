self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('re2chklist-cache').then(function(cache) {
      return cache.addAll([
        '/re2-remake-checklist/',
        '/re2-remake-checklist/index.html',
        '/re2-remake-checklist/about.html',
        '/re2-remake-checklist/reference.html',
        '/re2-remake-checklist/modal.html',
        '/re2-remake-checklist/css/app.min.css',
        '/re2-remake-checklist/js/script.min.js',
        '/re2-remake-checklist/assets/powerpanel-chief.jpg',
        '/re2-remake-checklist/assets/powerpanel-jail.jpg',
        '/re2-remake-checklist/assets/powerpanel-chiefb.jpg',
        '/re2-remake-checklist/assets/powerpanel-jailb.jpg'
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