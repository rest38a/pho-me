<template>
  <div class="right-Navigate">
    <div class="vertical-line column items-center">
      <div class="icon-box column justify-start items-center content-center">
        <a href="https://www.facebook.com/phome.irk/" target="blank">
          <img src="..\..\assets\icon\fb-icon.png" class="icon-img"
        /></a>
        <a href="https://www.instagram.com/pho_me_/" target="blank">
          <img src="..\..\assets\icon\inst-icon.png" class="icon-img"
        /></a>
      </div>
      <div class="center column justify-center">
        <div class="column" @click="toggleVisible" v-show="!isSideMenuVisible">
          <img src="..\..\assets\image\sandLine.png" class="sand-line" />
          <img src="..\..\assets\image\sandLine.png" class="sand-line" />
          <img src="..\..\assets\image\sandLine.png" class="sand-line" />
        </div>
        <div class="close-img">
          <img
            src="..\..\assets\image\close-menu.png"
            @click="toggleVisible"
            v-show="isSideMenuVisible"
          />
        </div>
      </div>
    </div>
    <div class="side-container row" v-show="isSideMenuVisible">
      <div class="photo-box col-4">
        <img src="..\..\assets\image\SideMenu.png" class="photo" />
      </div>
      <div class="side-menu col-grow">
        <img src="..\..\assets\icon\logo.png" class="logo" @click="scrollToMenu('main-page')" />
        <ul class="title column">
          <li class="title" @click="scrollToMenu('menu-page')">МЕНЮ</li>
          <li class="title" @click="scrollToMenu('action-page')">АКЦИИ</li>
          <li class="title" @click="scrollToMenu('interior-page')">ИНТЕРЬЕР</li>
          <li class="title" @click="scrollToMenu('contact-page')">КОНТАКТЫ</li>
          <li class="title" @click="scrollToMenu('action-page')">ВАКАНСИИ</li>
        </ul>
        <div class="vertical-line col"></div>
      </div>
    </div>
  </div>
</template>

<script >
export default {
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
    scrollToMenu(id) {
      this.isSideMenuVisible = !this.isSideMenuVisible;
      const el = document.getElementById(id);
      el.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      });
    },
  },
};
</script >

<style scoped>
.right-Navigate {
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 999999;
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

.side-container {
  position: fixed;
  height: 100vh;
  overflow: hidden;
  left: 0;
  right: 0;
}

.photo-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}

.photo {
  display: block;
  height: 100%;
  width: auto;
}

.side-menu {
  background: #f8c200;
  padding: 50px 100px 50px 131px;
  overflow-y: auto;
  height: 100vh;
}

.side-title {
  padding: 57px 0;
}

.title {
  font-family: lb;
  font-size: 90px;
  line-height: 120px;
  color: #fff;
  font-style: italic;
  list-style-type: none;
  cursor: pointer;
  padding: 0 0 25px 0;
}
.vertical-line {
  width: 100px;
  background-color: #f8c200;
}

.right-navigate {
  cursor: pointer;
}

.icon-img {
  margin-top: 39px;
  cursor: pointer;
}

.logo {
  cursor: pointer;
}

.close-img {
}

::-webkit-scrollbar {
  background: transparent;
}

@media (max-width: 1280px) {
  .title {
    font-size: 60px;
    line-height: 60px;
  }
}

@media (max-width: 991px) {
  .title {
    font-size: 50px;
    line-height: 50px;
  }
}

@media (max-width: 713px) {
  .title {
    font-size: 40px;
    line-height: 40px;
  }
}

@media (max-width: 580px) {
  .title {
    font-size: 30px;
    line-height: 30px;
  }
}
</style>
