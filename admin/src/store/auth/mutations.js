/*
export function someMutation (state) {
}
*/

export function authUser(state, userData) {
  state.userToken = userData.token;
  // state.userId = userData.userId;
  // state.userName = userData.userName;
}

export function clearAuth(state) {
  state.userToken = null;
}
