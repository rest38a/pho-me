<template>
  <div class="garden-side">
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">КОНТАКТЫ</h1>
      </div>
      <div class="row justify-between">
        <div>
          <div class="under-title">АДРЕС</div>
          <div class="description">
            г.Иркутск, ул. 3 июля, 25<br>ТРК «Модный Квартал», 2 этаж
          </div>
        </div>
        <div>
          <div class="under-title">РЕЖИМ РАБОТЫ</div>
          <div class="description">Ежедневно<br>с 12:00 до 22:00</div>
        </div>
        <div>
          <div class="under-title">КОНТАКТЫ</div>
          <div class="description">
            <u>+7(3952)00-00-00<br>contact@pho-me.ru</u>
          </div>
        </div>
      </div>
      <yandex-map class="yandex-map"
                            :controls="['zoomControl']"
                            :zoom='14'
                            :coords="[52.2731080, 104.2912690]">
                    <ymap-marker
                                :coords="[52.2731080, 104.2912690]"
                                :icon="{color: 'red'}"
                        ></ymap-marker >
                </yandex-map >
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
export default {
  name: 'ContactsPage',
};
</script >

<style scoped >
.garden-side {
  background: radial-gradient(#f8c200, #5b9f58);
  height: 100vh;
  overflow: hidden;
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
}

.title {
  margin: 112px 0 83px;
}

.yandex-map {
  width: 100%;
  height: 310px;
  border-radius: 15px;
  margin: 38px 0;
}

.follow-container {
  margin-top: 42px;
}

.icon-img {
  margin-left: 50px;
}

</style>
