export function addProductToBasket(state, product) {
  const index = state.orderProducts.findIndex((item) => item.name === product.name);

  if (index !== -1) {
    const searchElem = { ...state.orderProducts[index] };
    searchElem.count += 1;
    const oldStateOrderProduct = [...state.orderProducts];
    oldStateOrderProduct.splice(index, 1, searchElem);

    state.orderProducts = oldStateOrderProduct;
  } else {
    product.count = 1;
    state.orderProducts.push(product);
  }
}

export function removeOneProduct(state, product) {
  const index = state.orderProducts.findIndex((item) => item.name === product.name);

  if (state.orderProducts[index].count > 1) {
    const newProductState = [...state.orderProducts];
    newProductState[index].count -= 1;
    state.orderProducts = [...newProductState];
  } else {
    state.orderProducts = state.orderProducts.filter((item) => item.name !== product.name);
  }
}
export function removeProductToBasket(state, product) {
  state.orderProducts = state.orderProducts.filter((item) => item.name !== product.name);
}

export function setPhone(state, phone) {
  state.order.phone = phone;
}

export function setPayment(state, payment) {
  state.order.payment = payment;
}

export function setAddress(state, address) {
  state.order.address = address;
}

export function setApartment(state, apartment) {
  state.order.apartment = apartment;
}
export function setTime(state, time) {
  state.order.time = time;
}

export function setComment(state, comment) {
  state.order.comment = comment;
}
export function setEarly(state, early) {
  state.order.early = early;
}

export function setCostume(state, isCostume) {
  state.order.isCostume = isCostume;
}

export function setName(state, name) {
  state.order.name = name;
}
export function setOrderMenu(state, orderMenu) {
  state.orderMenu = [...orderMenu];
}

export function setCategoriesMenu(state, categoriesMenu) {
  state.categoriesMenu = [...categoriesMenu];
}

export function setForks(state, forks) {
  state.order.forks = forks;
}
