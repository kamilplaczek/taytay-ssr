import {LOGIN_SUCCESS} from './auth.action-types';

const initialState = {
  token: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {...state, token: action.payload.token};
    }
    default:
      return state;
  }
};
