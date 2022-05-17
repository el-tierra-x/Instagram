import { Photo } from '../../../utils/types/storeTypes';
import ProgressiveImage from '../../logical/ProgressiveImage';
import FallbackErrorImage from '../../ui/FallbackErrorImage';
import FallbackLoadingImage from '../../ui/FallbackLoadingImage';

import {ReactComponent as HeartIcon} from '../../../assets/heart.svg';

import './singlephotogrid.css';
import { useNavigate } from 'react-router';

function SingleGridPhotoItem({
  photo
} : {photo : Photo}) {


  const navigate = useNavigate();

  return <div className="single-grid-photo-item" onClick={()=>{navigate(`?tab=list` , {
    state : {
      scrollID : photo.id
    }
  })}}>
    <ProgressiveImage 
      key={photo.id}
      alt={photo.description ?? `Image Added By ${photo.user.username}`}
      imageArray={[
        {
          blur : true,
          url : photo.url.thumb
        },
        {
          blur : false,
          url : photo.url.small
        }
      ]}
      LoadingComponent={<FallbackLoadingImage removeBorder={true}/>}
      ErrorComponent={<FallbackErrorImage removeBorder={true}/>}
      className="single-grid-photo-item__image"
    />
    <span className="single-grid-photo-item__likes">
      <HeartIcon/>&nbsp;{photo.counts.likes} Likes
    </span>
  </div>;
}

export default SingleGridPhotoItem;
