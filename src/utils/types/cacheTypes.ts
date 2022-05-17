import { CACHE_TYPES } from "../constants/cacheConstants";
import { Photo, UserExpanded } from "./storeTypes";

export type CacheIdentifierType = {
     type : CACHE_TYPES.NEWS_FEED_PHOTOS,
     pageNumber : number
} | {
     type : CACHE_TYPES.USER_PHOTOS,
     userID : string,
     pageNumber : number
} | {
     type : CACHE_TYPES.USER_PROFILE,
     userID : string
} 

export type CacheDataType = {
     type : CACHE_TYPES.NEWS_FEED_PHOTOS,
     data : Photo[]
} | {
     type : CACHE_TYPES.USER_PHOTOS,
     data : Photo[]
} | {
     type : CACHE_TYPES.USER_PROFILE,
     data : UserExpanded
}

export type CacheDataTimedType = CacheDataType & {
     staleAt : string
}

export type UserTimeStampDataType = {
     [x : string] : string
}