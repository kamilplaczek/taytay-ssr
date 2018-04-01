import {applyMiddleware, combineReducers, createStore} from 'redux';
import {taytayReducer} from './app/redux/taytay/taytay.reducer';
import thunkMiddleware from 'redux-thunk';

export const createAppStore = initialState =>
  createStore(combineReducers({taytay: taytayReducer}), initialState, applyMiddleware(thunkMiddleware));
