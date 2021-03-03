/*
export function someMutation (state) {
}
*/
import { date } from 'quasar';

export function fillOrder(state, order) {
  state.currentOrder.id = order.id;
  state.currentOrder.sourceId = order.sourceId;

  state.currentOrder.error = order.error;
  state.currentOrder.fullQuery = order.fullQuery;

  state.currentOrder.isDelete = order.isDelete;
  state.currentOrder.isApprove = order.isApprove;
  state.currentOrder.clientInfo.client = order.client;
  state.currentOrder.clientInfo.phone = order.phone;
  state.currentOrder.clientInfo.phoneString = order.phone.phone;
  state.currentOrder.clientInfo.address = { ...order.address };
  state.currentOrder.deliveryInfo.type = order.deliveryType;
  const dateString = date.formatDate(order.deliveryTime, 'YYYY-MM-DD');
  const timeString = date.formatDate(order.deliveryTime, 'HH:mm');
  state.currentOrder.deliveryInfo.date = dateString;
  state.currentOrder.deliveryInfo.time = timeString;

  state.currentOrder.products = [];
  for (let i = 0; i < order.products.length; i += 1) {
    let modifiers;
    if (order.products[i].modifiers === null) modifiers = {};
    else modifiers = order.products[i].modifiers;

    let discount;

    if (order.products[i].discountJson === null) {
      discount = {
        string: null,
        rub: 0,
        quantity: null,
        type: 'rub',
      };
    } else {
      discount = JSON.parse(order.products[i].discountJson);
    }

    state.currentOrder.products.push({
      product: order.products[i].product,
      number: order.products[i].number,
      comment: order.products[i].comment,
      hash: order.products[i].id,
      modifiers,
      discount,
    });
  }
  state.currentOrder.payments = [];
  for (let i = 0; i < order.payments.length; i += 1) {
    let isPaid = false;
    if (order.payments[i].isPaid === 1) isPaid = true;
    state.currentOrder.payments.push({
      type: order.payments[i].type,
      sum: order.payments[i].sum,
      isPay: isPaid,
      hash: order.payments[i].id,
    });
  }
}

export function setOrderId(state, orderId) {
  state.currentOrder.id = orderId;
}

export function addProduct(state, product) {
  state.currentOrder.products.push(product);
}
/* eslint-disable */
export function removeProduct(state, product) {
  // console.log(product)
  state.currentOrder.products = state.currentOrder.products.filter((item) => {
    return item.hash !== product.hash;
  });
}


export function setPhoneString(state, phoneString) {
  state.currentOrder.clientInfo.phoneString = phoneString;
}

export function setNumber(state, index, number) {
  state.currentOrder.products[index].number = number;
}

export function setPhone(state, phone) {
  state.currentOrder.clientInfo.phone = phone;
}

export function setClient(state, client) {
  state.currentOrder.clientInfo.client = client;
}
export function setClientName(state, name) {
  state.currentOrder.clientInfo.client.name = name;
}

export function setAddress(state, address) {
  state.currentOrder.clientInfo.address = address;
}

export function addAddress(state, address) {
  state.currentOrder.clientInfo.client.addresses.push(address);
}

export function setDate(state, date) {
  state.currentOrder.deliveryInfo.date = date;
  state.currentOrder.deliveryInfo.isCheck = false;
}

export function setTime(state, time) {
  state.currentOrder.deliveryInfo.time = time;
  state.currentOrder.deliveryInfo.isCheck = false;
}

export function setCheckDateTime(state, dateTime) {
  const dateString = date.formatDate(dateTime, 'YYYY-MM-DD');
  const timeString = date.formatDate(dateTime, 'HH:mm');
  state.currentOrder.deliveryInfo.time = timeString;
  state.currentOrder.deliveryInfo.date = dateString;
  state.currentOrder.deliveryInfo.isCheck = true;
}

export function setDeliveryType(state, type) {

  state.currentOrder.deliveryInfo.type = type;


}

export function addPayment(state, payment) {
  state.currentOrder.payments.push(payment);
}

/* eslint-disable */

export function removePayment(state, payment) {
  state.currentOrder.payments = state.currentOrder.payments.filter((item) => {
    return item.hash !== payment.hash;
  });
}
export function setNewPaymentType(state, type) {
  state.newPayment.type = type;
}

export function setNewPaymentSum(state, sum) {
  state.newPayment.sum = sum;
}

export function setNewPaymentIsPay(state, isPay) {
  state.newPayment.isPay = isPay;
}

export function resetNewPayment(state) {
  state.newPayment = {
      type: null,
      sum: null,
      isPay: false,
      hash: (new Date()).getTime(),
    };
}

export function setDateIsCheck(state, isCheck) {
  state.currentOrder.deliveryInfo.isCheck = isCheck;
}

export function setNearTime(state, date) {
  state.nearTime.time = date;
}

export function setIsNewProductClean(state, isClean) {
  state.currentOrder.isNewProductClean = isClean;
}
