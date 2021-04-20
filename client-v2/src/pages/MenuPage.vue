<template>
  <div class="green-side background" id="menu-page">
    <logo></logo>
    <div class="container">
      <div class="title-btn-box row justify-start ">
        <h1 class="title">МЕНЮ</h1>
        <div  class="button-box row" >
        <div v-for="item in menus" :key="item.id">
          <q-btn
            v-if="item.id !== null"
            :id="item.id"
            :key="item.id"
            class="pho-btn"
            :class="{
              '': activeMenu !== null && item.id === activeMenu,
              'pho-btn-outline': item.id !== activeMenu.id,
            }"
            flat
            no-caps
            @click="changeMenu(item)"
          >
            <div>
              {{ item.name }}
            </div>
          </q-btn>
        </div>
        </div>
      </div>
      <div v-if="activeMenu !== null"
        class="for-iframe" v-html="activeMenu.code"></div>
    </div>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BottomNavigation from '../components/navigation/BottomNavigation.vue';
import logo from '../components/navigation/logo.vue';

export default {
  components: { logo, BottomNavigation },
  name: 'MenuPage',
  data() {
    return {
      activeMenu: null,
    };
  },
  computed: {
    ...mapState('menus', ['menus']),
  },
  methods: {
    ...mapMutations('menus', ['setMenu']),
    changeMenu(item) {
      this.activeMenu = item;
    },
  },
  mounted() {
    this.$store.dispatch('menus/getMenus').then(() => {
      if (this.menus[0] !== undefined) {
        [this.activeMenu] = this.menus;
      }
    });
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
  cursor: pointer;

  &.active {
    font-family: lcb;
  }
}

.title {
  margin: 0 36px 0 0;
}
.title-btn-box {
  margin: 127px 0px 69px 0;
}
.for-iframe {
  height: 447px;
}

.button-box {
}

.pho-btn {
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
  font-size: 22px;
  line-height: 29.8px;
  font-family: TT Lakes;
  font-weight: 700;
}

.pho-btn-outline {
  background: none;
  border: 2px solid #ffffff;
  color: #fff;
}

.pho-btn-outline:hover {
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
}

@media only screen and (max-width: 599px) {
  .green-side {
    padding: 25.51px 14.83px 64px 14.83px;
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

  .title-btn-box {
    margin: 0 0 36px 0;
  }
}
@media only screen and (max-width: 1023px) {
  .background {
    padding: 25.51px 14.83px 48px 14.83px;
  }
  .title-btn-box {
    margin: 0 0 36px 0;
  }
}
@media only screen and (max-width: 1023px) {
  .pho-btn {
    font-size: 14px;
    line-height: 18.9px;
  }

  .pho-btn-outline:hover {
    margin: 10px 10px 10px 0px;
    background: none;
    border: 2px solid #ffffff;
    color: #fff;
  }
}
</style>
