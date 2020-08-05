import { SHOW_MODAL } from './actions'

const defaultState = {
  isShow: false,
  activationFunction: null,
  message: ''
}

export const modalReducer = (state = defaultState, action) => {
  switch(action.type) {
    case SHOW_MODAL: {
      return {
        ...state,
        isShow: action.payload.isShow,
        activationFunction: action.payload.activationFunction,
        message: action.payload.message
      }
    }
    default: {
      return state
    }
  }
}