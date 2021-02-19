<template>
<div class="right-Navigate">
  <div class="vertical-line column items-center">
    <div class="icon-box column justify-start items-center content-center">
      <a href='https://www.facebook.com/phome.irk/' target="blank">
      <img src="..\..\assets\icon\fb-icon.png" class="icon-img"></a>
      <a href='https://www.instagram.com/pho_me_/' target="blank">
      <img src="..\..\assets\icon\inst-icon.png" class="icon-img"></a>
  </div>
  <div class="center column  justify-center">
  <div class="column"
        @click="toggleVisible"
        v-show="!isSideMenuVisible">
      <img src="..\..\assets\image\sandLine.png" class="sand-line">
      <img src="..\..\assets\image\sandLine.png" class="sand-line">
      <img src="..\..\assets\image\sandLine.png" class="sand-line">
  </div>
  <div class="close-img">
      <img src="..\..\assets\image\close-menu.png"
        @click="toggleVisible"
        v-show="isSideMenuVisible">
  </div>
  </div>
  </div>
<Side-menu v-show="isSideMenuVisible">
    </Side-Menu>
</div>
</template>

<script >
import SideMenu from '../../pages/SideMenu.vue';

export default {
  components: { SideMenu },
  name: 'RightNavigate',
  data() {
    return {
      isSideMenuVisible: false,
    };
  },
  methods: {
    toggleVisible() {
      this.isSideMenuVisible = !this.isSideMenuVisible;
    },
  },
};
</script >

<style scoped>
.right-Navigate {
  top: 0;
  position: fixed;
  width: 100%;
}

.vertical-line {
  position: fixed;
  right: 0;
  height: 100vh;
  width: 100px;
  z-index: 999999;
  background-color: #f8c200;
}

.sand-line {
  padding-top: 11px;
  cursor: pointer;
}

.icon-img {
  margin-top: 39px;
  cursor: pointer;
}
.close-img {
  cursor: pointer;
}

.center {
  position: absolute;
  height: 100vh;
  }
</style>
