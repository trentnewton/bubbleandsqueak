const CACHE_NAME = 'bubbleandsqueak-v1'
const OFFLINE_GIF = '/user/themes/bubbleandsqueak/dist/assets/img/offline.gif'
const PAGENOTFOUND = '/error'

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll([
    '/user/themes/bubbleandsqueak/dist/assets/css/app.css',
    '/user/themes/bubbleandsqueak/dist/assets/js/app.js',
    '/user/themes/bubbleandsqueak/dist/assets/img/offline.gif',
  ])))
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return
  if (event.request.headers.get('accept').indexOf('text/html') === -1) return

  const requestUrl = new URL(event.request.url)
  let options = {}

  if (requestUrl.href.startsWith('https://www.googletagmanager.com') ||
      requestUrl.href.startsWith('https://www.google-analytics.com') ||
      requestUrl.href.startsWith('https://fonts.gstatic.com') ||
      requestUrl.href.startsWith('https://maps.gstatic.com') ||
      requestUrl.href.startsWith('https://fonts.googleapis.com') ||
      requestUrl.href.startsWith('https://maps.googleapis.com') ||
      requestUrl.href.startsWith('https://connect.facebook.net') ||
      requestUrl.href.startsWith('https://www.facebook.com')) {
    // no cors
    options = { mode: 'no-cors' }
  }

  event.respondWith(fetch(event.request, options)
    .then((response) => {
      if (response.status === 404) {
        return fetch(PAGENOTFOUND)
      }
      const resClone = response.clone()
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request.url, response)
        return resClone
      })
    })
    .catch(() => caches.open(CACHE_NAME).then(cache => cache.match(event.request.url)
      .then((response) => {
        return response || fetch(OFFLINE_GIF)
      })
      .catch(() => fetch(OFFLINE_GIF)))))
})