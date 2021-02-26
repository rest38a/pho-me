<template>
    <div class="green-side" id="menu-page">
      <logo></logo>
        <div class="container">
            <div class="full-width row justify-start items-baseline">
                <h1 class="title">МЕНЮ</h1>
                <ul class="row">
                    <li v-for="item in menus"
                    class="title-list"
                    :key="item.id"
                    @click="changeMenu(item)"
                    :class="{active: activeMenu === item}">{{ item.name }}</li>
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

.container {
}

.title {
    margin: 112px 0 79px;
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
</style >
