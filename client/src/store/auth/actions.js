export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = token => ({
  type: LOGIN,
  payload: token
})

export const logout = () => ({
  type: LOGOUT
})