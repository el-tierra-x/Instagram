import { StatsIconProps } from './types';

import { IconAnimations } from '../../../utils/constants/iconAnimation';
import { combineClassNames } from '../../../utils/functions/domUtils';

import './statsIcon.css';

function StatsIcon({icon , statValue , animation , isEnabled , isActive , className , onClick} : StatsIconProps) {

   return <div className={combineClassNames(
            'stats-icon',
            className ?? ''
            )}
            onClick={onClick}
         >
         <i className={combineClassNames("stats-icon__icon " ,
            animation && animation === IconAnimations.HEART_BEATING ? 'stats-icon__icon-heart' : '',
            isEnabled ? 'stats-icon__icon--enabled' : 'stats-icon__icon--disabled',
            isEnabled && isActive ? 'stats-icon__icon-active' : '')
         }
         >
            {icon}
         </i>
         {statValue !== null ? <span className="stats-icon__value">
            {statValue}
         </span> : null}
  </div>;
}

export default StatsIcon;
