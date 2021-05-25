const axios = require('axios').default;
// eslint-disable-next-line
export async function getOrderMenu(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/menutreeSite`).then(({ data }) => {
    context.commit('setCategoriesMenu', data.categories);
  });

  return true;
}

export async function sendOrder(context) {
  const order = context.state.currentOrder;
  await axios.post(`${process.env.CLIENT_API_LINK}/api/order-site`,
    { order })
    .then(({ data }) => {
      context.commit('setOrderId', data.order.id);
      context.commit('setPaymentLink', data.payments[0].payment_link);
    });
}

export async function getPromocode(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/promoCodes`).then(({ data }) => {
    context.commit('getPromoCodes', data.promoCodes);
  });

  return true;
}

export async function getAddressHints(context, string) {
  context.commit('setAddressString', string);
  return axios.get(`${process.env.CLIENT_API_LINK}/api/address/hints?address=${string}`)
    .then(({ data }) => data.hints).catch((error) => {
      console.warn(error);
    });
}

export async function getCoordsByString(context, string) {
  return axios.get(`${process.env.CLIENT_API_LINK}/api/address/coord?address=${string}`)
    .then(({ data }) => data.coords)
    .catch((error) => {
      console.warn(error);
      return { error };
    });
}
