<template>
  <div class="left-navigate row justify-start items-center content-center">
    <div
      class="full-width column wrap justify-center items-center content-center"
    >
      <div
        class="ellipse-box ellipse-close"
        v-for="item in pages"
        :data-title="item.dTitle"
        :key="item.id"
        @click="choosePoint(item)"
        @scroll="scroll"
        :class="{ active: idPage === item.id }"
        v-scroll-to="{ el: activePoint.page }"
      ></div>
      <!--        <img class="" src="../../assets/image/EllipseOpen.png" />
      </div>
      <div
        class="ellipse-box"
        @click="scrollToMenu('menu-page')"
        data-title="Меню"
        @click="scrollToId('main-page')"
      >
        <img src="../../assets/image/EllipseClose.png" />
      </div>
      <div class="ellipse-box" data-title="Акции">
        <img src="../../assets/image/EllipseClose.png" />
      </div>
      <div
        class="ellipse-box"
        @click="scrollToId('interior-page')"
        data-title="Интерьер"
      >
        <img src="../../assets/image/EllipseClose.png" />
      </div>
      <div
        class="ellipse-box"
        v-scroll-to="{ el: '#contact-page' }"
        data-title="Контакты"
      >
        <img src="../../assets/image/EllipseClose.png" />
      </div>-->
    </div>
  </div>
</template>

<script >
import { scroll } from 'quasar';

import Vue from 'vue'; // vue
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

const { setScrollPosition, getScrollTarget, getScrollPosition } = scroll;

export default {
  name: 'leftNavigate',
  data() {
    return {
      activePoint: 'null',
      idPage: 1,
      pages: [
        {
          page: '#main-page',
          id: 1,
          dTitle: 'Главная',
        },
        {
          page: '#menu-page',
          id: 2,
          dTitle: 'Меню',
        },
        {
          page: '#action-page',
          id: 3,
          dTitle: 'Акции',
        },
        {
          page: '#interior-page',
          id: 4,
          dTitle: 'Интерьер',
        },
        {
          page: '#contact-page',
          id: 5,
          dTitle: 'Контакты',
        },
      ],
    };
  },
  methods: {
    scrollToId(id) {
      // quasar
      const el = document.getElementById(id);
      const scrollTarget = getScrollTarget(el);
      console.log(el, scrollTarget);
      getScrollPosition(el);
      setScrollPosition(scrollTarget, el.offsetTop, 500);
    },
    scrollToMenu(id) {
      // element
      const el = document.getElementById(id);
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    },
    choosePoint(item) {
      this.activePoint = item;
    },
    scroll() {
      const pageHeight = document.body.clientHeight / this.pages.length;
      const idPage = Math.round(window.pageYOffset / pageHeight) + 1;
      this.idPage = idPage;
    },
  },
  mounted() {
    if (this.pages[0] !== undefined) {
      [this.activePoint] = this.pages;
    }
  },
  created() {
    window.addEventListener('scroll', this.scroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
  },
};
</script >

<style scoped lang='scss'>
.left-navigate {
  position: fixed;
  z-index: 1;
  top: 0;
  height: 100vh;
  width: 95px;
  margin: 0;
}

.ellipse-close:hover {
  animation: ellipse-anim 1s infinite;
}

.ellipse-close:hover:after {
  content: attr(data-title);
  position: absolute;
  z-index: 1;
  font-size: 14px;
  color: #fff;
  list-style-type: none;
  margin-top: 30px;
}

@keyframes ellipse-anim {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 1);
  }
}

.ellipse-close {
  background-image: url('../../assets/image/EllipseClose.png');
  background-repeat: no-repeat;
  background-position: center;
  width: 21px;
  height: 21px;
  margin: 36px;
  cursor: pointer;
  border-radius: 55%;

  &.active {
    background-image: url('../../assets/image/EllipseOpen.png');
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
