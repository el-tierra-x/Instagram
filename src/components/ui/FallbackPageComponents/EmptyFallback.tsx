import { EmptyFallbackPageProps } from './types';

import { combineClassNames } from '../../../utils/functions/domUtils';

import './fallbackPage.css'
import { LOADING_STATE } from '../../../utils/constants/storeConstants';

function EmptyFallback({
     fallbackText,
     className,
     icon,
     size,
     dataState,
     children
} : EmptyFallbackPageProps) {

  return dataState === LOADING_STATE.EMPTY ? <div className={combineClassNames("fallback-full-page",
          className ?? '',
          size ? "fallback-full-page--" + size : "fallback-full-page--large" 
     )}>
          <i className="fallback-full-page__icon">
               {icon}
          </i>
          <span className="fallback-full-page__text">{fallbackText}</span>
     </div> : <>{children}</>
}

export default EmptyFallback;