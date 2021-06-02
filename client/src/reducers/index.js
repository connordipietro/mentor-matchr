import { combineReducers } from 'redux';
import GetTestDataReducer from './get-test-data-reducer';

const rootReducer = combineReducers({
  testData: GetTestDataReducer,
});

export default rootReducer;
