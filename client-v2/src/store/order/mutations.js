import moment from 'moment';

export function addProductToBasket(state, cartItem) {
  const index = state.orderProducts.findIndex((item) => item.id === cartItem.id);

  if (index !== -1) {
    const searchElem = { ...state.orderProducts[index] };
    searchElem.number += 1;
    const oldStateOrderProduct = [...state.orderProducts];
    oldStateOrderProduct.splice(index, 1, searchElem);

    state.orderProducts = [...oldStateOrderProduct];
  } else {
    state.orderProducts.push(cartItem);
  }
}

export function removeOneProduct(state, cartItem) {
  const index = state.orderProducts.findIndex((item) => item.id === cartItem.id);

  if (state.orderProducts[index].number > 1) {
    const newProductState = [...state.orderProducts];
    newProductState[index].number -= 1;
    state.orderProducts = [...newProductState];
  } else {
    state.orderProducts = state.orderProducts.filter((item) => item.id !== cartItem.id);
  }
}
export function removeProductToBasket(state, cartItem) {
  state.orderProducts = state.orderProducts.filter((item) => item.id !== cartItem.id);
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
  const filterOrder = this.state.orderProducts.filter((item) => item.isGift === true);
  this.removeProductToBasket(filterOrder[0]);
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
  state.promoCode.value = promoCode;
}

export function setPromoCodeProduct(state, product) {
  state.promoCode.product = product;
}

export function getPromoCodes(state, promoCodes) {
  state.promoCodes = [...promoCodes];
}

export function setFinalPrice(state, finalPrice) {
  state.orderProducts.finalPrice = finalPrice;
}

export function setOrderId(state, OrderId) {
  state.currentOrder.id = OrderId;
}

export function addProducts(state) {
  state.currentOrder.products = [];
  for (let i = 0; i < state.orderProducts.length; i += 1) {
    let modifiers;
    if (state.orderProducts[i].userModifiers === null) modifiers = {};
    else modifiers = state.orderProducts[i].userModifiers;

    let discount;

    if (state.orderProducts[i].isGift === true) {
      const basePrice = state.orderProducts[i].product.base_price;
      const discountValue = (basePrice - state.orderProducts[i].finalPrice).toFixed(1);
      discount = {
        string: `${discountValue}`,
        rub: discountValue,
        quantity: discountValue,
        type: 'rub',
      };
    } else {
      discount = {
        string: null,
        rub: 0,
        quantity: null,
        type: 'rub',
      };
    }

    state.currentOrder.products.push({
      product: state.orderProducts[i].product,
      number: state.orderProducts[i].number,
      comment: state.orderProducts[i].comment,
      hash: state.orderProducts[i].id,
      modifiers,
      discount,
    });
  }
}
