import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import StatsIcon from '../../presentation/StatsIcon';
import UserNameOneLine from '../../presentation/UserNameOneLine';
import ProgressiveImage from '../ProgressiveImage';

import { Comment, Photo } from '../../../utils/types/storeTypes';

import {ReactComponent as Heart} from '../../../assets/heart.svg';
import {ReactComponent as Download} from '../../../assets/download.svg';
import {ReactComponent as LocationIcon} from '../../../assets/location.svg';
import {ReactComponent as CalendarIcon} from '../../../assets/calendar.svg';
import {ReactComponent as CommentsIcon} from '../../../assets/comment.svg';
import {ReactComponent as SendIcon} from '../../../assets/send.svg';
import {ReactComponent as CrossIcon} from '../../../assets/crossIcon.svg';

import './previewModal.css';
import { IconAnimations } from '../../../utils/constants/iconAnimation';
import { convertDateToString } from '../../../utils/functions/miscUtils';
import { AddCommentActionOnNewsFeedPhoto, AddCommentActionOnUserProfilePhoto, changePreviewAction, DecrementLikesOnNewsFeedPhoto, DecrementLikesOnUserProfilePhoto, IncrementLikesOnNewsFeedPhoto, IncrementLikesOnUserProfilePhoto } from '../../../store/actions';
import FallbackLoadingImage from '../../ui/FallbackLoadingImage';
import FallbackErrorImage from '../../ui/FallbackErrorImage';


import { useLocation } from 'react-router';


function CommentsList({comments} : {comments : Comment[]}){
  return <div className="comments-container">
    <h3 className="comments-heading">
      <CommentsIcon/>&nbsp;Comments
    </h3>
    {comments.length > 0 ? <ul className="comments-list">
      {comments.map((comment , index)=>{
        return <li className="comments-list__comment" key={index}>
          <h5 className="comments-list__commenter">@{comment.commenterUser.username}</h5>
          {comment.commentText}
        </li>
      })}
    </ul> : <h5 className="comments-empty-list">No Comments Yet. Add Below.</h5>}
  </div>
}

function AddComment({photoId} : {photoId : string}){
  const [comment , setComment] = useState('');
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  return <div className="add-comment-form-wrapper">

  <h5 className="add-comment-form__heading">Add Comment</h5>
  <form className="add-comment-form" onSubmit={(e)=>{

    e.preventDefault();
    if(comment.trim().length > 0){
      if(pathname === '/'){
        dispatch(AddCommentActionOnNewsFeedPhoto(photoId , comment , {
        username : "You"
        }))
      }

      else if(pathname.match(/\/profile\//gm)){
        dispatch(AddCommentActionOnUserProfilePhoto(photoId , comment , {
          username : "You"
        }))
      }
    }
    setComment('');
  }}>
    <textarea value={comment} onChange={(e)=>setComment(e.target.value)}/>
    <button type="submit">
      <SendIcon/>
    </button>
  </form>

  </div>
}

function PreviewModal(){
  const previewImageID = useAppSelector(state=>state.currentPreviewPhotoID);
  const newsFeedPhotos = useAppSelector(state=>state.photosInNewsFeed);
  const userPhotos = useAppSelector(state=>state.userProfileData?.userPhotos ?? []);
  const [previewImage , setPreviewImage] = useState<Photo | null>(null);
  const dispatch = useAppDispatch();
  const {pathname} = useLocation();

  useEffect(()=>{
    
    if(!previewImageID) {
      setPreviewImage(null);
      return;
    }

    let previewImageFromStore;
    
    if(pathname === '/'){
      previewImageFromStore = newsFeedPhotos.filter(photo=>photo.id === previewImageID)[0];
    }
    else if(pathname.match(/\/profile\//gm)){
      previewImageFromStore = userPhotos.filter(photo=>photo.id === previewImageID)[0];
    }

    if(previewImageFromStore) setPreviewImage(previewImageFromStore);

  },[previewImageID , newsFeedPhotos , pathname , userPhotos])

  return previewImage ? <div className="preview-modal-wrapper">
       <div className="preview-modal">

         <div className="preview-modal__image">

           <ProgressiveImage 
            alt={previewImage.description || `Image By ${previewImage.user.username}`}
            className="preview-modal__image--image-element"
            allowScaling={true}
            imageArray={[
              {
                blur : true,
                url : previewImage.url.thumb
              },
              {
                blur : false,
                url : previewImage.url.small
              },
              {
                blur : false,
                url : previewImage.url.large
              }
            ]}
            LoadingComponent={<FallbackLoadingImage size="large" removeBorder={true}/>}
            ErrorComponent={<FallbackErrorImage size="large" removeBorder={true} showText={true}/>}
            />
         </div>

         <div className="preview-modal__content" tabIndex={0}>

           <div className="preview-modal__username">

            <UserNameOneLine
            onClick={()=>dispatch(changePreviewAction(null))}
            username={previewImage.user.username} 
            avatar={<ProgressiveImage
              alt={previewImage.user.username}
              title={previewImage.user.username}
              imageArray={[
                {
                  blur : true,
                  url : previewImage.user.avatar.thumb
                },
                {
                  blur : false,
                  url : previewImage.user.avatar.small
                },
                {
                  blur : false,
                  url : previewImage.user.avatar.large
                }
              ]}
              LoadingComponent={<FallbackLoadingImage size="small" removeBorder={true}/>}
              ErrorComponent={<FallbackErrorImage size="small" removeBorder={true} showText={false}/>}
            />}
            size="large"
           />

           </div>

           <div className="preview-modal__stats">

             <StatsIcon
              icon={<Heart/>}
              animation={IconAnimations.HEART_BEATING}
              isActive={previewImage.likedByUser}
              isEnabled={true}
              statValue={previewImage.counts.likes}

              onClick={()=>{

                if(previewImage.likedByUser){
                  if(pathname === '/') dispatch(DecrementLikesOnNewsFeedPhoto(previewImage.id))
                  else if(pathname.match(/\/profile\//gm)) dispatch(DecrementLikesOnUserProfilePhoto(previewImage.id));
                }
                else{
                  if(pathname === '/') dispatch(IncrementLikesOnNewsFeedPhoto(previewImage.id))
                  else if(pathname.match(/\/profile\//gm)) dispatch(IncrementLikesOnUserProfilePhoto(previewImage.id));
                }

              }}

             />
             {previewImage.counts.downloads ? 
             <StatsIcon
              icon={<Download/>}
              isActive={false}
              isEnabled={true}
              statValue={previewImage.counts.downloads ?? 'N/A'}
             /> : null}

           </div>

           <div className="preview-modal__line-data">
             <CalendarIcon/>&nbsp;
             {convertDateToString(previewImage.createdAt)}
           </div>

           {previewImage.location ? <div className="preview-modal__line-data">
             <LocationIcon/>&nbsp;
             {previewImage.location}
           </div> : null}
           <CommentsList comments={previewImage.comments}/>
           <AddComment photoId={previewImage.id}/>
            
          <button type="button" className="expand-text">
            More
          </button>
         </div>

       </div>

      <button type="button" className="close-preview-modal" onClick={
        ()=>{
          dispatch(changePreviewAction(null));
        }
      }>
        <CrossIcon/> 
      </button>
  </div> : null
}

export default PreviewModal;
