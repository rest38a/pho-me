import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';

const settings = {
  apiKey: '7df138bc-f837-4e1b-b1c3-9790e63279b0',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
};

Vue.use(YmapPlugin, settings);
