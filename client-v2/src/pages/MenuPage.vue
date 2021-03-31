<template>
  <div class="green-side background" id="menu-page">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">МЕНЮ</h1>
        <div  class="button-box row" >
        <div v-for="item in menus" :key="item.id">
          <q-btn
            v-if="activeMenu !== null && item === activeMenu"
            @click="changeMenu(item)"
            class="pho-btn"
            flat
          >
            <div>
              {{ item.name }}
            </div>
          </q-btn>
          <q-btn
            v-else
            flat
            class="pho-btn-outline"
            @click="changeMenu(item)"
            :key="item.id"
          >
            <div>
              {{ item.name }}
            </div>
          </q-btn>
        </div>
        </div>
      </div>
      <div class="for-iframe" v-html="activeMenu.code"></div>
    </div>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import BottomNavigation from '../components/navigation/bottomNavigation.vue';
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
  margin-right: 36px;
  cursor: pointer;

  &.active {
    font-family: lcb;
  }
}

.for-iframe {
  height: 447px;
}

.button-box {
  margin-left: 40px;
}

.pho-btn {
  font-family: lcb;
  margin: 10px 10px 55px 0px;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
  font-size: 22px;
}

.pho-btn-outline {
  margin: 10px 10px 55px 0px;
  border-radius: 10px;
  border: 2px solid #ffffff;
  color: #fff;
  font-family: lcb;
  font-size: 22px;
}

.pho-btn-outline:hover {
  margin: 10px 10px 55px 0px;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
}

.pho-btn-outline:hover > div {
  color: #4f4f4f;
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
    padding: 25.51px 14.83px 98px 14.83px;
  }
}
</style>
