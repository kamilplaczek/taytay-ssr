import {FETCH_PICS_SUCCESS} from './taytay.action-types';
import fetch from 'isomorphic-fetch';

export const fetchPics = () => async dispatch => {
  const res = await fetch('https://api.imgur.com/3/gallery/r/taylorswift', {
    headers: {Authorization: 'Client-ID 0447601918a7bb5'},
  });
  const imgurResp = await res.json();
  if (imgurResp.data) {
    const pics = imgurResp.data
      .filter(pic => pic.link.indexOf('.jpg') > -1)
      .slice(0, 15)
      .map(pic => ({id: pic.id, url: pic.link.replace('.jpg', 's.jpg')}));
    return dispatch(setPics(pics));
  }
  return dispatch(setPics([]));
};

export const setPics = pics => ({
  type: FETCH_PICS_SUCCESS,
  payload: {
    pics,
  },
});
