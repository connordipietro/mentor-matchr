import { GET_AUTH_STATUS } from '../utilities/api';

const DEFAULT_STATE = {
  isAuth: false,
};

const GetAuthStatusReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_AUTH_STATUS:
      console.log('test');
      return {
        isAuth: action.payload,
      };
    default:
      return state;
  }
};

export default GetAuthStatusReducer;
