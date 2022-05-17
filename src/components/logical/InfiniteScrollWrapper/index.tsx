import { PropsWithChildren, useRef, useEffect } from 'react';
import { LOADING_STATE } from '../../../utils/constants/storeConstants';
import { useIntersection } from '../../../utils/functions/hooks';

import './infinitescroll.css';

function InfiniteScrollWrapper({
     dataState , children , callback
} : PropsWithChildren<{dataState : LOADING_STATE , className?:string , callback : ()=>void}> ) {

     const intersectionRef = useRef<HTMLSpanElement | null>(null);
     const blockCallback = useRef(false);
     const isIntersecting = useIntersection({
          ref : intersectionRef,
          dataState : dataState,
          options : {
               root : null,
               rootMargin : "0px",
               threshold : 1
          }
     })

     useEffect(()=>{
          if(isIntersecting && dataState === LOADING_STATE.IDLE && !blockCallback.current){
               callback();
               blockCallback.current = true;
               setTimeout(()=>{
                    blockCallback.current = false;
               },200);
          }
     },[callback , isIntersecting , dataState])

     return <>
          {children}
          <span ref={intersectionRef} className="intersection-line" ></span>
     </>;

}

export default InfiniteScrollWrapper;
