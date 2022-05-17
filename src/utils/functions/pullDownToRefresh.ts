export default class PullDownToRefreshLoader{

     public dragger : HTMLElement;
     public mover : HTMLElement;
     public callback : ()=>void
     private touchedDown : boolean
     private isPointerHeldDown : boolean;
     private isThresholdTouchReached : boolean;
     private startingDistance : number;
     private timeout : number;
     private pullThresholdDistance : number;

     constructor({
          dragger,
          callback,
          mover,
          timeout,
          pullThresholdDistance
     }:{
          dragger : HTMLElement,
          mover : HTMLElement,
          callback : ()=>void,
          timeout ?: number,
          pullThresholdDistance ?: number
     }){
          this.dragger = dragger;
          this.callback = callback;
          this.touchedDown = false;
          this.mover = mover;
          this.isPointerHeldDown = false;
          this.isThresholdTouchReached = false;
          this.startingDistance = 0;

          this.timeout = timeout ?? 2000;
          this.pullThresholdDistance = pullThresholdDistance ?? 120;

          if(!this.dragger) throw new Error('undefined element');
          this.attachEventListeners();
     }

     moveMoverWithTransition = (y : number)=>{
          this.mover.style.transition = `transform 0.5s ease-out`;
          this.mover.style.transform = `translateY(${y}px)`
     }

     moveMoverWithoutTransition = (y : number)=>{
          this.mover.style.transition = 'none';
          this.mover.style.transform = `translateY(${y}px)`
     }


     mouseMoveEvent(e : MouseEvent){
          if(this.touchedDown){
              const yMoved = e.pageY
              if(e.target === this.mover){
                   e.preventDefault();
                   e.stopPropagation();
              }
              if(yMoved >= this.pullThresholdDistance){
                    this.isPointerHeldDown = true;
                    setTimeout(()=>{
                         if(this.isPointerHeldDown){
                              this.mouseLostEvent();
                              this.callback();
                         }
                    },this.timeout)
                    return;
              }
              this.isPointerHeldDown = false;
              this.moveMoverWithoutTransition(yMoved);
          }
     }

     touchStartEvent(e : TouchEvent){
          if(e.target === this.mover){
               e.stopPropagation();
               e.preventDefault();
               this.touchedDown = true;
               this.dragger.addEventListener('touchmove' , this.touchMoveEvent.bind(this) , {passive : false});

               //using half the height of the mover component to take as a standard starting point
               //motion is smoother when compared to a startingDistance of 0 or 100%
               this.startingDistance = this.mover.offsetHeight / 2;
          }
     }

     touchMoveEvent(e : TouchEvent) {
          if(this.touchedDown){
               if(this.isThresholdTouchReached) return;

               e.preventDefault();
               e.stopPropagation();

               const yMoved = e.touches[0].clientY - this.startingDistance;

               if(yMoved > this.pullThresholdDistance){

                    this.isThresholdTouchReached = true;
                    setTimeout(()=>{
                         if(this.isThresholdTouchReached){
                              this.touchLostEvent();
                              this.callback();
                         }
                    },this.timeout)

               }
               else this.moveMoverWithoutTransition(yMoved);
          } 
     }

     touchLostEvent(){
          if(this.touchedDown){
               this.dragger.removeEventListener('touchmove',this.touchMoveEvent.bind(this));
               this.moveMoverWithTransition(0);
               this.isPointerHeldDown = false;
               this.touchedDown = false;
          }
          if(this.isThresholdTouchReached) this.isThresholdTouchReached = false;
     }

     mouseHoldEvent(e : MouseEvent){
          if(e.target === this.mover){
               this.touchedDown = true; 
               this.dragger.addEventListener('mousemove',this.mouseMoveEvent.bind(this));
          }
     }

     mouseLostEvent(){
          if(this.touchedDown){
               this.dragger.removeEventListener('mousemove',this.mouseMoveEvent.bind(this));
               this.touchedDown = false;
          }
          this.isPointerHeldDown = false;
          this.moveMoverWithTransition(0);
     }

     attachEventListeners(){
          this.dragger.addEventListener('mousedown' , this.mouseHoldEvent.bind(this));
          this.dragger.addEventListener('mouseup' , this.mouseLostEvent.bind(this));
          this.dragger.addEventListener('mouseleave' , this.mouseLostEvent.bind(this));
          this.mover.addEventListener('touchstart' , this.touchStartEvent.bind(this) , {passive :  false});
          this.dragger.addEventListener('touchend' , this.touchLostEvent.bind(this));
          this.dragger.addEventListener('touchcancel' , this.touchLostEvent.bind(this));
     }
     
     destroy(){
          this.dragger.removeEventListener('mousedown' , this.mouseHoldEvent.bind(this));
          this.dragger.removeEventListener('mouseup' , this.mouseLostEvent.bind(this));
          this.dragger.removeEventListener('mouseleave' , this.mouseLostEvent.bind(this));
          this.dragger.removeEventListener('touchmove' , this.touchMoveEvent.bind(this));
          this.dragger.removeEventListener('touchend' , this.touchLostEvent.bind(this));
          this.dragger.removeEventListener('touchcancel' , this.touchLostEvent.bind(this));
     }

}