<template>
  <div class="right-Navigate">
    <div class="vertical-line column items-center">
      <img
        src="..\..\assets\icon\logo.png"
        class="logo-mobile"
        @click="scrollToMenu('main-page')"
      />
      <div class="icon-box column items-center">
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
        <div
          class="close-img"
          @click="toggleVisibleClose"
          v-show="isSideMenuVisible"
        >
          <img src="..\..\assets\image\sandLine.png" class="sand-line-mobile" />
          <img src="..\..\assets\image\sandLine.png" class="sand-line-mobile" />
          <img src="..\..\assets\image\sandLine.png" class="sand-line-mobile" />
          <img class="close" src="..\..\assets\image\close-menu.png" />
        </div>
      </div>
    </div>
    <div class="side-container row" v-show="isSideMenuVisible">
      <div class="photo-box col-4">
        <img src="..\..\assets\image\SideMenu.png" class="photo" />
      </div>
      <div class="side-menu col-grow">
        <img
          src="..\..\assets\icon\logo.png"
          class="logo"
          @click="scrollToMenu('main-page')"
        />
        <ul class="column title-list">
          <li class="title" @click="gotoDelivery()">ДОСТАВКА</li>
          <li class="title" @click="scrollToMenu('menu-page')">МЕНЮ</li>
          <li class="title" @click="scrollToMenu('action-page')">АКЦИИ</li>
          <li class="title" @click="scrollToMenu('interior-page')">ИНТЕРЬЕР</li>
          <li class="title" @click="scrollToMenu('contact-page')">КОНТАКТЫ</li>
          <li class="title" @click="scrollToMenu('feedback-page')">ОТЗЫВЫ</li>
          <li class="title" @click="scrollToMenu('')">ВАКАНСИИ</li>
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
      document.body.style.overflow = 'hidden';
    },
    toggleVisibleClose() {
      this.isSideMenuVisible = !this.isSideMenuVisible;
      document.body.style.overflow = 'auto';
    },
    scrollToMenu(id) {
      this.isSideMenuVisible = !this.isSideMenuVisible;
      const el = document.getElementById(id);
      el.scrollIntoView({
        inline: 'nearest',
        top: true,
      });
      document.body.style.overflow = 'auto';
    },
    gotoDelivery() {
      this.$router.push('delivery');
    },
  },
};
</script >

<style scoped>
.right-Navigate {
  top: 0;
  position: fixed;
  width: 2000px;
  z-index: 2;
  display: block;
}

.vertical-line {
  position: fixed;
  right: 0;
  height: 100vh;
  width: 100px;
  z-index: 3;
  background-color: #f8c200;
}

.sand-line {
  padding-top: 11px;
  cursor: pointer;
}
.close-img {
  cursor: pointer;
}

.center {
  position: absolute;
  top: 50%;
}

.side-container {
  position: fixed;
  height: 100vh;
  overflow: hidden;
  left: 0;
  right: 0;
}

.photo-box {
  width: 40%;
  height: 100vh;
  z-index: 1;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 3;
}

.side-menu {
  background: #f8c200;
  padding: 50px 100px 50px 131px;
  overflow-y: auto;
  height: 100vh;
  z-index: 2;
}

.side-title {
  padding: 57px 0;
}

.title-list {
  padding: 0;
}

.title {
  font-family: lb;
  font-size: 88px;
  line-height: 118px;
  color: #fff;
  font-style: italic;
  list-style-type: none;
  cursor: pointer;
  padding: 0 0 25px 0;
}

.icon-img {
  margin-top: 39px;
  cursor: pointer !important;
  z-index: 55;
}

.logo {
  cursor: pointer;
  margin-left: 20px;
}

::-webkit-scrollbar {
  background: transparent;
}

.logo-mobile {
  display: none;
}

.sand-line-mobile {
  display: none;
}

.mobile {
  display: none;
}

@media (max-width: 1340px) {
  .title {
    font-size: 80px;
    line-height: 110px;
  }
  .logo {
    width: 290px;
  }
  .side-menu {
    padding-left: 20px;
  }
}

@media (max-width: 1279px) {
  .title {
    font-size: 68px;
    line-height: 98px;
    padding: 0;
    margin: 0;
  }
  .logo {
    width: 270px;
  }
  .mobile {
    display: inline;
  }
  .side-menu {
    padding-left: 20px;
  }
}

@media (max-width: 919px) {
  .title {
    font-family: lb;
    font-size: 70px;
    line-height: 100px;
    padding: 0;
  }
  .logo {
    width: 300px;
  }
  .photo-box {
    display: none;
  }
}

@media only screen and (max-width: 919px) {
  .logo {
    width: 50px;
  }
  .vertical-line {
    right: 0;
    left: 0;
    top: 0;
    height: 48px;
    width: 100%;
    z-index: 3;
    background-color: #f8c200;
  }

  .center {
    top: 4.75px;
  }

  .sand-line {
    padding-top: 7.83px;
    width: 42px;
  }
  .close-img {
    top: 4.75px;
    height: 42px;
    width: 42px;
  }

  .close {
    display: none;
  }

  .sand-line-mobile {
    padding-top: 7.83px;
    width: 42px;
    display: block;
  }

  .photo-box {
    display: none;
  }

  .title {
    font-size: 70px;
    line-height: 100px;
    padding: 0;
  }
  .logo {
    width: 300px;
  }

  .icon-box {
    display: inline;
    position: fixed;
    right: 15px;
    top: 14px;
  }

  .icon-img {
    z-index: 55;
    margin: 0 0 0 31.04px;
    height: 20px;
  }

  .logo-mobile {
    display: inline;
    position: fixed;
    height: 27px;
    left: 17px;
    top: 8.74px;
  }

  .logo {
    display: none;
  }

  ::-webkit-scrollbar {
    background: transparent;
  }
}

@media only screen and (max-width: 599px) {
  .title {
    font-family: lb;
    font-size: 36px;
    line-height: 55px;
  }
}

@media only screen and (min-width: 1240px) {
  .title {
    margin: 0;
  }
}
</style>
