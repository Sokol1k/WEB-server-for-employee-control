import { LOGIN, LOGOUT } from './actions'

const storegeName = '_token'

const defaultState = {
  token: localStorage.getItem(storegeName)
}

export const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN: {
      localStorage.setItem(storegeName, action.payload)

      return {
        ...state,
        token: action.payload
      }
    }
    case LOGOUT: {
      localStorage.removeItem(storegeName)

      return {
        ...state,
        token: undefined
      }
    }
    default: {
      return state
    }
  }
}