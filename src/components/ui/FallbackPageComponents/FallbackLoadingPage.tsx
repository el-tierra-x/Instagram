import { FallbackPageProps } from './types';

import { combineClassNames } from '../../../utils/functions/domUtils';

import './fallbackPage.css'

function FallbackLoadingPage({
     fallbackText,
     className,
     icon,
     size
} : FallbackPageProps) {

  return <div className={combineClassNames("fallback-full-page",
          className ?? '',
          size ? "fallback-full-page--" + size : "fallback-full-page--large" 
     )}>
          <i className="fallback-full-page__icon">
               {icon}
          </i>
          <span className="fallback-full-page__loading-slider"></span>
          <span className="fallback-full-page__text">{fallbackText}</span>
     </div>;
}

export default FallbackLoadingPage;
