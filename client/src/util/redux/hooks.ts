import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from './store.ts';

/**
 * A hook that returns the redux store's dispatch function. This is used to dispatch actions to the redux store. This is a typed version of the `useDispatch` hook from react-redux.
 */
const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A selector that returns the redux store's selector function. This is used to select from the redux store. This is a typed version of the `useSelector` hook from react-redux.
 */
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch, useAppSelector };
