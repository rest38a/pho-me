<template >
    <div class="" >
        <div class="pho-header" >
            <div class="container row justify-between full-height" >
                <div class="items-center justify-center row" >
                    <img src='../assets/image/logotext.png' class='textlogo_menu' >
                </div >
                <div class="row mobile-hide" >
                    <div class="menu_1_d" @click="gotoDelivey()">Доставка</div >
                    <div class="menu_1_d" @click="scrollToElement('menu')" >Меню</div >
                    <div class="menu_1_d" @click="scrollToElement('akcii')" >Акции</div >
                    <div class="menu_1_d" @click="scrollToElement('feedback')" >Отзывы</div >
                    <a class="menu_1_d" href='https://docs.google.com/forms/d/e/1FAIpQLScnm6GvACc-ItmaoGqxc8f2rZ5uJvWoCQPZl0xBuHp0STHa0w/viewform'
                    >Вакансии
                    </a >
                </div >
                <q-btn icon="menu" class="desktop-hide" @click="showMenu = !showMenu" flat></q-btn>
            </div >
        </div >
        <div class="column q-pt-xl bg-yel" v-if="showMenu">
            <div class="menu_1_d" @click="gotoDelivey()">Доставка</div >
            <div class="menu_1_d" @click="scrollToElement('menu')" >Меню</div >
            <div class="menu_1_d" @click="scrollToElement('akcii')" >Акции</div >
            <div class="menu_1_d" @click="scrollToElement('feedback')" >Отзывы</div >
            <a class="menu_1_d block"
                 href='https://docs.google.com/forms/d/e/1FAIpQLScnm6GvACc-ItmaoGqxc8f2rZ5uJvWoCQPZl0xBuHp0STHa0w/viewform'
            >Вакансии
            </a >
        </div >

    </div >
</template >

<script >
// import MdMenuIcon from 'vue-ionicons/dist/md-menu.vue';
import { scroll } from 'quasar';

const { getScrollTarget, setScrollPosition } = scroll;

export default {
  name: 'my-menu',
  data() {
    return {
      scroll_p: 0,
      showMenu: false,
    };
  },
  components: {
    // MdMenuIcon,
  },
  methods: {
    scrollToElement(id) {
      const el = document.getElementById(id);
      const target = getScrollTarget(el);
      const offset = el.offsetTop;
      const duration = 500;
      setScrollPosition(target, offset, duration);
    },
    gotoDelivey() {
      this.$router.push('delivery');
    },
  },
};
</script >

<style scoped >
    @font-face {
        font-family: lcb;
        src: url(../assets/font/lcb.ttf);
    }

    @font-face {
        font-family: lcm;
        src: url(../assets/font/lcm.ttf);
    }

    @font-face {
        font-family: lcr;
        src: url(../assets/font/lcr.ttf);
    }

    .textlogo_menu {
        height: 35px;
    }

    .menu_1_d {
        font-family: lcm;
        text-align: center;
        color: #000000;
        font-size: 1.4rem;
        width: 110px;
        margin: 5px auto;
        padding: 3px 0;
    }

    .menu_1_d:hover {
        cursor: pointer;
        background: #ad1da3;
        color: #ffffff;
        margin: 5px auto;
        width: 110px;
        padding: 3px 0;
        border-radius: 20px;
    }

    a {
        color: #000000;
    }

    .fix {
        position: relative;
        position: fixed;

        top: 0;
        z-index: 1000000000000000;
    }

    .burger {
        fill: #ad1da3;
        color: #ad1da3;
        padding-right: 0px;
    }
    .bg-yel{
        background: #fcd000;
    }

    .pho-header {
        height: 50px;
        background: #fcd000;
        width: 100%;
        position: absolute;
    }
</style >
