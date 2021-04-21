// eslin
<template>
    <div class="main-bg">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="child-bg">
                        <div class="row">
                            <div class="col-12 text-center">
                                <img src="/fbmob-icon.svg"/>
                            </div>
                            <div class="col-12">
                                <p class="title-feedback">Отдай свой
                                    голос за нас <br>в двух номинациях</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="feedback-list row justify-around ">
                                    <div
                                        v-for="(item, index) of items"
                                        :key="index"
                                        class="btn-feedback"
                                        :class="item.wrapClass"
                                        @click="clickHandle(item.link)"
                                    >
                                            <div class="img-feedback-wrap"
                                                 :class="item.classImg">
                                                <img :src="item.image" alt=""
                                                     class="icon-img"></div>
                                            <div class="text-feedback-wrap"
                                                 :class="item.childClass">{{ item.title }}<br>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SobakaView',
  data: () => ({
    items: [
      {
        title: 'Лучшая летняя \r\n терраса',
        image: '/image/beach.png',
        link: 'http://best-restaurant.irk.sobaka.ru/vote/project/121044',
        wrapClass: 'btn-feedback btn-feedback-google',
        classImg: 'img-wrap-google',
        childClass: 'text-color-black',
      },
      {
        title: 'Лучшее азиатское блюдо',
        image: '/image/box.png',
        link: 'http://best-restaurant.irk.sobaka.ru/vote/food/121585',
        wrapClass: 'btn-feedback btn-feedback-google',
        classImg: 'img-wrap-yandex',
        childClass: 'text-color-black',
      },
      // {
      //   title: 'на trip advisor',
      //   image: '/image/icon-advisor.svg',
      //   link: 'https://www.tripadvisor.ru/Restaurant_Review-g298527-d14167780-Reviews-Pho_Me_Asian_Food_Drinks-Irkutsk_Irkutsk_Oblast_Siberian_District.html?m=19905',
      //   wrapClass: 'btn-feedback-advisor',
      //   classImg: 'img-wrap-advisor',
      //   childClass: 'text-color-white',
      // },
    ],
  }),
  methods: {
    clickHandle(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style scoped>
    @font-face{
        font-family: tr;
        src: url(../assets/font/TTLakes-Black.ttf);
    }
    .main-bg {
        background: url("../assets/image/main-bg.jpg");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 100vh;
        display: flex;
        align-items: center;
    }
    .main-bg .container {
        padding: 15px;
    }
    .child-bg {
        background: linear-gradient(149.39deg, #FCD000 0.47%, #FFB72D 99.74%);
        width: 275px;
        margin: 0 auto;
        align-items: center;
        align-content: center;
    }
    .title-feedback {
        font-family: tr, sans-serif;
        font-style: normal;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 25px;
    }
    .feedback-list {
        display: flex;
        flex-direction: row;
        padding: 0 10px;
        /*flex-wrap: nowrap;*/
    }
    .btn-feedback {
        display: flex;
        height: 65px;
        width: 100%;
        flex-direction: row;
        background: #FFFFFF;
        border-radius: 10px;
        margin: 0 0 15px 0;
        cursor: pointer;
    }
    .btn-feedback:hover {
        background: rgba(0, 0, 0, 0.2)!important;
    }
    .btn-feedback:last-child {
        margin-bottom: 30px;
    }
    .btn-feedback-google {
        background: #FFFFFF;
    }
    .btn-feedback-yandex {
        background: #FFD600;
    }
    .btn-feedback-2gis {
        background: #A1C611;
    }
    .btn-feedback-advisor {
        background: #00AF87;
    }
    .btn-feedback-flamp {
        background: #2E6AE4;
    }
    .img-feedback-wrap {
        min-width: 56px;
        position: relative;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .img-wrap-google {
        background: rgba(242, 242, 242, 0.8);
    }
    .img-wrap-yandex {
        background: rgba(0, 0, 0, 0.11);
    }
    .img-wrap-2gis {
        background: rgba(57, 57, 56, 0.1);
    }
    .img-wrap-advisor {
        background: rgba(57, 57, 56, 0.2);
    }
    .img-wrap-flamp {
        background: rgba(47, 54, 64, 0.42);
    }
    .img-feedback-wrap img {
    }
    .img-wrap-2gis img {
        position: absolute;
        top: 5px;
        left: 5px;
    }
    .img-wrap-advisor img {
        position: absolute;
        top: 18px;
        left: 12px;
    }
    .img-wrap-flamp img {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .text-color-black {
        color: #323232;
    }
    .text-color-white {
        color: #fff;
    }
    .text-feedback-wrap {
        font-family: tr, sans-serif;
        text-transform: uppercase;
        line-height: 14px;
        font-size: 12px;
        padding: 10px 10px 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
    }
    .text-uppercase {
        text-transform: uppercase;
        font-size: 14px;
    }
    @media (max-width: 414px) {
        .child-bg {
            width: 100%;
        }
    }
    .icon-img{
        max-width: 30px;
    }
    .my-frame{
        width: 100%;
        height: 50vh;
    }
</style>
