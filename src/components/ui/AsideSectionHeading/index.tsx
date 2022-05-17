import { AsideSectionWithHeadingProps } from './types';

import './asideSection.css';

function AsideSectionWithHeading({children , heading , subHeading} : AsideSectionWithHeadingProps) {
  return <div className="aside-section">
    <div className="aside-section__heading-component">
      <h3 className="aside-section__heading">{heading}</h3>
      <h5 className="aside-section__sub-heading">{subHeading}</h5>
    </div> 
    <div className="aside-section__content">
      {children}
    </div>
  </div>;
}

export default AsideSectionWithHeading;
