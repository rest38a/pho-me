<template>
    <q-page-container>
        <my-menu></my-menu>
        <start-page></start-page>
        <slider></slider>
        <menu-list></menu-list>
        <feedback></feedback>
        <my-footer></my-footer>
    </q-page-container>
</template>

<script>
import myMenu from './menu';
import startPage from './start-page';
import slider from './slider';
import menuList from './menu-list';
import feedback from './feedback';
import myFooter from './footer';

export default {
  name: 'HelloWorld',
  components: {
    feedback,
    myFooter,
    myMenu,
    startPage,
    menuList,
    slider,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      scr: window.pageYOffset,
    };
  },
  methods: {
    show() {
      alert(`Текущая прокрутка сверху: ${window.pageYOffset}`);
    },
  },
  computed: {
    scroll() {
      return window.pageYOffset;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
    body{
        height: 100vh;
    }
    .but{
        position: fixed;
        top:200px
    }

</style>
