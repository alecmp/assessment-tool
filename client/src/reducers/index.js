import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import assessment from './assessment';

export default combineReducers({
  alert,
  auth,
  assessment
});
