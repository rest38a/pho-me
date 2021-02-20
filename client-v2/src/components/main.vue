<template>
    <q-page-container>
        <main-page></main-page>
        <menu-page></menu-page>
        <action-page></action-page>
        <contacts-page></contacts-page>
<!--        <my-footer></my-footer>-->
    </q-page-container>
</template>

<script>
import ActionPage from '../pages/ActionPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';
import MenuPage from '../pages/MenuPage.vue';
import mainPage from './main-page';
// import myFooter from './footer';

export default {
  name: 'HelloWorld',
  meta: {
    title: 'Pho me. Азиатский ресторан в Иркутске',
  },
  components: {
    //  myFooter,
    mainPage,
    MenuPage,
    ActionPage,
    ContactsPage,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      scr: 0,
    };
  },
  methods: {
    show() {
      alert(`Текущая прокрутка сверху: ${window.pageYOffset}`);
    },
  },
  computed: {
    scroll() {
      return 0;
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
