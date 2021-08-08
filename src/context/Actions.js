export const loginStart = (userCred) => ({
  type: 'LOGIN_START',
})

export const loginSuccess = (user) => ({
  type: 'LOGIN_SUCCESS',
  payload: user,
})

export const loginFail = () => ({
  type: 'LOGIN_FAIL',
})

export const logout = () => ({
  type: 'LOGOUT',
})

export const updateStart = (userCred) => ({
  type: 'UPDATE_START',
})

export const updateSuccess = (user) => ({
  type: 'UPDATE_SUCCESS',
  payload: user,
})

export const updateFail = () => ({
  type: 'UPDATE_FAIL',
})
