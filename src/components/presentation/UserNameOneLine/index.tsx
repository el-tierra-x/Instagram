import { combineClassNames } from '../../../utils/functions/domUtils';
import { fitToLength } from '../../../utils/functions/miscUtils';

import { UserNameOneLineProps } from './types';

import './oneLineUsername.css';
import { Link } from 'react-router-dom';

function UserNameOneLine({className , size , username , avatar , onClick , maxCharacters} : UserNameOneLineProps) {
  return <Link to={`/profile/${username}`} className={combineClassNames(className ?? '' , 
     'oneline-username',
     `oneline-username--${size}`
  )}
  onClick={onClick}
   >
     <div className="oneline-username__avatar">{avatar}</div>
     <span className="oneline-username__name">{maxCharacters ? fitToLength(username , maxCharacters) : username}</span>
  </Link>;
}

export default UserNameOneLine;
