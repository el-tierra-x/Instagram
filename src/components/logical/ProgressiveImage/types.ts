import React from "react"

export type ProgressiveImageProps = {
     imageArray : ImageSrcType[],
     alt : string,
     className ?: string,
     title ?: string,
     ErrorComponent ?: JSX.Element,
     LoadingComponent ?: JSX.Element,
     onClick ?: React.MouseEventHandler,
     allowScaling ?: boolean,
     compareOnStateReload ?: boolean
}

export type ImageSrcType = {
     url : string,
     blur : boolean
}



