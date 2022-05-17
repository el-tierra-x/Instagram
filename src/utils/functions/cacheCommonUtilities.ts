import { CACHE_TYPES, EXPIRE_DURATION, MAX_CACHED_PAGE_LIMIT_FOR_FEED, MAX_CACHED_USER_PHOTOS_PAGE_LIMIT } from "../constants/cacheConstants";
import { CacheIdentifierType, CacheDataTimedType, CacheDataType } from "../types/cacheTypes";


export function generateCacheKey(cacheIdentifierBundle: CacheIdentifierType) {
     switch (cacheIdentifierBundle.type) {
          case CACHE_TYPES.USER_PHOTOS: return `CACHED_USER*${cacheIdentifierBundle.userID}*PAGE-${cacheIdentifierBundle.pageNumber}`;
          case CACHE_TYPES.NEWS_FEED_PHOTOS: return `CACHED_FEED_PAGE-${cacheIdentifierBundle.pageNumber}`;
          case CACHE_TYPES.USER_PROFILE: return `CACHED_USER*${cacheIdentifierBundle.userID}*PROFILE`;
     }
}

export function isPageCacheable(type: CACHE_TYPES.USER_PHOTOS | CACHE_TYPES.NEWS_FEED_PHOTOS, pageNumberToCache?: number) {

     switch (type) {
          case CACHE_TYPES.NEWS_FEED_PHOTOS:

               if (!pageNumberToCache)
                    return false;
               if (pageNumberToCache > MAX_CACHED_PAGE_LIMIT_FOR_FEED)
                    return false;
               return true;

          case CACHE_TYPES.USER_PHOTOS:

               if (!pageNumberToCache)
                    return false;
               if (pageNumberToCache > MAX_CACHED_USER_PHOTOS_PAGE_LIMIT)
                    return false;
               return true;
     }
}

function getCacheFromLocalStorage(cacheKey: string): CacheDataTimedType | null {
     const dataOnLocalStorage = localStorage.getItem(cacheKey);

     if (dataOnLocalStorage !== null) {
          return JSON.parse(dataOnLocalStorage) as CacheDataTimedType;
     }
     else {
          return null;
     }
}

function createCachedDataWithTimeout(cacheData: CacheDataType) {

     const timeOfCaching = new Date();
     const expiryTime = new Date(timeOfCaching.getTime() + EXPIRE_DURATION);

     const finalCacheData = {
          staleAt: expiryTime.toString(),
          type: cacheData.type,
          data: cacheData.data
     } as CacheDataTimedType;

     const finalCacheDataString = JSON.stringify(finalCacheData);

     return finalCacheDataString;

}

export function setCacheOnLocalStorage(cacheKey: string, cacheData: CacheDataType) {

     const cacheDataString = createCachedDataWithTimeout(cacheData);

     localStorage.setItem(cacheKey, cacheDataString);
}

function isCacheExpired(cacheIdentifier: CacheIdentifierType) {

     const cacheKey = generateCacheKey(cacheIdentifier);

     const cachedData = getCacheFromLocalStorage(cacheKey);

     if (cachedData) {
          const expireAt = new Date(cachedData.staleAt);
          const currentTime = new Date();

          if (currentTime.getTime() > expireAt.getTime()) {
               return true;
          }
     }

     return false;

}

function isCacheInvalid(cacheIdentifier: CacheIdentifierType) {

     const cacheKey = generateCacheKey(cacheIdentifier);

     const cachedData = getCacheFromLocalStorage(cacheKey);

     if (cachedData) {
          if (!cachedData.data)
               return true;
          if (cachedData.type !== cacheIdentifier.type)
               return true;
     }

     return false;

}
export function deleteCache(cacheKey: string) {

     const isDataPresentAgainstKey = localStorage.getItem(cacheKey);

     if (isDataPresentAgainstKey) {
          localStorage.removeItem(cacheKey);
     }

}
function getDataFromTimedCacheBundle(cacheData: CacheDataTimedType | null) {
     if (cacheData) {
          return cacheData.data;
     }
     return null;
}

export function getDataFromCache(cacheIdentifier: CacheIdentifierType) {

     const isDataInCacheExpired = isCacheExpired(cacheIdentifier);
     const isDataInCacheInvalid = isCacheInvalid(cacheIdentifier);
     const cacheKey = generateCacheKey(cacheIdentifier);

     if (isDataInCacheExpired || isDataInCacheInvalid) {
          deleteCache(cacheKey);
          return null;
     }
     else {
          return getDataFromTimedCacheBundle(getCacheFromLocalStorage(cacheKey));
     }

}
