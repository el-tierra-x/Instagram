import { combineClassNames } from '../../../utils/functions/domUtils';
import { FallbackErrorProps } from './types';

import './fallbackPage.css';

function FallbackErrorPage({
     icon,
     className,
     retryFunction,
     fallbackText,
     size
} : FallbackErrorProps)  {
  return <div className={combineClassNames("fallback-inline-page",
     className ?? '',
     "fallback-inline-page--error",
     size ? "fallback-inline-page--" + size : 'fallback-inline-page--large'
  )}>
     <div className="fallback-inline">
          <i className="fallback-inline-page__icon">
               {icon}
          </i>
          <span className="fallback-inline-page__text">{fallbackText}</span>
     </div>
     {retryFunction ? <button type="button" onClick={retryFunction}>Retry Now</button> : null}
  </div>;
}

export default FallbackErrorPage;
