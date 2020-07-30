import autodux from 'autodux'

export const {
  reducer,
  initial,
  actions: {
    setAuthToken,
  },
  selectors: {
    getAuthToken,
  }
} = autodux({
  slice: 'auth',
  initial: {
    authToken: null,
    pseudo: null,
    logged: false,
  }
})