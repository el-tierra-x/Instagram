import { CACHE_TYPES } from "../utils/constants/cacheConstants";
import { LOADING_STATE } from "../utils/constants/storeConstants";
import { Photo, ThunkType, UserExpanded } from "../utils/types/storeTypes";
import { APIfetchFeedPage, APIfetchSingleUser, APIfetchUserPhotosPage} from "../utils/functions/api";
import { updateUserTimeStampData } from "../utils/functions/cachePolicyUtilities";
import { cacheFeedPage, deleteAllFeedCache } from "../utils/functions/feedCacheUtilities";
import { cacheUserPhotoPage, cacheUserProfile, deleteUserCachePages, makeSpaceForUserCache } from "../utils/functions/userCacheUtilities";
import { getDataFromCache, isPageCacheable } from "../utils/functions/cacheCommonUtilities";
import { createLoadingState } from "../utils/functions/utilsForStore";
import { addPageToNewsFeedAction,addPageToUserAction,changeCurrentUserAction,deleteCurrentUserAction,loadingStateActionForUserData,loadingStateForNewsFeedPageAction, loadingStateForUserPhotosPageAction, replaceNewsFeedAction, replaceUserPhotosAction } from "./actions";

export const fetchNewsFeedPage : (pageNumber : number)=>ThunkType<void> = (pageNumber : number)=>{
     return async (dispatch , getState)=>{

          dispatch(
               loadingStateForNewsFeedPageAction(
                    pageNumber === 1 ? createLoadingState(LOADING_STATE.LOADING,'loading images') 
                    : 
                    createLoadingState(LOADING_STATE.NEW_PAGE_LOADING , 'loading more photos')
               )
          );

          const dataFromCache = getDataFromCache({
               type : CACHE_TYPES.NEWS_FEED_PHOTOS,
               pageNumber
          })

          if(dataFromCache){
               if(pageNumber === 1) dispatch(replaceNewsFeedAction(dataFromCache as Photo[]))
               else dispatch(addPageToNewsFeedAction(dataFromCache as Photo[]));
          }

          else{
               const {data : newsFeedPageData , error : newsFeedPageError} = await APIfetchFeedPage();
               if(!newsFeedPageError && newsFeedPageData){
                    if(isPageCacheable(CACHE_TYPES.NEWS_FEED_PHOTOS , pageNumber)){
                         cacheFeedPage(pageNumber , newsFeedPageData );
                    }

                    if(pageNumber === 1) dispatch(replaceNewsFeedAction(newsFeedPageData));
                    else dispatch(addPageToNewsFeedAction(newsFeedPageData));

               }
               else if(!newsFeedPageData && newsFeedPageError){
                    return dispatch(
                         loadingStateForNewsFeedPageAction(
                              createLoadingState(LOADING_STATE.ERROR , newsFeedPageError.errors.join('&nbsp;'))
                         )
                    )
               }
          }

          return dispatch(
               loadingStateForNewsFeedPageAction(
                    createLoadingState(LOADING_STATE.IDLE , '')
               )
          )

     }
}

export const HardRefreshNewsFeedData : ()=>ThunkType<void> = ()=>{
     return (dispatch)=>{
          deleteAllFeedCache();
          dispatch(fetchNewsFeedPage(1));
     }
}

export const HardRefreshUserData : ()=>ThunkType<void> = ()=>{
     return (dispatch , getState)=>{
          const username = getState().userProfileData?.userInfo.username;
          if(username){
               deleteUserCachePages(username);
               dispatch(fetchUserProfile(username));
               dispatch(fetchUserPhotosPage(username , 1));
          } 
     }
}


export const fetchUserProfile : (username : string)=>ThunkType<void> = (username : string)=>{
     return async (dispatch)=>{
          dispatch(loadingStateActionForUserData(
               createLoadingState(LOADING_STATE.LOADING , 'loading user profile')
          ))
          
          dispatch(deleteCurrentUserAction());
          dispatch(replaceUserPhotosAction([]));

          const dataFromCache = getDataFromCache(
               {
                    type : CACHE_TYPES.USER_PROFILE,
                    userID : username
               }
          )

          if(dataFromCache){
               dispatch(changeCurrentUserAction(dataFromCache as UserExpanded));
          }
          
          else{
               const {data : userProfileData , error : userProfileError} = await APIfetchSingleUser(username);
               if(userProfileData && !userProfileError){
                    makeSpaceForUserCache();
                    cacheUserProfile(userProfileData , username);
                    dispatch(changeCurrentUserAction(userProfileData));
               }
               else if(!userProfileData && userProfileError){
                    return dispatch(loadingStateActionForUserData(
                         createLoadingState(LOADING_STATE.ERROR , userProfileError.errors.join('&'))
                    ))
               }
          }

          updateUserTimeStampData(username);

          return dispatch(loadingStateActionForUserData(
               createLoadingState(LOADING_STATE.IDLE , '')
          ))

     }
}

export const fetchUserPhotosPage : (username : string , pageNumber : number)=>ThunkType<void> = (username : string , pageNumber : number)=>{
     return async (dispatch)=>{

          dispatch(
               loadingStateForUserPhotosPageAction(
                    pageNumber === 1 ? createLoadingState(LOADING_STATE.LOADING,'loading images') 
                    : 
                    createLoadingState(LOADING_STATE.NEW_PAGE_LOADING , 'loading more photos')
               )
          );

          const dataFromCache = getDataFromCache({
               type : CACHE_TYPES.USER_PHOTOS,
               pageNumber,
               userID : username
          })

          if(dataFromCache){
               if(pageNumber === 1) dispatch(replaceUserPhotosAction(dataFromCache as Photo[]))
               else dispatch(addPageToUserAction(dataFromCache as Photo[]))
          }

          else{
               const {data : userPhotosPageData , error : userPhotosPageError} = await APIfetchUserPhotosPage(username , pageNumber);
               if(userPhotosPageData && !userPhotosPageError){

                    if(userPhotosPageData.length === 0){
                         if(pageNumber === 1){
                              return dispatch(loadingStateForUserPhotosPageAction(
                                   createLoadingState(LOADING_STATE.EMPTY , '')
                              ))
                         }
                         else{
                              return dispatch(loadingStateForUserPhotosPageAction(
                                   createLoadingState(LOADING_STATE.END_OF_LIST , '')
                              ))
                         }
                    }

                    if(isPageCacheable(CACHE_TYPES.USER_PHOTOS , pageNumber)){
                         cacheUserPhotoPage(pageNumber , userPhotosPageData , username);
                    }

                    if(pageNumber === 1) dispatch(replaceUserPhotosAction(userPhotosPageData))
                    else dispatch(addPageToUserAction(userPhotosPageData))

               }
               else if(!userPhotosPageData && userPhotosPageError){
                    return dispatch(loadingStateForUserPhotosPageAction(
                         createLoadingState(LOADING_STATE.ERROR , userPhotosPageError.errors.join('&'))
                    ))
               }
          }

          return dispatch(loadingStateForUserPhotosPageAction(
               createLoadingState(LOADING_STATE.IDLE , '')
          ))

     }
}