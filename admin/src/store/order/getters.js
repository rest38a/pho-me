/*
export function someGetter (state) {
}
*/
import { date } from 'quasar';

export function lastClientAddress(state) {
  if (state.currentOrder.clientInfo.client.addresses !== undefined) {
    const len = state.currentOrder.clientInfo.client.addresses.length;
    if (len > 0) {
      return state.currentOrder.clientInfo.client.addresses[len - 1];
    }
  }
  return {};
}

/* eslint-disable */
export function totalSum(state) {

  const summ = state.currentOrder.products.reduce((accumulator, item) => {
    let mainMod = 0;
    let sizeMod = 0;
    if (item.modifiers.main.addPrice) {
      mainMod = JSON.parse(item.modifiers.main.addPrice);
    }
    if (item.modifiers.size.addPrice) {
      sizeMod = JSON.parse(item.modifiers.size.addPrice);
    }
    console.log(mainMod, sizeMod, item.product.basePrice);
    return accumulator + (parseInt(item.product.basePrice + mainMod + sizeMod) * item.number)
  },0);

  return summ;
}

export function totalDiscount(state) {
  const summ = state.currentOrder.products.reduce((accumulator, item) => {
    if (item.discount.quantity === null || item.discount.quantity === 0) return accumulator

    let itemDiscout;
    if (item.discount.type === 'rub'){
      itemDiscout = item.discount.quantity * item.number
    } else {
      const discountRubOneItem = Math.floor(parseInt(item.product.basePrice) / 100 * item.discount.quantity)
      itemDiscout = discountRubOneItem * item.number;
    }

    return accumulator + itemDiscout

  },0);

  return summ;
}

export function totalToPay(state) {
  const summ = state.currentOrder.payments.reduce((accumulator, item) => {
    return accumulator + +item.sum
  },0);

  return summ;
}

export function toPayStill(state, getters) {
  return getters.totalSum - getters.totalDiscount - getters.totalToPay;
}


export function clientFormHasError(state) {
  if (state.currentOrder.clientInfo.client.id === null) {
    return true;
  } else {
    return false;
  }
}

export function productFormHasError(state) {
  if (state.isNewProductClean) return false;
  else return true;
}

export function productFormIsEmpty(state) {
 if (state.currentOrder.products.length > 0) false;
  else return true;
}

export function paymentFormIsDirty(state, getters) {
  if (state.newPayment.type === null && state.newPayment.type === null) return false;
  else return true;
}

export function isDatePast(state) {
  let dateNow = new Date();
  let deliveryDate = new Date(`${state.currentOrder.deliveryInfo.date} ${state.currentOrder.deliveryInfo.time}:00`);

  let unit = 'minutes'

  let diff = date.getDateDiff(deliveryDate, dateNow, unit);

  if (diff < 0) {
    return true
  }
  return false;

}

export function isDateFar(state) {
  let dateNow = new Date();
  let deliveryDate = new Date(`${state.currentOrder.deliveryInfo.date} ${state.currentOrder.deliveryInfo.time}:00`);

  let unit = 'minutes'

  let diff = date.getDateDiff(deliveryDate, dateNow, unit);

  if (diff > 1440) {
    return true
  }
  return false;

}
