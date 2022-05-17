export function giveClassNameBasedOnCondition(condition : boolean , ifTrue : string , ifFalse ?: string){
     if(condition){
          return ifTrue;
     }
     else{
          if(ifFalse) return ifFalse;
     }
     return '';
}

export function combineClassNames(...classNames : string[]){
     return classNames.join(' ');
}

export function scrollToTop(){
     const appWrapper = document.querySelector('div.App');
     if(appWrapper) appWrapper.scrollTop = 0;
}