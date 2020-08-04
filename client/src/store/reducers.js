import { combineReducers } from 'redux'
import { alertReducer } from './alert/reducers'
import { loaderReducer } from './loader/reducers'

export default combineReducers({
  alert: alertReducer,
  loader: loaderReducer
})