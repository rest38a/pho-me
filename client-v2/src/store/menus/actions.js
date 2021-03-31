const axios = require('axios').default;

export async function getMenus(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/rest-menu`).then(({ data }) => {
    context.commit('setMenu', data.restMenus);
  });

  return true;
}
