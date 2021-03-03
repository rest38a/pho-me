import Vue from 'vue';
import axios from 'axios';

const token = localStorage.getItem('token');

const axiosInstatns = axios.create({
  baseURL: process.env.ADMIN_API_LINK,
  timeout: 10000,
  headers: { Authorization: `Bearer ${token}` },
});

Vue.prototype.$axios = axiosInstatns;
