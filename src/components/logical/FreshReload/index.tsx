import {ReactComponent as ReloadIcon} from '../../../assets/loadingIcon.svg';

import './freshreload.css';

function FreshReload() {
  return <div className="fresh-reload">
     <span className="fresh-reload__icon">
          <ReloadIcon/>
     </span>
     <span>Hold Down To Refresh</span>
  </div>;
}

export default FreshReload;
