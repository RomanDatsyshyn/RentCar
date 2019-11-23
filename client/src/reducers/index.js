import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import adminReducer from './adminReducer';
import carReducer from './carReducer';
import carIDReducer from './carIDReducer';
import searchReducer from './searchReducer';
import UserOrdersReducer from './UserOrdersReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  adminAuth: adminReducer,
  carsState: carReducer,
  carState: carIDReducer,
  carsSearchState: searchReducer,
  UserOrdersReducer: UserOrdersReducer
});
