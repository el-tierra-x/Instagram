import { User } from '../../../utils/types/storeTypes';
import { LOADING_STATE } from '../../../utils/constants/storeConstants';

import {ReactComponent as Avatar} from '../../../assets/avatar.svg';
import {ReactComponent as FollowersIcon} from '../../../assets/followers.svg';
import { combineClassNames } from '../../../utils/functions/domUtils';

import UserNameOneLine from '../UserNameOneLine';
import ProgressiveImage from '../../logical/ProgressiveImage';
import { EmptyFallback } from '../../ui/FallbackPageComponents';

import './recentuserslist.css';
import { MAX_LETTERS_ON_RECENT_USERS_LIST } from '../../../utils/constants/styleConstants';


function RecentUsersList({usersList , className} : {usersList : User[] , className ?: string}){
  return <div className={combineClassNames("recent-users-list-wrapper" , className ?? '')}>
  <EmptyFallback dataState={usersList.length === 0 ? LOADING_STATE.EMPTY : LOADING_STATE.IDLE} size="small" fallbackText="No Recent Users" icon={<FollowersIcon/>}>
    <ul className="recent-users__list">
        <h4>Your Favourites</h4>
        {usersList.map((user)=>{
          return <UserNameOneLine 
            avatar={<ProgressiveImage
              imageArray={
                [
                  {
                    blur : true,
                    url : user.avatar.thumb
                  },
                  {
                    blur : false,
                    url : user.avatar.small
                  }
                ]
              }
              alt={user.username}
              ErrorComponent={<i className="avatar-fallback"><Avatar/></i>}
            />} 
            className="recent-users-list"
            size="small"
            username={user.username}
            key={user.id}
            maxCharacters={MAX_LETTERS_ON_RECENT_USERS_LIST}
          />
        })}  
      </ul>
    </EmptyFallback>
    </div>
}

export default RecentUsersList;
