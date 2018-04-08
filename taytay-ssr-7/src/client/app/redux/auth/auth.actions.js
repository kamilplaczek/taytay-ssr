import fetch from 'isomorphic-fetch';
import {LOGIN_SUCCESS} from './auth.action-types';

const API_URL = 'http://localhost:3007';

export const login = () => async dispatch => {
  const res = await fetch(API_URL + '/api/login', {
    method: 'POST',
  });
  const auth = await res.json();
  localStorage.setItem('taytayAuth', auth.token);
  return dispatch(setToken(auth.token));
};

export const setToken = token => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});
