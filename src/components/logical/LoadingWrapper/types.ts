import { PropsWithChildren } from "react";
import { LoadingConfigType } from "../../../utils/types/storeTypes";

export type LoadingWrapperProps = PropsWithChildren<{
     loadingComponent ?: JSX.Element,
     errorComponent ?: JSX.Element,
     newPageLoadingComponent ?: JSX.Element
     currentState : LoadingConfigType,
     isOnePageLoader ?: boolean
}> 