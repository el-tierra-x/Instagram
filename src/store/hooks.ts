import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { StoreActionBundle, StoreStateType } from '../utils/types/storeTypes'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<ThunkDispatch<StoreStateType, unknown , StoreActionBundle>>();
export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector