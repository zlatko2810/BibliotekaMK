import { SET_ACCESS_TOKEN } from './actionTypes';

export const setAccessToken = (token) => ({
  type: SET_ACCESS_TOKEN,
  payload: token,
});