import { PageWrapperPropTypes } from './types';
import './pageWrapper.css';

function PageWrapper({children} : PageWrapperPropTypes) {
  return <div className="page-wrapper">
       {children}
  </div>;
}

export default PageWrapper;
