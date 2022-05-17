import './fallbackLoading.css';
import {ReactComponent as LoadingIcon} from '../../../assets/loadingIcon.svg';
import { combineClassNames } from '../../../utils/functions/domUtils';

function FallbackLoadingImage({height , width , size , removeBorder} : {height ?: string , width ?: string , size ?: 'small' | 'large' | 'medium' , removeBorder ?: boolean}) {
  return <div className="fallback-loading-image" style={{height , width , border : removeBorder ? "0px" : undefined}}>
    <i className={combineClassNames(
      "fallback-loading-image__loading-icon",
      `fallback-loading-image__loading-icon--${size ?? 'large'}`
    )}><LoadingIcon/></i>
  </div>;
}

export default FallbackLoadingImage;
