import { STORE_ACTIONS } from "../utils/constants/storeConstants"
import { LoadingConfigType, Photo, StoreActionBundle, UserExpanded , CommentUser } from "../utils/types/storeTypes"

export function loadingStateActionForUserData(newLoadingState : LoadingConfigType) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.CHANGE_USER_DATA_STATE,
          payload: newLoadingState
     }
}

export function loadingStateForUserPhotosPageAction(newLoadingState : LoadingConfigType) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.CHANGE_USER_PHOTOS_DATA_STATE,
          payload: newLoadingState
     }
}

export function loadingStateForNewsFeedPageAction(newLoadingState : LoadingConfigType) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.CHANGE_NEWSFEED_DATA_STATE,
          payload: newLoadingState
     }
}

export function addPageToNewsFeedAction(photos : Photo[]) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.ADD_PHOTOS_TO_NEWSFEED,
          payload : photos
     }
}

export function replaceNewsFeedAction(photos : Photo[]) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.REPLACE_PHOTOS_OF_NEWSFEED,
          payload : photos
     }
}

export function changeCurrentUserAction(newUserData : UserExpanded) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.CHANGE_CURRENT_USER,
          payload : newUserData
     }
}

export function deleteCurrentUserAction() : StoreActionBundle{
     return {
          type : STORE_ACTIONS.DELETE_CURRENT_USER
     }
}

export function replaceUserPhotosAction(photos : Photo[]) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.REPLACE_PHOTOS_OF_USER,
          payload : photos
     }
}

export function addPageToUserAction(photos : Photo[]) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.ADD_PHOTOS_TO_USER,
          payload : photos
     }
}

export function changePreviewAction(photoID : string | null) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.CHANGE_PREVIEW,
          payload : photoID
     }
}

export function IncrementLikesOnNewsFeedPhoto(photoID : string) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.INCREMENT_LIKE_ON_NEWSFEED_IMAGE,
          payload : photoID
     }
}

export function DecrementLikesOnNewsFeedPhoto(photoID : string) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.DECREMENT_LIKE_ON_NEWSFEED_IMAGE,
          payload : photoID
     }
}

export function IncrementLikesOnUserProfilePhoto(photoID : string) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.INCREMENT_LIKE_ON_USERPROFILE_IMAGE,
          payload : photoID
     }
}

export function DecrementLikesOnUserProfilePhoto(photoID : string) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.DECREMENT_LIKE_ON_USERPROFILE_IMAGE,
          payload : photoID
     }
}

export function AddCommentActionOnNewsFeedPhoto(photoID : string , commentText : string , commenterUser : CommentUser) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.ADD_COMMENT_ON_NEWSFEED_IMAGE,
          payload : {
               photoID,
               commentText,
               commenterUser
          }
     }
}

export function AddCommentActionOnUserProfilePhoto(photoID : string , commentText : string , commenterUser : CommentUser) : StoreActionBundle{
     return {
          type : STORE_ACTIONS.ADD_COMMENT_ON_USERPROFILE_IMAGE,
          payload : {
               photoID,
               commentText,
               commenterUser
          }
     }
}