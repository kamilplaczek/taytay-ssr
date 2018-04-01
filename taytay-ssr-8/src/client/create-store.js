import {applyMiddleware, combineReducers, createStore} from 'redux';
import {taytayReducer} from './app/redux/taytay/taytay.reducer';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './app/redux/auth/auth.reducer';

export const createAppStore = initialState =>
  createStore(
    combineReducers({taytay: taytayReducer, auth: authReducer}),
    initialState,
    applyMiddleware(thunkMiddleware)
  );
