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

export function hasAddress(state) {
  if (state.currentOrder.clientInfo.address.dadata !== null) return true;
  return false;
}

export function hasHouse(state) {
  if (state.currentOrder.clientInfo.address.dadata === null) return true;
  if (state.currentOrder.clientInfo.address.dadata.data.house === null) return false;
  return true;
}

export function isAddressInZone() {
  return true;
}

export function isValidPhone(state) {
  if (state.currentOrder.clientInfo.phoneString === null) return false;
  if (state.currentOrder.clientInfo.phoneString.length < 10) return false;
  return true;
}
