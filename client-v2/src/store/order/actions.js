const axios = require('axios').default;
// eslint-disable-next-line
export async function getOrderMenu(context) {
  await axios.get(`${process.env.API_LINK}/categories?is_active=true&_sort=Sort_index:ASC`).then((res) => {
    context.commit('setCategoriesMenu', res.data);
  });

  return true;
}

export async function createOrder(context, order) {
  // eslint-disable-next-line
  const summ = context.state.orderProducts.reduce((accumulator, item) => accumulator + parseInt(item.price, 10) * item.count, 0);

  const address = `${order.address} ${order.apartment}`;
  const productstring = JSON.stringify(context.state.orderProducts);

  const comment = `комментарий: ${order.comment} продукты: ${productstring}`;
  const orderForStrappi = {
    phone: order.phone,
    comment,
    delivery_time: null,
    client_name: order.name,
    address,
    can_early: order.early,
    sum_order: summ,
    products: [],
  };

  return axios.post(`${process.env.API_LINK}/orders`, orderForStrappi).then(() => true);
}
