import { createStore } from 'redux';

import reducer from './slice';

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
