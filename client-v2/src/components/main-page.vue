<template >
  <div class="yelow_side2 container-fluid">
    <div class="logo">
      <img src="/icons/logo.svg" />
    </div>
    <div class="main-container container">
      <div class="text-col">
        <h1>Мы ресторан <nobr>и доставка</nobr></h1>
        <h2>Азиатская кухня и напитки.</h2>
				<div class="delivery-btn" @click="gotoDelivery()">Заказать доставку</div >
<!--				<div class="row q-mt-lg">-->
<!--&lt;!&ndash;				<a class="delivery-btn"-->
<!--				@click="scrollToMenu('menu-page')"-->
<!--				href="https://www.calameo.com/read/0063012992a13044fb4ad">Меню ресторана</a >&ndash;&gt;-->
<!--				<a class="delivery-btn"-->
<!--				@click="scrollToMenu('menu-page')">Меню ресторана</a >-->
<!--				</div>-->
				<div class="image"><img src="../assets/image/dish.png" alt=""></div>
			</div>
        </div >
        <bottom-navigation></bottom-navigation>
    </div >
</template >

<script >
import BottomNavigation from './navigation/BottomNavigation.vue';

export default {
  components: { BottomNavigation },
  name: 'main-page',
  methods: {
    gotoDelivery() {
      window.location = '/delivery';
    },
    scrollToMenu(id) {
      this.isSideMenuVisible = !this.isSideMenuVisible;
      const el = document.getElementById(id);
      el.scrollIntoView({
        block: 'end',
        inline: 'nearest',
      });
      document.body.style.overflow = 'auto';
    },
  },

};
</script >

<style scoped >
.img-fluid {
  max-width: 100%;
  height: auto;
}
@font-face {
  font-family: gl;
  src: url(../assets/font/GothaProLig.otf);
}
@font-face {
  font-family: gtb;
  src: url(../assets/font/gtb.ttf);
}
@font-face {
  font-family: ttdb;
  src: url(../assets/font/ttdb.ttf);
}
@font-face {
  font-family: ttm;
  src: url(../assets/font/ttm.ttf);
}
.yelow_side2 {
  background: radial-gradient(
    59.09% 53.85% at 50% 50%,
    rgba(255, 168, 0, 0.88) 23.44%,
    #fcd000 100%
  );
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.main-container {
  position: relative;
  display: flex;
  height: 100%;
}
h1 {
  font-family: lb;
  font-style: italic;
  font-weight: 900;
  font-size: 120px;
  line-height: 120px;
  color: #fff;
  margin: 0;
}
h2 {
  font-family: lcb;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #fff;
  margin: 35px 0;
}
.delivery-btn {
  font-family: lb;
  font-weight: 900;
  font-size: 21px;
  line-height: 28px;
  text-align: center;
  text-transform: uppercase;
  display: inline-block;
  padding: 21px 32px;
  color: #fff;
  background: #ca17a8;
  border-radius: 10px;
  cursor: pointer;
  -webkit-transition: 0.5s box-shadow;
  -o-transition: 0.5s box-shadow;
  transition: 0.5s box-shadow;
  text-decoration: none;
}
.delivery-btn:hover {
  -webkit-box-shadow: 0px 8px 35px 1px rgba(255, 0, 0, 1);
  -moz-box-shadow: 0px 8px 35px 1px rgba(255, 0, 0, 1);
  box-shadow: 0px 8px 35px 1px rgba(255, 0, 0, 1);
}
.logo {
  position: absolute;
  top: 23px;
  left: 50px;
  z-index: 2;
}
.text-col {
  align-self: center;
  width: 50%;
}
.image {
  position: absolute;
  right: -280px;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 1280px) {
  .logo img {
    width: 126px;
  }
  h1 {
    font-size: 90px;
    line-height: 90px;
  }
  .image {
    right: -70px;
  }
  .image img {
    width: 641px;
  }
  .delivery-btn {
    font-size: 18px;
    line-height: 24px;
    padding: 14px 32px;
  }
}
@media (min-width: 1400px) {
  .main-container {
    max-width: 1400px;
  }
}
@media (max-width: 991px) {
  h1 {
    font-size: 70px;
    line-height: 70px;
  }
  .image {
    right: -130px;
  }
  .image img {
    width: 553px;
  }
}

@media (max-width: 1023px) {
  .logo {
    opacity: 0;
  }
}
@media (max-width: 780px) {
  .text-col {
    width: 70%;
  }
  .image {
    right: -120px;
  }
}
@media (max-width: 767px) {
  .image {
    right: -280px;
  }
}
@media (max-width: 580px) {
  .yelow_side2 {
    height: auto;
  }
  .logo {
    position: static;
    padding-top: 23px;
    padding-left: 25px;
    margin-bottom: 40px;
  }
  h1 {
    font-size: 34px;
    line-height: 32px;
    width: 30%;
  }
  h2 {
    font-family: TT Lakes;
    font-size: 16px;
    line-height: 21.6px;
    font-weight: 500;
    margin: 20px 0;
  }
  .text-col {
    width: 100%;
  }
  .image {
    right: -50px;
    top: -60px;
    -webkit-transform: rotateZ(-25deg);
    -ms-transform: rotate(-25deg);
    transform: rotateZ(-25deg);
  }
  .image img {
    width: 218px;
  }
  .delivery-btn:last-of-type {
    margin-bottom: 32px;
  }
  @media (max-width: 320px) {
    .delivery-btn {
      width: 100%;
      padding: 14px;
    }
  }
}
</style >
