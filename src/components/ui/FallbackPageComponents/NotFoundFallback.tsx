import { combineClassNames } from '../../../utils/functions/domUtils';

import {ReactComponent as LogoIcon} from '../../../assets/thumbLogo.svg';

import './fallbackPage.css';

function NotFoundFallback() {
     
     return <div className={combineClassNames("fallback-full-page",
         "fallback-full-page--large" 
     )}>
          <i className="fallback-full-page__icon">
               <LogoIcon/>
          </i>
          <span className="fallback-full-page__text">This Page Could Not Be Found.</span>
     </div>
}

export default NotFoundFallback;
