import { combineReducers } from 'redux';
import GetAuthStatusReducer from './get-auth-status-reducer';

const rootReducer = combineReducers({
  authStatus: GetAuthStatusReducer,
});

export default rootReducer;
