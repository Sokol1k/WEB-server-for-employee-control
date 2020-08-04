import { combineReducers } from 'redux'
import { alertReducer } from './alert/reducers'
import { loaderReducer } from './loader/reducers'
import { authReducer } from './auth/reducers'

export default combineReducers({
  alert: alertReducer,
  loader: loaderReducer,
  auth: authReducer
})