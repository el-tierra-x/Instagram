import { UserExpanded } from '../../../utils/types/storeTypes';
import ProgressiveImage from '../../logical/ProgressiveImage';
import FallbackErrorImage from '../../ui/FallbackErrorImage';
import FallbackLoadingImage from '../../ui/FallbackLoadingImage';
import StatsIcon from '../StatsIcon';

import {ReactComponent as HeartIcon} from '../../../assets/heart.svg';
import {ReactComponent as FollowersIcon} from '../../../assets/followers.svg';
import {ReactComponent as PhotosIcon} from '../../../assets/photos.svg';

import { IconAnimations } from '../../../utils/constants/iconAnimation';

import './userProfileHead.css';
import DataStateWrapper from '../../logical/LoadingWrapper';

import { useAppSelector } from '../../../store/hooks';
import { FallbackErrorPage , FallbackLoadingPage } from '../../ui/FallbackPageComponents';
import { LOADING_STATE } from '../../../utils/constants/storeConstants';

function UserProfileHead({
     userProfile
} : {userProfile ?: UserExpanded}){

     const userProfileLoadingState = useAppSelector(state=>state.userLoadingConfig);

     return <DataStateWrapper 
               currentState={userProfileLoadingState}
               loadingComponent={<FallbackLoadingPage 
                    fallbackText="Loading User Details" 
                    icon={<FollowersIcon/>}
               />}
               errorComponent={<FallbackErrorPage
                    fallbackText={userProfileLoadingState.state === LOADING_STATE.ERROR ? userProfileLoadingState.errorText : ''}
                    icon={<FollowersIcon/>}
               />}
               
          >
          {userProfile ?  <>
          <div className="user-profile-head">
          <div className="user-profile-head__avatar-wrapper">
               <ProgressiveImage
                    alt={userProfile.username}
                    imageArray={[
                         {
                              blur : true,
                              url : userProfile.avatar.thumb
                         },
                         {
                              blur : false,
                              url : userProfile.avatar.small
                         },
                         {
                              blur : false,
                              url : userProfile.avatar.large
                         }
                    ]}
                    LoadingComponent={<FallbackLoadingImage removeBorder={true}/>}
                    ErrorComponent={<FallbackErrorImage removeBorder={true}/>}
                    title={userProfile.username}
                    className="user-profile-head__avatar"
                    compareOnStateReload={true}
               />
          </div>
          <div className="user-profile-head__avatar-info">
               <h1 className="user-profile-head__avatar-username">@{userProfile.username}</h1>
               <h3 className="user-profile-head__avatar-fullname">{userProfile.fullName}</h3>
               <div className="user-profile-head__stats">
                    <StatsIcon
                         icon={<HeartIcon/>}
                         animation={IconAnimations.HEART_BEATING}
                         isEnabled={true}
                         isActive={userProfile.likedByUser}
                         statValue={userProfile.likes}
                         className="user-profile-head__stats__icon"
                    />
                    <StatsIcon
                         icon={<FollowersIcon/>}
                         isEnabled={true}
                         isActive={false}
                         statValue={userProfile.followers}
                         className="user-profile-head__stats__icon"
                    />
                    <StatsIcon
                         icon={<PhotosIcon/>}
                         isEnabled={true}
                         isActive={false}
                         statValue={userProfile.totalPhotos}
                         className="user-profile-head__stats__icon"
                    />
               </div>
          </div>
          </div>
          <p className="user-profile-page__bio">{userProfile.bio || 'No Bio Provided'}</p>
          </>
          : null}
     </DataStateWrapper>
}

export default UserProfileHead;
