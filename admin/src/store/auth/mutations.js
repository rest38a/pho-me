/*
export function someMutation (state) {
}
*/

export function authUser(state, userData) {
  state.userToken = userData.token;
  let roleId = 2;

  if (userData.user && userData.user.roles) {
    for (let i = 0; i < userData.user.roles.length; i += 1) {
      const roleItemId = userData.user.roles[i].id;
      if (roleId > roleItemId) roleId = roleItemId;
    }
  }

  state.roleId = roleId;
  // state.userId = userData.userId;
  state.userName = userData.user.name;
  state.userId = userData.user.id;
  // state.userId = userData.userId;
  // state.userName = userData.userName;
}

export function clearAuth(state) {
  state.userToken = null;
}
