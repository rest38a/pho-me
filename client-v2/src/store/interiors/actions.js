const axios = require('axios').default;

export async function getInteriors(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/photo`).then(({ data }) => {
    context.commit('setInterior', data.photos);
  });

  return true;
}
