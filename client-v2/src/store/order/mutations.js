import moment from 'moment';

export function addProductToBasket(state, cartItem) {
  const index = state.currentOrder.products.findIndex((item) => item.id === cartItem.id);

  if (index !== -1) {
    const searchElem = { ...state.currentOrder.products[index] };
    searchElem.number += 1;
    const oldStateOrderProduct = [...state.currentOrder.products];
    oldStateOrderProduct.splice(index, 1, searchElem);

    state.currentOrder.products = [...oldStateOrderProduct];
  } else {
    state.currentOrder.products.push(cartItem);
  }
}

export function removeOneProduct(state, cartItem) {
  const index = state.currentOrder.products.findIndex((item) => item.id === cartItem.id);

  if (state.currentOrder.products[index].number > 1) {
    const newProductState = [...state.currentOrder.products];
    newProductState[index].number -= 1;
    state.currentOrder.products = [...newProductState];
  } else {
    // eslint-disable-next-line max-len
    state.currentOrder.products = state.currentOrder.products.filter((item) => item.id !== cartItem.id);
  }
}
export function removeProductToBasket(state, cartItem) {
  // eslint-disable-next-line max-len
  state.currentOrder.products = state.currentOrder.products.filter((item) => item.id !== cartItem.id);
}

export function addPromocode(result, product) {
  const cartItemPromo = {
    id: `${result.id} ${product.id}`,
    userModifiers: 'Блюдо по промокоду',
    finalPrice: '',
    comment: 'ПОДАРОК',
    product: this.promoCode.product,
    number: 1,
    isGift: true,
  };
  cartItemPromo.finalPrice = product.base_price - (product.base_price / 100) * result.discount;
  this.addProductToBasket(cartItemPromo);
}

export function removePromoFromBasket() {
  this.promoInputDisabled = false;
  this.hidePromoButton = true;
  const filterOrder = this.state.currentOrder.products.filter((item) => item.isGift === true);
  this.removeProductToBasket(filterOrder[0]);
}

export function catchDefaultState(state) {
  state.defaultState = state.currentOrder;
}

export function setDefaultState(state) {
  state.currentOrder = state.defaultState;
  state.currentOrder.products = [];
  state.orderProducts = [];
}

export function setPhone(state, phone) {
  state.currentOrder.clientInfo.phone = phone;
  state.currentOrder.clientInfo.phoneString = phone.replace(/[^+\d]/g, '');
}

export function switchPaymentType(state, PaymentType) {
  state.currentOrder.payments[0].type = PaymentType;
}

export function setPaymentLink(state, paymentLink) {
  state.currentOrder.payments[0].paymentLink = paymentLink;
}

export function setPaymentSumm(state, sum) {
  state.currentOrder.payments[0].sum = sum;
}

export function setAddressString(state, addressString) {
  state.currentOrder.clientInfo.addressString = addressString;
  state.currentOrder.clientInfo.address.dadata = null;
  state.currentOrder.clientInfo.address.type = '';
}
export function setAddressDadata(state, dadataAddress) {
  state.currentOrder.clientInfo.addressString = dadataAddress.value;
  state.currentOrder.clientInfo.address.dadata = dadataAddress;
  state.currentOrder.clientInfo.address.type = 'dadata';
}

export function setApartment(state, apartment) {
  state.currentOrder.clientInfo.address.apartment = apartment;
}

export function setFloor(state, floor) {
  state.currentOrder.clientInfo.address.floor = floor;
}

export function setEntrance(state, entrance) {
  state.currentOrder.clientInfo.address.entrance = entrance;
}

export function switchDeliveryType(state, DeliveryType) {
  state.currentOrder.deliveryInfo.type = DeliveryType;
}

export function setDate(state) {
  state.currentOrder.deliveryInfo.date = moment().format('DD.MM.YYYY');
}

export function setTime(state, time) {
  state.currentOrder.deliveryInfo.time = time;
}

export function setComment(state, comment) {
  state.currentOrder.comment = comment;
}
export function setEarly(state, early) {
  state.currentOrder.early = early;
}

export function setCostume(state, isCostume) {
  state.order.isCostume = isCostume;
}

export function setName(state, name) {
  state.currentOrder.clientInfo.client.name = name;
}
export function setOrderMenu(state, orderMenu) {
  state.orderMenu = [...orderMenu];
}

export function setCategoriesMenu(state, categoriesMenu) {
  state.categoriesMenu = [...categoriesMenu];
}

export function setForks(state, forks) {
  state.currentOrder.forks = forks;
}

export function setPromoCode(state, promoCode) {
  state.promoCode.value = promoCode.toLowerCase();
}

export function setPromoCodeProduct(state, product) {
  state.promoCode.product = product;
}

export function getPromoCodes(state, promoCodes) {
  state.promoCodes = [...promoCodes];
}

export function setFinalPrice(state, finalPrice) {
  state.currentOrder.products.finalPrice = finalPrice;
}

export function setOrderId(state, OrderId) {
  state.currentOrder.id = OrderId;
}

export function addProducts(state) {
  state.orderProducts = [];
  state.orderProducts = [...state.currentOrder.products];
  // for (let i = 0; i < state.currentOrder.products.length; i += 1) {
  //   let modifiers;
  //   if (state.currentOrder.products[i].userModifiers === null) modifiers = {};
  //   else modifiers = state.currentOrder.products[i].userModifiers;
  //
  //   let discount;
  //
  //   if (state.currentOrder.products[i].isGift === true) {
  //     const basePrice = state.currentOrder.products[i].product.base_price;
  //     const discountValue = (basePrice - state.currentOrder.products[i].finalPrice).toFixed(1);
  //     discount = {
  //       string: `${discountValue}`,
  //       rub: discountValue,
  //       quantity: discountValue,
  //       type: 'rub',
  //     };
  //   } else {
  //     discount = {
  //       string: null,
  //       rub: 0,
  //       quantity: null,
  //       type: 'rub',
  //     };
  //   }
  //
  //   state.currentOrder.products.push({
  //     product: state.currentOrder.products[i].product,
  //     number: state.currentOrder.products[i].number,
  //     comment: state.currentOrder.products[i].comment,
  //     hash: state.currentOrder.products[i].id,
  //     modifiers,
  //     discount,
  //   });
  // }
}
