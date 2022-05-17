import { IconAnimations } from '../../../utils/constants/iconAnimation';

import { Photo } from '../../../utils/types/storeTypes';

import StatsIcon from '../StatsIcon';
import {ReactComponent as HeartIcon} from '../../../assets/heart.svg';
import {ReactComponent as DownloadIcon} from '../../../assets/download.svg';
import {ReactComponent as CommentsIcon} from '../../../assets/comment.svg';
import FallbackLoadingImage from '../../ui/FallbackLoadingImage';
import ProgressiveImage from '../../logical/ProgressiveImage';
import FallbackErrorImage from '../../ui/FallbackErrorImage';

import './singleFeedImage.css';

import { useAppDispatch } from '../../../store/hooks';
import { changePreviewAction, DecrementLikesOnNewsFeedPhoto, DecrementLikesOnUserProfilePhoto, IncrementLikesOnNewsFeedPhoto, IncrementLikesOnUserProfilePhoto } from '../../../store/actions';
import UserNameOneLine from '../UserNameOneLine';
import { convertDateToString } from '../../../utils/functions/miscUtils';
import { useLocation } from 'react-router';


function ImageInfo({photo} : {photo : Photo}){

     return <div className="single-feed-photo__description">
          <span className="single-feed-photo__comment">
               <b>{photo.comments[0].commenterUser.username}</b>&nbsp;&nbsp;
               {photo.comments[0].commentText}
          </span>
          <span className="single-feed-photo__description__date">{convertDateToString(photo.createdAt)}</span>
     </div>

}


function SingleFeedImage(feedImage : Photo) {
     const dispatch = useAppDispatch();
     const loadImageToPreview = ()=>{
          dispatch(changePreviewAction(feedImage.id));
     }
     const {pathname} = useLocation();

     return <div className="single-feed-photo-wrapper" id={`post-${feedImage.id}`}>
          <div className="single-feed-photo__user">
               <UserNameOneLine
               avatar={
                    <ProgressiveImage
                    imageArray={[
                         {
                              blur : true,
                              url : feedImage.user.avatar.thumb
                         },
                         {
                              blur : false,
                              url : feedImage.user.avatar.small
                         }
                    ]}
                    alt="avatar"
                    />
               }
               size="medium"
               username={feedImage.user.username}
               />
          </div>
          <div className="single-feed-photo">
               <div className="single-feed-photo__image-section" onClick={loadImageToPreview}>
                    <ProgressiveImage
                         title="Tap To Preview" 
                         className="single-feed-photo__image"
                         alt={feedImage.description || `Image Added By ${feedImage.user.username}`}
                         imageArray={[
                              {
                                   blur : true,
                                   url : feedImage.url.thumb
                              },
                              {
                                   blur : false,
                                   url : feedImage.url.small
                              }
                         ]}
                         LoadingComponent={<FallbackLoadingImage height="500px" removeBorder={true}/>}
                         ErrorComponent={<FallbackErrorImage height="500px" showText={true} removeBorder={true}/>}
                    />
               </div>
               <div className="single-feed-photo__stats-section">
                    <StatsIcon 
                         animation = {IconAnimations.HEART_BEATING}
                         isEnabled={true}
                         isActive={feedImage.likedByUser}
                         icon={<HeartIcon/>}
                         className="single-feed-photo__stats-section__icon--heart"
                         onClick={()=>{
                              if(feedImage.likedByUser){
                                   if(pathname === '/') dispatch(DecrementLikesOnNewsFeedPhoto(feedImage.id));
                                   else if(pathname.match(/\/profile\//gm)) dispatch(DecrementLikesOnUserProfilePhoto(feedImage.id));
                              }
                              else{
                                   if(pathname === '/') dispatch(IncrementLikesOnNewsFeedPhoto(feedImage.id));
                                   else if(pathname.match(/\/profile\//gm)) dispatch(IncrementLikesOnUserProfilePhoto(feedImage.id));
                              }
                         }}
                    />

                    {feedImage.counts?.downloads ? <StatsIcon 
                         isEnabled={true}
                         isActive={false}
                         icon={<DownloadIcon/>}
                         className="single-feed-photo__stats-section__icon--download"
                    /> : null}

                    <StatsIcon
                         isEnabled={true}
                         isActive={false}
                         icon={<CommentsIcon/>}
                         className="single-feed-photo__stats-section__icon--comment"
                         onClick={loadImageToPreview}
                         />
               </div>
               <span className="single-feed-photo__likes-count">
                    {feedImage.counts.likes} Likes
               </span>
          </div>
          <ImageInfo photo={feedImage}/>
     </div>
}

export default SingleFeedImage;
