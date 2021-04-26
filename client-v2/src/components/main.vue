<template>
    <q-page-container>
        <main-page id="main-page"></main-page>
        <menu-page id="menu-page"></menu-page>
        <action-page id="action-page"></action-page>
        <interior-page id="interior-page"></interior-page>
        <contacts-page id="contact-page"></contacts-page>
        <feedback-page id="feedback-page"></feedback-page>
        <right-navigate id="right-navigate"></right-navigate>
        <left-navigate></left-navigate>
<!--        <my-footer></my-footer>-->
    </q-page-container>
</template>

<script>
import FeedbackPage from '../pages/FeedbackPage.vue';
import ActionPage from '../pages/ActionPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';
import InteriorPage from '../pages/InteriorPage.vue';
import MenuPage from '../pages/MenuPage.vue';
import mainPage from './main-page';
import LeftNavigate from './navigation/LeftNavigate.vue';
import RightNavigate from './navigation/RightNavigate.vue';
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
    InteriorPage,
    RightNavigate,
    LeftNavigate,
    FeedbackPage,
  },
  props: {
    msg: String,
  },
  data() {
    return {
      scr: 0,
    };
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
