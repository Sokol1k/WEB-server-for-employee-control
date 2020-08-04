import { SHOW_ALERT } from './actions'

const defaultState = {
  type: '',
  message: '',
  isShow: false,
}

export const alertReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SHOW_ALERT: {
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
        isShow: action.payload.isShow,
      }
    }
    default: {
      return state
    }
  }
}