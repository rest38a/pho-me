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
                                <p class="title-feedback">Ждем твой<br>
                                    позитивный отзыв<br>
                                    на удобной для тебя площадке</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="feedback-list">
                                    <div
                                        v-for="(item, index) of items"
                                        :key="index"
                                        class="btn-feedback"
                                        :class="item.wrapClass"
                                        @click="clickHandle(item.link)"
                                    >
                                        <div class="img-feedback-wrap"
                                             :class="item.classImg">
                                            <img :src="item.image" alt=""></div>
                                        <div class="text-feedback-wrap"
                                             :class="item.childClass">Оставить отзыв<br>
                                            <span class="text-uppercase">{{ item.title }}</span>
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
  name: 'FeedbackMobile',
  data: () => ({
    items: [
      {
        title: 'в google.карты',
        image: '/image/icon-google.svg',
        link: 'https://goo.gl/maps/33hAJiqF1WTEA91x7',
        wrapClass: 'btn-feedback btn-feedback-google',
        classImg: 'img-wrap-google',
        childClass: 'text-color-black',
      },
      {
        title: 'в яндекс.карты',
        image: '/image/icon-yandex.svg',
        link: 'https://yandex.ru/profile/89814993326?intent=reviews&lr=63',
        wrapClass: 'btn-feedback btn-feedback-yandex',
        classImg: 'img-wrap-yandex',
        childClass: 'text-color-black',
      },
      {
        title: 'в 2gis',
        image: '/image/icon-2gis.svg',
        link: 'https://go.2gis.com/gzsw6v',
        wrapClass: 'btn-feedback btn-feedback-2gis',
        classImg: 'img-wrap-2gis',
        childClass: 'text-color-white',
      },
      {
        title: 'на trip advisor',
        image: '/image/icon-advisor.svg',
        link: 'https://www.tripadvisor.ru/Restaurant_Review-g298527-d14167780-Reviews-Pho_Me_Asian_Food_Drinks-Irkutsk_Irkutsk_Oblast_Siberian_District.html?m=19905',
        wrapClass: 'btn-feedback-advisor',
        classImg: 'img-wrap-advisor',
        childClass: 'text-color-white',
      },
      {
        title: 'на flamp',
        image: '/image/icon-flamp.svg',
        link: 'https://irkutsk.flamp.ru/addreview/70000001032191878',
        wrapClass: 'btn-feedback-flamp',
        classImg: 'img-wrap-flamp',
        childClass: 'text-color-white',
      },
    ],
  }),
  methods: {
    clickHandle(link) {
      window.location.href = link;
    },
  },
};
</script>

<style scoped>
    @font-face{
        font-family: TT Lakes;
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
    }
    .title-feedback {
        font-family: TT Lakes, sans-serif;
        font-style: normal;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
        color: #FFFFFF;
        margin-bottom: 25px;
    }
    .feedback-list {
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
    }
    .btn-feedback {
        display: flex;
        width: 227px;
        height: 56px;
        background: #FFFFFF;
        border-radius: 10px;
        margin: 0 auto 8px;
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
        width: 56px;
        position: relative;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
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
        position: absolute;
        top: 10px;
        left: 17px;
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
        font-family: TT Lakes, sans-serif;
        text-transform: uppercase;
        line-height: 14px;
        font-size: 10px;
        padding: 15px 10px 0;
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
</style>
