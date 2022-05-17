import React, { useEffect, useState } from "react";
import { LOADING_STATE } from "../constants/storeConstants";

export function useIntersection({
     ref , options , dataState
} : {
     ref : React.RefObject<Element> , options : IntersectionObserverInit  , dataState : LOADING_STATE
}){

     const [isIntersecting , setIsIntersecting] = useState(false);

     useEffect(()=>{
          const element = ref.current;
          if(dataState !== LOADING_STATE.IDLE) return setIsIntersecting(false);
          const observer = new IntersectionObserver((entries)=>{
               const entry = entries[0];
               if(entry.isIntersecting){
                    setIsIntersecting(true);
               }
               else {
                    setIsIntersecting(false);
               }
          },options)
          if(element) observer.observe(element);

          return ()=>{
               if(observer){
                    if(element) observer.unobserve(element);
                    observer.disconnect();
               }
          }
     },[options, ref , dataState])

     return isIntersecting;

}

