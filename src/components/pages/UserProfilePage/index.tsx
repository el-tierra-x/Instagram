import { useEffect , useLayoutEffect } from 'react';
import { useLocation } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserPhotosPage, fetchUserProfile } from '../../../store/sideEffects';
import DataStateWrapper from '../../logical/LoadingWrapper';
import { FallbackErrorPage , FallbackLoadingPage , FallbackLoadingInline , EmptyFallback } from '../../ui/FallbackPageComponents';
import PageTabs from '../../ui/PageTabs';
import SingleFeedImage from '../../presentation/SingleFeedImage';
import SingleGridPhotoItem from '../../presentation/SinglePhotoGridItem';
import UserProfileHead from '../../presentation/UserProfileHead';

import {ReactComponent as FollowersIcon} from '../../../assets/followers.svg';

import './userprofilepage.css';
import InfiniteScrollWrapper from '../../logical/InfiniteScrollWrapper';
import { scrollToTop } from '../../../utils/functions/domUtils';

function extractUserFromPathname(pathname : string){
     return pathname.split('/')[2];
}

function UserProfilePage(){
     const location = useLocation();
     const [search] = useSearchParams();
     const dispatch = useAppDispatch();
     const currentUserProfile = useAppSelector(state=>state.userProfileData);
     const userPhotoLoadingState = useAppSelector(state=>state.userPhotosLoadingConfig);
     const nextUserPhotosPageToLoad = useAppSelector(state=>state.nextPageNumberForUser);

     const loadNextUserPhotosPage = ()=>{
          if(currentUserProfile?.userInfo){
               dispatch(fetchUserPhotosPage(currentUserProfile?.userInfo.username , nextUserPhotosPageToLoad))
          }
     }

     useEffect(()=>{
          scrollToTop();
          const username = extractUserFromPathname(location.pathname);
          dispatch(fetchUserProfile(username));
     },[location.pathname , dispatch])

     useLayoutEffect(()=>{
          const state = location.state as {scrollID ?: string}
          if(state && state.scrollID){
               const item = document.querySelector(`#post-${state.scrollID}`);
               setTimeout(()=>{
                    item?.scrollIntoView({
                    behavior : 'smooth',
                    block : 'start',
                    inline : 'nearest'
               })
               },500)
          }
     },[location.state])

     useEffect(()=>{
          if(!currentUserProfile?.userInfo) return;
          else dispatch(fetchUserPhotosPage(currentUserProfile.userInfo.username , 1))
     },[currentUserProfile?.userInfo , dispatch])

     return <div className="user-profile-page">
          <UserProfileHead
               userProfile={currentUserProfile?.userInfo}
          />
          <DataStateWrapper
               errorComponent={<FallbackErrorPage size="large" fallbackText="User Photos Could not be loaded." icon={<FollowersIcon/>}/>}
               currentState={ userPhotoLoadingState }
               loadingComponent={<FallbackLoadingPage fallbackText='Loading User Photos' icon={<FollowersIcon/>}/>}
               newPageLoadingComponent={<FallbackLoadingInline fallbackText='Loading User Photos'/>}
          >

               <InfiniteScrollWrapper 
                    dataState={userPhotoLoadingState.state} 
                    callback={()=>loadNextUserPhotosPage()}
               >
               <EmptyFallback dataState={userPhotoLoadingState.state} fallbackText="User's wall is empty" icon={<FollowersIcon/>}>
               <div className="user-profile-page__image-content">

                    {currentUserProfile?.userPhotos ? 
                         <>
                              <PageTabs pageTabs={
                                   [
                                        {label : 'GRID' , endpoint : 'grid'},
                                        {label : 'ONE-BY-ONE' , endpoint : 'list'}
                                   ]
                              }/>
                              {search.get('tab') === 'list' ? 
                              <div className="user-profile-page__list-view">
                                   {currentUserProfile.userPhotos.map((userPhoto)=>{
                                        return <SingleFeedImage key={userPhoto.id} {...userPhoto}/>
                                   })}
                              </div>
                              : 
                              <div className="user-profile-page__grid-view">
                                   {currentUserProfile.userPhotos.map((userPhoto)=>{
                                        return <SingleGridPhotoItem photo={userPhoto} key={userPhoto.id}/>
                                   })}
                              </div>
                              }
                         </>
                    :null}

               </div>
               </EmptyFallback>

               </InfiniteScrollWrapper>
          </DataStateWrapper>
     </div>
}

export default UserProfilePage;
