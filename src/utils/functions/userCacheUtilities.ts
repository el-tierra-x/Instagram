import { CACHE_TYPES, MAX_CACHED_USER_LIMIT } from "../constants/cacheConstants";
import { CacheDataType } from "../types/cacheTypes";
import { Photo, UserExpanded } from "../types/storeTypes";
import { generateCacheKey, setCacheOnLocalStorage, deleteCache } from "./cacheCommonUtilities";
import { getLeastRecentUser, deleteUserTimeStampData } from "./cachePolicyUtilities";


export function cacheUserPhotoPage(pageNumber: number, userPageData: Photo[], userID: string) {

     const cacheUserPageKey = generateCacheKey({
          type: CACHE_TYPES.USER_PHOTOS,
          pageNumber,
          userID,
     });

     const cachedUserPhotosPageData = {
          type: CACHE_TYPES.USER_PHOTOS,
          data: userPageData
     } as CacheDataType;

     setCacheOnLocalStorage(cacheUserPageKey, cachedUserPhotosPageData);

}

export function cacheUserProfile(userData: UserExpanded, userID: string) {

     const cacheUserPageKey = generateCacheKey({
          type: CACHE_TYPES.USER_PROFILE,
          userID,
     });

     const cachedUserPhotosPageData = {
          type: CACHE_TYPES.USER_PROFILE,
          data: userData
     } as CacheDataType;

     setCacheOnLocalStorage(cacheUserPageKey, cachedUserPhotosPageData);

}

function isUserProfileKey(key: string | null) {
     if (key) {
          return key.match(/CACHED_USER\*.+\*PROFILE/gm);
     }
     return false;
}

export function getAllUserProfilesCached() {
     const userProfilesCached: string[] = [];
     for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && isUserProfileKey(key)) {
               userProfilesCached.push(key);
          }
     }
     return userProfilesCached;
}

function getUserFromKey(key: string) {
     return key.split('*')[1];
}

export function deleteUserCachePages(username: string) {
     const allUserCachesList: string[] = [];

     for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key) {
               if (getUserFromKey(key) === username) {
                    allUserCachesList.push(key);
               }
          }
     }

     allUserCachesList.forEach((key) => deleteCache(key));
}

export function makeSpaceForUserCache() {
     const userProfilesCached = getAllUserProfilesCached();

     if (userProfilesCached.length >= MAX_CACHED_USER_LIMIT) {
          const leastRecentUser = getLeastRecentUser();
          if (leastRecentUser) {
               deleteUserCachePages(leastRecentUser);
               deleteUserTimeStampData(leastRecentUser);
          }
     }
}
