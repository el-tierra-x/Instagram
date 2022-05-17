const CACHE_NAME = 'version-25';
const referrersWhiteList = [
     'https://vercel.com/'
]
const blackListKeyWords = [
     'chrome-extension',
     'unsplash'
]
const fontURLs = [
     "https://fonts.googleapis.com/css?family=Sora:100,200,300,regular,500,600,700,800"
]

self.addEventListener('activate',(e)=>{
     e.waitUntil(
          caches.keys().then((cacheNames)=>{
               cacheNames.forEach((cacheName)=>{
                    if(cacheName !== CACHE_NAME) caches.delete(cacheName);
               })
          })
     );
})

self.addEventListener('install' , (e)=>{
     console.log('serviceworker installed');
})

self.addEventListener('fetch' , (e)=>{

     const isNotABlackListURL = blackListKeyWords.filter((key)=>{
          return e.request.url.includes(key);
     }).length === 0;

     const isAFontURL = fontURLs.includes(e.request.url);

     if(isNotABlackListURL || isAFontURL){
          e.respondWith(
               caches.match(e.request.destination === 'document' ? '/' : e.request).then((matchedResponse)=>{
                    if(matchedResponse) return matchedResponse;
                    else{
                         return fetch(e.request).then((response)=>{
                              const responseClone = response.clone();
                              caches.open(CACHE_NAME).then((cache)=>{
                                   if(e.request.destination === 'document'){
                                        cache.put('/' , responseClone);
                                   }
                                   else cache.put(e.request , responseClone);
                              })
                              return response;
                         }).catch(()=>{
                              return new Response('not found' , {
                                   status : 500,
                                   statusText : 'not found'
                              })
                         })
                    }
               })

          )
     }
})