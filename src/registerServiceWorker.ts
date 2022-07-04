import { register } from 'register-service-worker'
const STATIC_CACHE = "restapp.caches"



register('/sw.js', {
  
  ready (registration) {
    console.log('Service worker is active.', registration)
    
      caches.open(STATIC_CACHE).then(
          (x) => {
            x.addAll([
              '/',
              '/index.html',
            ])
          }
        )
  
  },
  registered (registration) {
    
    console.log('Service worker has been registered.')
  },
  cached (registration) {
    console.log('Content has been cached for offline use.')
  },
  updatefound (registration) {
    console.log('New content is downloading.')
  },
  updated (registration) {
    console.log('New content is available; please refresh.')
  },
  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  

  },
  error (error) {
    console.error('Error during service worker registration:', error)
  }
})