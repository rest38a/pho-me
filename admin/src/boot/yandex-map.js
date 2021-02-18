import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';

const settings = {
  apiKey: '16b09954-8090-41fd-bf60-820c6a9dc208',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
};

Vue.use(YmapPlugin, settings);
