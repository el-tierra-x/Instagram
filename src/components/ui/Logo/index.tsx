import {ReactComponent as LongFormLogo} from '../../../assets/longFormLogo.svg';
import {ReactComponent as ShortLogo} from '../../../assets/thumbLogo.svg';
import { giveClassNameBasedOnCondition, scrollToTop } from '../../../utils/functions/domUtils';

import { LogoProps } from './types';

import './logo.css';
import { NavLink } from 'react-router-dom';



function Logo({showFullLogo , size} : LogoProps) {
  return <NavLink to="/" onClick={()=>{
    scrollToTop();
  }} className={`logo\
  ${giveClassNameBasedOnCondition(size === 'large','logo--large' , 'logo--small')}`}>
       {showFullLogo ? <LongFormLogo/> : <ShortLogo/>}
  </NavLink>;
}

export default Logo;
