import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';
import {LOGIN_SUCCESS} from './auth.action-types';

const API_URL = 'http://localhost:3000';

export const login = () => async dispatch => {
  const res = await fetch(API_URL + '/api/login', {
    method: 'POST',
  });
  const auth = await res.json();
  Cookies.set('taytayAuth', auth.token, {expires: 7, path: '/'});
  return dispatch(setToken(auth.token));
};

export const setToken = token => ({
  type: LOGIN_SUCCESS,
  payload: {
    token,
  },
});
