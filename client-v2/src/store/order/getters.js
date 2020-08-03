export function totalSum(state) {
  // eslint-disable-next-line
  const summ = state.orderProducts.reduce((accumulator, item) => {
    return accumulator + parseInt(item.price, 10) * item.count;
  }, 0);

  return summ;
}

export function orderProductsNum(state) {
  let numberProduct = 0;

  for (let i = 0; i < state.orderProducts.length; i += 1) {
    numberProduct += state.orderProducts[i].count;
  }
  return numberProduct;
}
