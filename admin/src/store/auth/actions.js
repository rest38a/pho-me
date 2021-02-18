/*
export function someAction (context) {
}
*/
const axios = require('axios').default;

export async function login(context, authData) {
  let answer;
  await axios.post(`${process.env.ADMIN_API_LINK}/api/staff/auth`, {
    phone: authData.phone,
    password: authData.password,
  })
    .then(({ data }) => {
      context.commit('authUser', {
        token: data.token,
        userId: null,
        userName: null,
      });
      localStorage.setItem('token', data.token);
    })
    .then(() => {
      this.$router.push('/orders');
    })
    .catch((error) => {
      answer = error;
    });
  return answer;
}

export function logout(context) {
  context.commit('clearAuth');
  this.$router.push('/login');
}
