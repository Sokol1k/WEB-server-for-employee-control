import { combineReducers } from 'redux'
import { alertReducer } from './alert/reducers'
import { loaderReducer } from './loader/reducers'
import { authReducer } from './auth/reducers'
import { modalReducer } from './modal/reducers'

export default combineReducers({
  alert: alertReducer,
  loader: loaderReducer,
  auth: authReducer,
  modal: modalReducer
})