import {FETCH_PICS_SUCCESS} from './taytay.action-types';

const initialState = {
  pics: null,
};

export const taytayReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PICS_SUCCESS: {
      return {...state, pics: action.payload.pics};
    }
    default:
      return state;
  }
};
