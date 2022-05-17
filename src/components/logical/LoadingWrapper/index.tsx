import { LOADING_STATE } from '../../../utils/constants/storeConstants';
import { LoadingWrapperProps } from './types';

function DataStateWrapper({
     children,
     loadingComponent: loadingState,
     newPageLoadingComponent: newPageLoadingState,
     errorComponent: errorState,
     currentState,
} : LoadingWrapperProps) : JSX.Element {

     if(currentState.state === LOADING_STATE.LOADING){
          return <>{loadingState}</>;
     }
     return <>
          {currentState.state !== LOADING_STATE.NOT_STARTED_YET ? children ?? null : null}
          {currentState.state === LOADING_STATE.ERROR ? errorState : null}
          {currentState.state === LOADING_STATE.NEW_PAGE_LOADING ? newPageLoadingState : null}
     </>
}

export default DataStateWrapper;
