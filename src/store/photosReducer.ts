import { INITIAL_STORE_STATE, STORE_ACTIONS } from "../utils/constants/storeConstants";
import { StoreActionBundle, StoreStateType } from "../utils/types/storeTypes";

export default function photosReducer(state : StoreStateType = INITIAL_STORE_STATE , action : StoreActionBundle) : StoreStateType{
     switch(action.type){
          case STORE_ACTIONS.ADD_PHOTOS_TO_NEWSFEED : 
               return {
                    ...state,
                    photosInNewsFeed : [...state.photosInNewsFeed , ...action.payload],
                    nextPageNumberForNewsFeed : state.nextPageNumberForNewsFeed + 1
               }

          case STORE_ACTIONS.REPLACE_PHOTOS_OF_NEWSFEED : 
               return {
                    ...state,
                    photosInNewsFeed : action.payload,
                    nextPageNumberForNewsFeed : 2
               }

          case STORE_ACTIONS.CHANGE_NEWSFEED_DATA_STATE : 
               return {
                    ...state,
                    newsFeedLoadingConfig : action.payload
               }
          
          case STORE_ACTIONS.DELETE_CURRENT_USER : 
               
               return {
                    ...state , 
                    userProfileData : undefined
               }

          case STORE_ACTIONS.ADD_PHOTOS_TO_USER : 

               if(state.userProfileData){
                    return {
                         ...state,
                         userProfileData : {
                              ...state.userProfileData,
                              userPhotos : [...state.userProfileData.userPhotos , ...action.payload]                         
                         },
                         nextPageNumberForUser : state.nextPageNumberForUser + 1
                    }
               }
               return state;
          
          case STORE_ACTIONS.REPLACE_PHOTOS_OF_USER : 

               if(state.userProfileData){
                    return {
                         ...state,
                         userProfileData : {
                              ...state.userProfileData,
                              userPhotos : [...action.payload]
                         },
                         nextPageNumberForUser : 2
                    }
               }

               return state;

          case STORE_ACTIONS.CHANGE_CURRENT_USER : 
               return {
                    ...state,
                    userProfileData : {
                         ...state.userProfileData ?? {userPhotos : []},
                         userInfo : action.payload,
                    },
                    nextPageNumberForUser : 1
               }

          case STORE_ACTIONS.CHANGE_USER_PHOTOS_DATA_STATE : {
               return {
                    ...state,
                    userPhotosLoadingConfig : action.payload
               }
          }

          case STORE_ACTIONS.CHANGE_USER_DATA_STATE : {
               return {
                    ...state,
                    userLoadingConfig : action.payload
               }
          }

          case STORE_ACTIONS.CHANGE_PREVIEW : {
               return {
                    ...state,
                    currentPreviewPhotoID : action.payload
               }
          }

          case STORE_ACTIONS.ADD_COMMENT_ON_NEWSFEED_IMAGE : {
               return {
                    ...state,
                    photosInNewsFeed : state.photosInNewsFeed.map(photo=>{
                         if(photo.id === action.payload.photoID){
                              photo.comments = [...photo.comments ,
                              {
                                   commenterUser : action.payload.commenterUser , 
                                   commentText : action.payload.commentText
                              }]
                         }
                         return photo;
                    })
               } 
          }

          case STORE_ACTIONS.ADD_COMMENT_ON_USERPROFILE_IMAGE : {
               if(state.userProfileData){

                    return {
                         ...state,
                         userProfileData : 
                         {
                              ...state.userProfileData,
                              userPhotos : state.userProfileData.userPhotos.map(photo=>{
                              if(photo.id === action.payload.photoID){
                                   photo.comments = [...photo.comments ,
                                        {
                                             commenterUser : action.payload.commenterUser , 
                                             commentText : action.payload.commentText
                                        }]
                                   }
                                   return photo;
                              })
                         } 
                    }

               }
               return state;
          }

          case STORE_ACTIONS.INCREMENT_LIKE_ON_NEWSFEED_IMAGE : {
               return {
                    ...state,
                    photosInNewsFeed : state.photosInNewsFeed.map((photo)=>{
                         if(photo.id === action.payload){
                              photo.likedByUser = true;
                              photo.counts = {
                                   ...photo.counts,
                                   likes : photo.counts.likes + 1
                              }
                         }
                         return photo;
                    })
               }
          }

          case STORE_ACTIONS.DECREMENT_LIKE_ON_NEWSFEED_IMAGE : {
               return {
                    ...state,
                    photosInNewsFeed : state.photosInNewsFeed.map((photo)=>{
                         if(photo.id === action.payload){
                              photo.likedByUser = false;
                              photo.counts = {
                                   ...photo.counts,
                                   likes : photo.counts.likes - 1
                              }
                         }
                         return photo;
                    })
               }
          }

          case STORE_ACTIONS.INCREMENT_LIKE_ON_USERPROFILE_IMAGE : {
               if(state.userProfileData) return {
                    ...state,
                    userProfileData : {...state.userProfileData , 
                              userPhotos : state.userProfileData?.userPhotos.map((photo)=>{
                              if(photo.id === action.payload){
                                   photo.likedByUser = true;
                                   photo.counts = {
                                        ...photo.counts,
                                        likes : photo.counts.likes + 1
                                   }
                              }
                              return photo;
                         })
                    }
               }
               return state;
          }

          case STORE_ACTIONS.DECREMENT_LIKE_ON_USERPROFILE_IMAGE : {
               if(state.userProfileData) return {
                    ...state,
                    userProfileData : {...state.userProfileData , 
                              userPhotos : state.userProfileData?.userPhotos.map((photo)=>{
                              if(photo.id === action.payload){
                                   photo.likedByUser = false;
                                   photo.counts = {
                                        ...photo.counts,
                                        likes : photo.counts.likes - 1
                                   }
                              }
                              return photo;
                         })
                    }
               }
               return state;
          }

          default : return state;

     }
}