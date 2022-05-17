import React ,{ useState , useEffect, useRef } from 'react';
import { combineClassNames } from '../../../utils/functions/domUtils';
import { ImageSrcType, ProgressiveImageProps } from './types';

import './progressiveImage.css';
import ImageZoomHandler from '../../../utils/functions/ImageScale';
import ProgressiveImageLoader from '../../../utils/functions/progressiveImage';
import { areSameArrays } from '../../../utils/functions/miscUtils';

const ProgressiveImage = React.memo(({imageArray ,
   onClick , 
   alt , 
   className , 
   title , 
   LoadingComponent,
   allowScaling,
   compareOnStateReload
  } : ProgressiveImageProps)=>{

  const [lastLoadedImage , setLastLoadedImage] = useState<ImageSrcType | null>()

  const imageRefForScaling = useRef<HTMLDivElement | null>(null); 
  const scalingObjectRef = useRef<ImageZoomHandler | null>(null);
  useEffect(()=>{

    const newProgressiveImage = new ProgressiveImageLoader(imageArray , (lastLoadedImage)=>{
      setLastLoadedImage(lastLoadedImage);
    });

    return ()=>{
      newProgressiveImage.destroy();
    }

  },[imageArray])
  
  useEffect(()=>{
    if(!allowScaling) return;
    scalingObjectRef.current = new ImageZoomHandler(imageRefForScaling.current as HTMLDivElement);

    return ()=>{
      if(scalingObjectRef.current) scalingObjectRef.current.destroy();
    }
  },[allowScaling])

  return <div style={{overflow : "hidden"}} 
    ref={imageRefForScaling} 
    onClick={onClick} 
    className={combineClassNames("progressive-image-wrapper",
      className ?? ''
    )}>

    {lastLoadedImage ? <img title={title} alt={alt} 
      src={lastLoadedImage.url} 
      className={
        lastLoadedImage.blur ? "image--blur" : ""
      }
    /> : null}

    {!lastLoadedImage ? LoadingComponent : null}
  </div>
} , (prevProps , nextProps)=>{
  return areSameArrays(prevProps.imageArray , nextProps.imageArray);
})

export default ProgressiveImage;
