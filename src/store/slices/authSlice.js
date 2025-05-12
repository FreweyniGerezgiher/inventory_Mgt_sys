import { createSlice } from '@reduxjs/toolkit'
import { userService, tokenService } from '../../services/storageService'

function getInitialData() {
  let authInitial = {}
  const user = userService.getUser()
  const token = tokenService.getToken()
  if (user) authInitial.user = user

  authInitial.signedIn = !!token

  return authInitial
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialData(),
  reducers: {
    setStatus: (auth, { payload }) => {
      auth.signedIn = payload.signedIn
    },
    setUser: (auth, { payload }) => {
      auth.user = payload.user
      userService.saveUser(payload.user)
    },
  },
})

export const { setUser, setStatus } = authSlice.actions

export default authSlice.reducer
