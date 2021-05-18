<template>
  <div class="logo" v-scroll-to="{ el: '#main-page' }">
    <img src="/icons/logo.svg" />
  </div>
</template>

<script >
import Vue from 'vue'; // vue
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

export default {
  name: 'Logo',
};
</script >

<style scoped >
.logo {
  position: absolute;
  top: 23px;
  left: 100px;
  z-index: 0;
  cursor: pointer;
  width: 191px;
  height: 70px;
}

@media (max-width: 1280px) {
  .logo img {
  }
}

@media (max-width: 1023px) {
  .logo {
    display: none;
  }
}
</style >
