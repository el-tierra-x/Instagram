import { IconAnimations } from "../../../utils/constants/iconAnimation";

export type StatsIconProps = {
     icon : JSX.Element,
     statValue ?: number | string,
     animation ?: IconAnimations,
     isEnabled : boolean,
     isActive : boolean,
     className ?: string,
     onClick ?: ()=>void
}