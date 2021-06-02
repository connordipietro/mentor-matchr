import { GET_TEST_DATA } from '../actions';

const DEFAULT_STATE = {
  data: [],
};

const GetTestDataReducer = function (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case GET_TEST_DATA:
      return {
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export default GetTestDataReducer;
