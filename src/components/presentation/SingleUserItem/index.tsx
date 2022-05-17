import { SingleUserItemProps } from './types';
import userFallback from '../../../assets/avatar.svg';
import './singleUserItem.css';
import UserNameOneLine from '../UserNameOneLine';
import ProgressiveImage from '../../logical/ProgressiveImage';
import { useState } from 'react';

function SingleUserItem({avatar , username} : SingleUserItemProps) {

  const [isFollowing , setFollowing] = useState(false);

  return <div className="single-user-item">
    <UserNameOneLine 
      avatar={<ProgressiveImage
        alt={username}
        imageArray={[{
          blur : false, url : avatar ?? userFallback
        }]}
      />}
      className="single-user-item__username"
      size="medium"
      username={username}
    />
    <button 
      title={
        isFollowing ? "Unfollow" : "Follow"
      }
      className={isFollowing ? 'following' : ''}
      onClick={()=>{
        setFollowing(following=>!following);
      }}
    >
    {isFollowing ? "Following" : "Follow"}
    </button>
  </div>;
}

export default SingleUserItem;
