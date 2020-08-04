import { combineReducers } from 'redux'
import { alertReducer } from './alert/reducers'

export default combineReducers({
  alert: alertReducer
})