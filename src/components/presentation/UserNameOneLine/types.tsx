export type UserNameOneLineProps = {
     className ?: string,
     size : 'small' | 'medium' | 'large',
     username : string,
     avatar : JSX.Element,
     onClick ?: ()=>void,
     maxCharacters ?: number
}