import { PropsWithChildren } from "react"
import { LOADING_STATE } from "../../../utils/constants/storeConstants"

export type FallbackPageProps = {
     fallbackText : string,
     className ?: string,
     icon : JSX.Element,
     size ?: 'small' | 'large'
}

export type EmptyFallbackPageProps = PropsWithChildren<FallbackPageProps> & {
     dataState : LOADING_STATE
}

export type FallbackErrorProps = FallbackPageProps & {
     retryFunction ?: ()=>void
}

export type FallbackInlineProps = {
     fallbackText : string,
     className ?: string,
     size ?: 'small' | 'large'
}