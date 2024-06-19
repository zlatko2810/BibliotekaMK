import { SET_ACCESS_TOKEN } from './actionTypes';

const initialState = {
  accessToken: null,
};

const accessTokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export default accessTokenReducer;