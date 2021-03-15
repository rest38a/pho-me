<template>
  <div class="green-side background" id="menu-page">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">МЕНЮ</h1>
        <ul class="row under-title">
          <li
            v-for="item in menus"
            class="title-list"
            :key="item.id"
            @click="changeMenu(item)"
            :class="{ active: activeMenu === item }"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="for-iframe" v-html="activeMenu.link"></div>
    </div>
  </div>
</template>

<script>
import logo from '../components/navigation/logo.vue';

export default {
  components: { logo },
  name: 'MenuPage',
  data() {
    return {
      activeMenu: null,
      menus: [
        {
          name: 'КУХНЯ',
          link:
            '<iframe src="//v.calameo.com/?bkcode=0063012992a13044fb4ad&mode=viewer&showsharemenu=false" width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency allowfullscreen style="margin:0 auto;"></iframe>',
          id: '1',
        },
        {
          name: 'БАР',
          link:
            '<iframe src="//v.calameo.com/?bkcode=00630129929f58b759a74&mode=viewer&showsharemenu=false" width="100%" height="100%" frameborder="0" scrolling="no" allowtransparency allowfullscreen style="margin:0 auto;"></iframe>',
          id: '2',
        },
      ],
    };
  },
  methods: {
    changeMenu(item) {
      this.activeMenu = item;
    },
  },
  mounted() {
    if (this.menus[0] !== undefined) {
      [this.activeMenu] = this.menus;
    }
  },
};
</script >

<style scoped lang='scss'>
.green-side {
  background: radial-gradient(#4de963, #02bbbd);
  min-height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0 120px 178px 120px;
  position: relative;
}

.title-list {
  font-size: 24px;
  line-height: 32.4px;
  color: #fff;
  list-style-type: none;
  margin-right: 36px;
  cursor: pointer;

  &.active {
    font-family: lcb;
  }
}

.for-iframe {
  height: 447px;
}

@media only screen and (max-width: 599px) {
  .green-side {
    padding: 25.51px 14.83px 64px 14.83px;
  }

  .title {
    margin: 0;
  }

  .under-title {
    padding-left: 7px;
  }

  .title-list {
    font-size: 15px;
    line-height: 15px;
    margin: 0 7px 0 0;
    cursor: pointer;
  }

  .for-iframe {
    height: 221px;
  }

  .logo {
    display: none;
  }
}
@media only screen and (max-width: 991.98px) {
  .background {
    padding: 25.51px 14.83px 64px 14.83px;
  }
}
</style>
