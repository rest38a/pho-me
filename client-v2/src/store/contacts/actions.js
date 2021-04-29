const axios = require('axios').default;

export async function getContacts(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/main-state`).then(({ data }) => {
    context.commit('setContacts', data.mainState);
  });

  return true;
}
