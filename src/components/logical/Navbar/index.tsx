import Logo from '../../ui/Logo';
import { ReactComponent as HeartIcon } from '../../../assets/heartFilled.svg';
import { ReactComponent as MessageIcon } from '../../../assets/message.svg';
import { ReactComponent as SunIcon } from '../../../assets/sun.svg';
import { ReactComponent as MoonIcon } from '../../../assets/moon.svg';
import { ReactComponent as ReloadIcon } from '../../../assets/reload.svg';


import './navbar.css'
import React, { useEffect , useState , useRef, PropsWithChildren, useCallback } from 'react';


import { useLocation } from 'react-router';
import { useAppDispatch } from '../../../store/hooks';
import { HardRefreshNewsFeedData, HardRefreshUserData } from '../../../store/sideEffects';

import RecentUsersList from '../../presentation/RecentUsersList';
import FreshReload from '../FreshReload';

import { Themes } from '../../../utils/types/themeTypes';
import { changeDocumentTheme, getThemeFromLocalStorage } from '../../../utils/functions/theme';
import { User } from '../../../utils/types/storeTypes';
import PullDownToRefreshLoader from '../../../utils/functions/pullDownToRefresh';
import { getAllUserProfilesCached } from "../../../utils/functions/userCacheUtilities";
import { CacheDataTimedType } from '../../../utils/types/cacheTypes';
import { combineClassNames } from '../../../utils/functions/domUtils';

function NavbarIcon({onClick , children , className} : PropsWithChildren<{className ?: string , onClick ?: React.MouseEventHandler}>){
  return <i tabIndex={0} className={combineClassNames('navbar__icon' , className ?? '')} onClick={onClick}>
    {children}
  </i>
}

function Navbar() {
  const [theme , setTheme] = useState<Themes>(Themes.LIGHT);
  const [recentUsersList , setRecentUsersList] = useState<User[]>([]);
  const navbarRef = useRef<HTMLElement>(null);
  const {pathname} = useLocation();
  const dispatch = useAppDispatch();
  const hardRefresh = useCallback(()=>{
        if(pathname === '/') dispatch(HardRefreshNewsFeedData());
        else if(pathname.match(/\/profile\/.*/gm)) dispatch(HardRefreshUserData());
  },[pathname , dispatch])

  useEffect(()=>{
    const lastUsedTheme = getThemeFromLocalStorage();
    lastUsedTheme ? setTheme(lastUsedTheme) : setTheme(Themes.LIGHT);

    if(!navbarRef.current) return;

    const pullDownToRefresh = new PullDownToRefreshLoader({
      dragger : document.body,
      mover : navbarRef.current,
      callback : hardRefresh
    })

    return ()=>{
      pullDownToRefresh.destroy();
    }

  },[hardRefresh])

  return <nav className="navbar" ref={navbarRef}>
      <Logo size="small" showFullLogo={true}/>
      <div className="navbar__icons">

        <NavbarIcon>
          <MessageIcon/>
        </NavbarIcon>

        <NavbarIcon onClick={()=>{
          const allUsersInCache = getAllUserProfilesCached();
          const newRecentUsersList = allUsersInCache.map((key)=>{
            const cacheData = JSON.parse(localStorage.getItem(key) as string) as CacheDataTimedType;
            return cacheData.data;
          })
          setRecentUsersList(newRecentUsersList as User[]);
        }}>
          <HeartIcon/>
          <RecentUsersList className="navbar__popup" usersList={recentUsersList}/>
        </NavbarIcon>

        <NavbarIcon onClick={()=>{
          setTheme(
            theme=>{
              const targetTheme = theme === Themes.DARK ? Themes.LIGHT : Themes.DARK
              changeDocumentTheme(targetTheme);
              return targetTheme;
            }
          )
        }}>
          {theme === Themes.DARK ? <MoonIcon/> : <SunIcon/>}
        </NavbarIcon>

        <NavbarIcon className="navbar__icon--avatar">
          <img alt="user-avatar" src="https://images.unsplash.com/profile-fb-1642565214-c6f81d38a1bc.jpg?dpr=2&auto=format&fit=crop&w=20&h=20&q=60&crop=faces&bg=fff"/>
        </NavbarIcon>

        <NavbarIcon className="navbar__icon--only-lg" onClick={hardRefresh}>
          <ReloadIcon/>
        </NavbarIcon>

      </div>
      <FreshReload/>
  </nav>;
}

export default Navbar;
