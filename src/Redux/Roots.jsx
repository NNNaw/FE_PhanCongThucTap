import { combineReducers } from 'redux';
import { ManageUserReducer } from './Reducers/ManageUsersReducer'
import { ManageTopicReducer } from './Reducers/ManageTopicReducer'

export const rootReducer = combineReducers({
  //Chứa reducer theo từng nghiệp vụ
  ManageUserReducer,
  ManageTopicReducer
});

