import { ImageSrcType } from "../../components/logical/ProgressiveImage/types";

export default class ProgressiveImageLoader{
     public imageArray : ImageSrcType[];
     private nextImageIndexToLoad : number;
     private currentImageIndexLoaded : number;
     public placeholderImage : HTMLImageElement;
     public onLoad : (lastLoadedImage : ImageSrcType)=>void

     constructor(imageArray : ImageSrcType[] , onLoad : (lastLoadedImage : ImageSrcType)=>void){
          this.imageArray = imageArray;
          this.nextImageIndexToLoad = 0;
          this.currentImageIndexLoaded = -1;
          this.onLoad = onLoad;
          this.placeholderImage = new Image();
          this.initialiseImageElement();
     }

     supplyNextImageToLoad(){
          const imageToLoad = this.next();
          if(imageToLoad){
          this.placeholderImage.src = imageToLoad.url;
          }
     }

     initialiseImageElement(){

          this.supplyNextImageToLoad();

          this.placeholderImage.onload = ()=>{
               this.onLoad(this.imageArray[this.currentImageIndexLoaded]);
               this.supplyNextImageToLoad();
          };
     }

     next(){
          if(this.nextImageIndexToLoad === this.imageArray.length){
          return null;
          }
          const value = this.imageArray[this.nextImageIndexToLoad];
          this.currentImageIndexLoaded = this.nextImageIndexToLoad;
          this.nextImageIndexToLoad += 1;
          return value;
     }

     destroy(){
          this.placeholderImage.onload = null;
     }

}