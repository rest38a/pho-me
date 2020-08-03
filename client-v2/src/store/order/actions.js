const axios = require('axios').default;

export async function getOrderMenu(context) {
  await axios.get(`${process.env.API_LINK}/categories?is_active=true`).then((res) => {
    context.commit('setCategoriesMenu', res.data);
  });
}
