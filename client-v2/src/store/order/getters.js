export function totalSum(state) {
  // eslint-disable-next-line
  const summ = state.orderProducts.reduce((accumulator, item) => {
    return accumulator + parseInt(item.finalPrice, 10) * item.number;
  }, 0);

  return summ;
}

export function orderProductsNum(state) {
  let numberProduct = 0;

  for (let i = 0; i < state.orderProducts.length; i += 1) {
    numberProduct += state.orderProducts[i].number;
  }
  return numberProduct;
}
