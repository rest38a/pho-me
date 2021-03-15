<template>
  <div class="garden-side background">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">КОНТАКТЫ</h1>
      </div>
      <div class="row justify-between">
        <div class="col-auto">
          <div class="under-title">АДРЕС</div>
          <div class="description">
            г. Иркутск, ул. 3 июля, 25<br />ТРК «Модный Квартал», 2 этаж
          </div>
        </div>
        <div class="col-auto">
          <div class="under-title">РЕЖИМ РАБОТЫ</div>
          <div class="description">Ежедневно<br />с 12:00 до 22:00</div>
        </div>
        <div class="col-auto">
          <div class="under-title">КОНТАКТЫ</div>
          <div class="description">
            <u
              ><a href="tel:83952000000">+7(3952)00-00-00</a><br />
              <a href="mailto:contact@pho-me.ru">contact@pho-me.ru</a></u
            >
          </div>
        </div>
      </div>
      <yandex-map
        class="yandex-map-user"
        :controls="['zoomControl']"
        :zoom="14"
        :coords="[52.273108, 104.291269]"
      >
        <ymap-marker
          :coords="[52.273108, 104.291269]"
          :icon="{ color: 'red' }"
        ></ymap-marker>
      </yandex-map>
      <div class="follow-container row justify-start items-center">
        <div class="under-title">FOLLOW YOUR LOVE:</div>
        <a href="https://www.instagram.com/pho_me_/" target="_blank"
          ><img class="icon-img" src="../assets/icon/inst-icon.png"
        /></a>
        <a href="https://www.facebook.com/phome.irk/" target="_blank"
          ><img class="icon-img" src="../assets/icon/fb-icon.png"
        /></a>
      </div>
    </div>
  </div>
</template >

<script >
import logo from '../components/navigation/logo.vue';

export default {
  components: { logo },
  name: 'ContactsPage',
};
</script >

<style scoped >
.garden-side {
  background: radial-gradient(#f8c200, #5b9f58);
  min-height: 100%;
  overflow: hidden;
  padding: 0 120px 178px 120px;
  position: relative;
}

.container {
  padding: 0;
}

.under-title {
  font-size: 36px;
  font-family: lcb;
  line-height: 48, 6px;
  color: #fff;
}

.description {
  font-size: 24px;
  line-height: 36px;
  color: #fff;
  margin-right: 10px;;
}

a {
  color: #fff;
}

.yandex-map-user {
  width: 100%;
  height: 310px;
  border-radius: 15px;
  margin: 38px 0;
  overflow: hidden;
}

.follow-container {
  margin-top: 42px;
}

.icon-img {
  margin-left: 50px;
}

@media only screen and (max-width: 599px) {
  .garden-side {
    padding: 25.51px 14.83px 64px 14.83px;
  }

  .title {
    margin: 0 0 18px 0;
  }
  .logo {
    display: none;
  }

  .under-title {
    font-size: 20px;
    line-height: 27px;
    margin-right: 10px;
  }

  .description {
    font-size: 16px;
    line-height: 22px;
    padding-bottom: 31px;
  }

  .yandex-map-user {
    margin: 0 -100px 0 -100px;
    border-radius: 0;
    width: 150%;
    height: 226px;
  }

  .icon-img {
    margin-left: 26.04px;
    height: 22.18px;
  }
}

@media only screen and (max-width: 919.98px) {
  .background {
    padding: 25.51px 14.83px 64px 14.83px;
  }
  .yandex-map-user {
    margin: 0 0 0 -171px;
    border-radius: 0;
    width: 200%;
  }
}
</style>
