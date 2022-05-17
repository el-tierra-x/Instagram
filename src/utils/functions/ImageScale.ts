export default class ImageZoomHandler{

     private startingDistance : number;
     private touchEventActive : boolean;
     public imageComponent : HTMLElement;
     public scaleFactor : number

     constructor(imageComponent : HTMLElement , scaleFactor ?: number){
          if(!imageComponent) throw new Error('Element not defined');
          this.imageComponent = imageComponent;

          this.touchEventActive = false;
          this.startingDistance = 0;
          this.scaleFactor = scaleFactor ?? 0.00005;

          if(this.imageComponent) this.attachEventListeners();
     }

     setTransformOriginAtMidpoint(x1 : number , x2 : number , y1 : number , y2 : number){

          const midpointCoordinateX = (x2 + x1) / 2;
          const midpointCoordinateY =  (y2 + y1) / 2;
          const imageComponentCoordinates = this.imageComponent.getBoundingClientRect();

          const relativeCoordinateX = midpointCoordinateX - imageComponentCoordinates.x;
          const relativeCoordinateY = midpointCoordinateY - imageComponentCoordinates.y;

          this.imageComponent.style.transformOrigin = `${relativeCoordinateX}px ${relativeCoordinateY}px`

     }

     getTouchDistance(touchesArray : TouchList){

          const xDiff = Math.abs(touchesArray[1].clientX - touchesArray[0].clientX);
          const yDiff = Math.abs(touchesArray[1].clientY - touchesArray[0].clientY);


          return yDiff * yDiff + xDiff * xDiff;
     }

     touchStartEvent(evt : TouchEvent){

          if(evt.touches.length === 2){
               evt.preventDefault();
               evt.stopImmediatePropagation();

               this.startingDistance = this.getTouchDistance(evt.touches);

               this.setTransformOriginAtMidpoint(
                    evt.touches[1].clientX,
                    evt.touches[0].clientX,
                    evt.touches[1].clientY,
                    evt.touches[0].clientY
               )

               this.touchEventActive = true;
               this.imageComponent.addEventListener('touchmove',this.touchMoveEvent.bind(this))
               this.imageComponent.style.transition = 'none';
          }

     }

     touchMoveEvent(evt : TouchEvent){


          if(evt.touches.length === 2 && this.touchEventActive){
               evt.preventDefault();
               evt.stopImmediatePropagation();

               const newTouchDistance = this.getTouchDistance(evt.touches);
               const diff = newTouchDistance - this.startingDistance;
               const scaleAmount = diff * this.scaleFactor;

               if(scaleAmount > 1){
                    this.imageComponent.style.transform = `scale(${scaleAmount})`;
               }
          }

     }

     touchEndEvent(){

          if(this.touchEventActive){
               this.imageComponent.style.transition = `transform 0.2s ease-out`;
               this.imageComponent.style.transform = "scale(1)";
               this.imageComponent.removeEventListener('touchmove',this.touchMoveEvent.bind(this));
          }
          this.touchEventActive = false;

     }

     attachEventListeners(){
          this.imageComponent.addEventListener('touchstart' , this.touchStartEvent.bind(this));
          this.imageComponent.addEventListener('touchend',this.touchEndEvent.bind(this));
     }

     destroy(){
          this.imageComponent.removeEventListener('touchstart',this.touchStartEvent);
          this.imageComponent.removeEventListener('touchend', this.touchEndEvent);
     }

}
