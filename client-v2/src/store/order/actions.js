import keysToCamel from '../../helpers/toCamelCase';

const axios = require('axios').default;
// eslint-disable-next-line
export async function getOrderMenu(context) {
  await axios.get(`${process.env.CLIENT_API_LINK}/api/menutreeSite`).then(({ data }) => {
    context.commit('setCategoriesMenu', data.categories);
  });

  return true;
}

export async function createOrder(context, currentOrder) {
  // eslint-disable-next-line
  const summ = context.state.orderProducts.reduce((accumulator, item) => accumulator + parseInt(item.base_price, 10) * item.number, 0);

  const address = `${currentOrder.address} ${currentOrder.apartment}`;

  const comment = JSON.stringify({
    comment: currentOrder.comment,
    deliveryTime: currentOrder.deliveryInfo.time,
    product: context.state.orderProducts,
    numPerson: context.state.currentOrder.forks,
  });

  const orderForStrappi = {
    phone: currentOrder.clientInfo.phone,
    comment,
    delivery_time: null,
    client_name: currentOrder.clientInfo.client.name,
    address,
    can_early: currentOrder.early,
    sum_order: summ,
    products: [],
  };

  return axios.post(`${process.env.CLIENT_API_LINK}/orders`, orderForStrappi).then(() => true);
}

export async function sendOrder(context) {
  const order = context.state.currentOrder;
  await axios.post('/api/order-site',
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

// export async function getPromocode(commit) {
//   await axios.get(`${process.env.CLIENT_API_LINK}/api/promoCodes`).then((promoCodes) => {
//     commit('getPromoCodes', promoCodes);
//     return promoCodes;
//   })
//     .catch((error) => {
//       console.log(error);
//       return error;
//     });
// }

export async function tryPromoCode(context, promoCodeParam) {
  const promoCodeValue = context.state.promoCode.value;
  let answer = {};
  if (promoCodeValue !== null && promoCodeValue !== '') {
    await axios.post('/api/promocode/use',
      { promoCodeParam })
      .then(({ data }) => {
        if (data.product !== undefined) {
          const product = keysToCamel(data.product);
          context.commit('setPromoCodeUsing', product);
          context.commit('deleteAllGiftProduct');
          const giftProduct = {
            product,
            isGift: true,
            modifiers: {
              main: {},
              size: {},
              add: [],
            },
            finalPrice: 0,
          };
          context.commit('addProduct', giftProduct);
          answer = data;
        }
        answer = data;
      });
  } else {
    answer.promoCodeError = {
      massage: 'Вы не заполнили поле промокода',
    };
  }

  return answer;
}
