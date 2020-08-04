import { LOADER } from './actions'

const defaultState = {
  isShow: false
}

export const loaderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOADER: {
      return {
        ...state,
        isShow: action.payload
      }
    }
    default: {
      return state
    }
  }
}