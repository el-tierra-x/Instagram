import { combineClassNames } from "../../../utils/functions/domUtils"
import './fallbackErrorImage.css';

function FallbackErrorImage({removeBorder , showText , size , height , width} : {
     removeBorder ?: boolean,
     showText ?: boolean,
     size ?: 'small' | 'medium' | 'large',
     height ?: string,
     width ?: string
}){
  return <div className={combineClassNames("fallback-error-image",
          `fallback-error-image--${size ?? 'large'}`
     )} style={{
          border : removeBorder ? "0px" : undefined,
          width,
          height
     }}>
     <i className="fallback-error-image__error-icon">!</i>
     {showText ? <span className="fallback-error-image__error-text">This Image could not be loaded.</span> : null}
  </div>;
}

export default FallbackErrorImage;
