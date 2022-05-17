import { combineClassNames } from '../../../utils/functions/domUtils';
import { FallbackInlineProps } from './types';

import './fallbackPage.css';
import {ReactComponent as LoadingIcon} from '../../../assets/loadingIcon.svg';

function FallbackLoadingInline({
     className,
     fallbackText,
     size
} : FallbackInlineProps)  {
  return <div className={combineClassNames("fallback-inline-page",
     className ?? '',
     size ? "fallback-inline-page--" + size : "fallback-inline-page--large",
     "fallback-inline-page--loading"
  )}>
     <div className="fallback-inline">
          <i className="fallback-inline-page__icon fallback-inline-page__icon--animate">
               <LoadingIcon/>
          </i>
          <span className="fallback-inline-page__text">{fallbackText}</span>
     </div>
  </div>;
}

export default FallbackLoadingInline;
