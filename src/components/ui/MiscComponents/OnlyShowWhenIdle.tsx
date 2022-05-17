import { PropsWithChildren } from 'react';
import { LOADING_STATE } from '../../../utils/constants/storeConstants';

function OnlyShowWhenIdle({
     loadingState , children
} : PropsWithChildren<{loadingState : LOADING_STATE}>) {

     return loadingState === LOADING_STATE.IDLE ? <>{children}</> : null

}

export default OnlyShowWhenIdle;

