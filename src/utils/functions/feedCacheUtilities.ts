import { CACHE_TYPES } from "../constants/cacheConstants";
import { CacheDataType } from "../types/cacheTypes";
import { Photo } from "../types/storeTypes";
import { generateCacheKey, setCacheOnLocalStorage, deleteCache } from "./cacheCommonUtilities";


export function cacheFeedPage(pageNumber: number, feedPageData: Photo[]) {

     const cacheFeedKey = generateCacheKey({
          type: CACHE_TYPES.NEWS_FEED_PHOTOS,
          pageNumber
     });

     const cachedFeedPageData = {
          type: CACHE_TYPES.NEWS_FEED_PHOTOS,
          data: feedPageData
     } as CacheDataType;

     setCacheOnLocalStorage(cacheFeedKey, cachedFeedPageData);

}

function isNewsFeedCache(key: string) {
     return key.match(/CACHED_FEED_PAGE-[0-9]/gm);
}

export function deleteAllFeedCache() {
     const newsFeedCacheList: string[] = [];
     for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
               if (isNewsFeedCache(key))
                    newsFeedCacheList.push(key);
          }
     }

     newsFeedCacheList.forEach((cacheKey) => {
          deleteCache(cacheKey);
     });

}
