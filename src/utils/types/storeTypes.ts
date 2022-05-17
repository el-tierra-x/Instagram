import { ThunkAction } from "redux-thunk";
import { STORE_ACTIONS , LOADING_STATE } from "../constants/storeConstants"

export type LoadingStateGeneratorType = (state : LoadingConfigType , text : string)=>LoadingConfigType

export type LoadingConfigType = {
     state : LOADING_STATE.LOADING,
     loadingText : string
} | {
     state :  LOADING_STATE.IDLE
} | {
     state : LOADING_STATE.NEW_PAGE_LOADING,
     loadingText : string
} | {
     state : LOADING_STATE.ERROR,
     errorText : string
} | {
     state : LOADING_STATE.EMPTY,
} | {
     state : LOADING_STATE.END_OF_LIST,
} | {
     state : LOADING_STATE.NOT_STARTED_YET
}


export type PhotoID = string;

export type PhotoURL = {
     thumb : string,
     small : string,
     large : string
}

export type PhotoStats = {
     downloads ?: number,
     likes : number
}

export type Photo = {
     id : PhotoID,
     url : PhotoURL,
     user : User,
     description ?: string,
     counts : PhotoStats,
     location ?: string,
     createdAt : string,
     likedByUser : boolean,
     comments : Comment[]
}


export type User = {
     id : string,
     username : string,
     fullName : string,
     avatar : PhotoURL,
}

export type CommentUser = {
     username : string
}

export type UserExpanded = User & {
     likes : number,
     followers : number,
     collections : number,
     totalPhotos : number,
     bio ?: string,
     name : string,
     likedByUser : boolean,
     followedByUser : boolean 
}


export type StoreActionBundle = {
     type : STORE_ACTIONS.ADD_PHOTOS_TO_NEWSFEED,
     payload : Photo[]
} | {
     type : STORE_ACTIONS.REPLACE_PHOTOS_OF_NEWSFEED,
     payload : Photo[]
} | {
     type : STORE_ACTIONS.ADD_PHOTOS_TO_USER,
     payload : Photo[] 
} | {
     type : STORE_ACTIONS.CHANGE_CURRENT_USER,
     payload : UserExpanded
} | {
     type : STORE_ACTIONS.CHANGE_NEWSFEED_DATA_STATE,
     payload : LoadingConfigType
} | {
     type : STORE_ACTIONS.REPLACE_PHOTOS_OF_USER,
     payload : Photo[]
} | {
     type : STORE_ACTIONS.DELETE_CURRENT_USER
} | {
     type : STORE_ACTIONS.CHANGE_USER_PHOTOS_DATA_STATE,
     payload : LoadingConfigType
} | {
     type : STORE_ACTIONS.CHANGE_PREVIEW,
     payload : string | null
} | {
     type : STORE_ACTIONS.CHANGE_USER_DATA_STATE,
     payload : LoadingConfigType
} | {
     type : STORE_ACTIONS.INCREMENT_LIKE_ON_NEWSFEED_IMAGE,
     payload : string
} | {
     type : STORE_ACTIONS.DECREMENT_LIKE_ON_NEWSFEED_IMAGE
     payload : string
} | {
     type : STORE_ACTIONS.ADD_COMMENT_ON_NEWSFEED_IMAGE,
     payload : CommentPayload
} | {
     type : STORE_ACTIONS.ADD_COMMENT_ON_USERPROFILE_IMAGE,
     payload : CommentPayload
} | {
     type : STORE_ACTIONS.INCREMENT_LIKE_ON_USERPROFILE_IMAGE
     payload : string
} | {
     type : STORE_ACTIONS.DECREMENT_LIKE_ON_USERPROFILE_IMAGE
     payload : string
}


export type Comment = {
     commentText : string,
     commenterUser : CommentUser
}

export type CommentPayload = {
     photoID : string;
} & Comment;

export type StoreStateType = {
     photosInNewsFeed : Photo[],
     userProfileData ?: {
          userPhotos : Photo[],
          userInfo : UserExpanded
     }
     currentPreviewPhotoID : string | null,

     newsFeedLoadingConfig : LoadingConfigType,
     userLoadingConfig : LoadingConfigType,
     userPhotosLoadingConfig : LoadingConfigType,

     nextPageNumberForNewsFeed : number,
     nextPageNumberForUser : number

}


export type ThunkType<ReturnType> = ThunkAction<ReturnType , StoreStateType , unknown , StoreActionBundle>
