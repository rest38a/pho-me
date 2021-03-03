/*
export function someAction (context) {
}
*/
import axiosInstans from 'axios';
import toCamelCase from '../../helpers/toCamelCase';

const token = localStorage.getItem('token');

const axios = axiosInstans.create({
  baseURL: process.env.ADMIN_API_LINK,
  timeout: 10000,
  headers: { Authorization: `Bearer ${token}` },
});

export function getClient(context, clientId) {
  axios.get(`${process.env.ADMIN_API_LINK}/api/client/${clientId}`)
    .then(({ data }) => {
      context.commit('setClient', toCamelCase(data.client));
    }).catch(() => false);
}

export async function createClient(context) {
  const { clientInfo } = context.state.currentOrder;
  axios.post(`${process.env.ADMIN_API_LINK}/api/client/`,
    { clientInfo })
    .then(({ data }) => {
      context.commit('setClient', toCamelCase(data.clientInfo.client));
      context.commit('setPhone', toCamelCase(data.clientInfo.phone));
    });
}

export async function saveAddress(context, newAddress) {
  const clientId = context.state.currentOrder.clientInfo.client.id;
  axios.post(`${process.env.ADMIN_API_LINK}/api/client/${clientId}/add-address`,
    { newAddress })
    .then(({ data }) => {
      context.commit('addAddress', toCamelCase(data.address));
    });
}

export async function saveOrder(context) {
  const order = context.state.currentOrder;
  axios.post(`${process.env.ADMIN_API_LINK}/api/order-back`,
    { order })
    .then(({ data }) => {
      context.commit('setOrderId', data.order.id);
    });
}

export async function getNearTime(context) {
  const order = context.state.currentOrder;
  axios.post(`${process.env.ADMIN_API_LINK}/api/order/near-time`,
    { order })
    .then(({ data }) => {
      context.commit('setNearTime', [new Date(data)]);
    });
}

export async function checkTime(context) {
  const order = context.state.currentOrder;
  axios.post(`${process.env.ADMIN_API_LINK}/api/order/check-time`,
    { order })
    .then(({ data }) => {
      if (data === true) {
        context.commit('setDateIsCheck', true);
      } else {
        context.commit('setDateIsCheck', false);

        // todo когда будет отдаваться два времени надо будет переписать
        context.commit('setNearTime', [new Date(data)]);
      }
    });
}
/* eslint-disable */

export async function removeProductAction(context, product) {
  context.commit('removeProduct', product);
  context.commit('setNewPaymentSum', context.getters.toPayStill);
}
export async function removePaymentAction(context, payment) {
  context.commit('removePayment', payment);
  context.commit('setNewPaymentSum', context.getters.toPayStill);
}
