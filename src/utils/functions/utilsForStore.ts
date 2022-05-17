import { LOADING_STATE } from "../constants/storeConstants";
import { LoadingConfigType } from "../types/storeTypes";


export function createLoadingState(state : LOADING_STATE , text : string) : LoadingConfigType{
     switch(state){
          case LOADING_STATE.IDLE : return {
               state
          }
          case LOADING_STATE.LOADING : return {
               state,
               loadingText : text
          }
          case LOADING_STATE.NEW_PAGE_LOADING : return {
               state,
               loadingText : text
          }
          case LOADING_STATE.ERROR : return {
               state , 
               errorText : text
          }
          case LOADING_STATE.END_OF_LIST : return {
               state
          }
          case LOADING_STATE.EMPTY : return {
               state
          }
          case LOADING_STATE.NOT_STARTED_YET : return {
               state
          }
          default : return createLoadingState(LOADING_STATE.IDLE , '');
     }
}