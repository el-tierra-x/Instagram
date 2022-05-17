import { LoadingConfigType , StoreStateType } from "../types/storeTypes";


export enum LOADING_STATE{'LOADING','NEW_PAGE_LOADING','IDLE','ERROR', 'EMPTY' , 'END_OF_LIST' , 'NOT_STARTED_YET'};

export const NOT_STARTED_LOADING_STATE = {
     state : LOADING_STATE.NOT_STARTED_YET
} as LoadingConfigType;


export const INITIAL_STORE_STATE : StoreStateType = {
     photosInNewsFeed : [],
     currentPreviewPhotoID : null,
     newsFeedLoadingConfig : NOT_STARTED_LOADING_STATE,
     userLoadingConfig : NOT_STARTED_LOADING_STATE,
     userPhotosLoadingConfig : NOT_STARTED_LOADING_STATE,
     nextPageNumberForNewsFeed : 1,
     nextPageNumberForUser : 1
} 

export enum STORE_ACTIONS{
     ADD_PHOTOS_TO_NEWSFEED = '/photos/newsfeed/add',
     REPLACE_PHOTOS_OF_NEWSFEED = '/photos/newsfeed/replace',
     CHANGE_NEWSFEED_DATA_STATE = '/photos/state',

     CHANGE_CURRENT_USER = '/user/change',
     ADD_PHOTOS_TO_USER = '/photos/user/add',
     REPLACE_PHOTOS_OF_USER = '/photos/user/replace',
     CHANGE_USER_PHOTOS_DATA_STATE = '/user/photos/state',
     CHANGE_USER_DATA_STATE = '/user/profile/state',
     DELETE_CURRENT_USER = '/user/delete',

     CHANGE_PREVIEW = '/photos/preview',

     INCREMENT_LIKE_ON_NEWSFEED_IMAGE = '/news-feed/like-add',
     DECREMENT_LIKE_ON_NEWSFEED_IMAGE = '/news-feed/like-remove',
     INCREMENT_LIKE_ON_USERPROFILE_IMAGE = '/user-profile/like-add',
     DECREMENT_LIKE_ON_USERPROFILE_IMAGE = '/user-profile/like-remove',
     ADD_COMMENT_ON_NEWSFEED_IMAGE = '/news-feed/add-comment',
     ADD_COMMENT_ON_USERPROFILE_IMAGE = '/user-profile/add-comment',
     REMOVE_COMMENT = '/photo/remove-comment'
}

