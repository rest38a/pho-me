const axios = require('axios').default;

export async function getPromotions(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/promotions`).then(({ data }) => {
    context.commit('setPromotions', data.promotions);
  });

  return true;
}
