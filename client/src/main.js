import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'

import './assets/scss/custom.scss'

import 'vue-ionicons/ionicons.scss'

import VueScrollTo from 'vue-scrollto'

Vue.use(VueScrollTo)

Vue.use(BootstrapVue)


Vue.config.productionTip = false

Vue.directive('scroll', {
    inserted: function (el, binding) {
        let f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f)
            }
        }
        window.addEventListener('scroll', f)
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')