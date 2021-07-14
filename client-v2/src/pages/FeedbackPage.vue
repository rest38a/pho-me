<template>
  <div class="feedback-side background" id="menu-page">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">ОТЗЫВЫ</h1>
      </div>
      <div class="row main-box">
        <div class="feedback-box col-8">
          <div class="under-title">Круто, что тебе понравилось у нас!</div>
          <div class="under-title-post">
            Ждём твой позитивный отзыв на удобной для тебя площадке
          </div>
          <div class="feedback-table row q-col-gutter-lg">
            <div v-for="item in platforms" :key="item.id" class="social-box">
              <div class="description">{{ item.description }}</div>
              <div class="row rating-box content-center items-baseline">
                <div class="empty-star" v-for="starNumber in 5" :key="starNumber">
                  <div class="full-star"
                       :style="{width: calcWidth(item.rating, starNumber)}"></div>
                </div>
                <div class="rating">{{ item.rating }}</div>
              </div>
              <div
                class="btn-feedback"
                :class="item.wrapClass"
                @click="clickHandle(item.link)"
              >
                <div class="img-feedback-wrap" :class="item.classImg">
                  <img :src="item.image" alt=""/>
                </div>
                <div class="text-feedback-wrap" :class="item.childClass">
                  Оставить отзыв<br/>
                  <span class="text-uppercase">{{ item.title }}</span>
                </div>
              </div>
            </div>
            <div class="whatsapp-box">
              <div class="description">
                Остались какие-то вопросы<br/>или предложения?
              </div>
              <div
                class="btn-feedback btn-feedback-whatsapp"
                @click="clickHandle()"
              >
                <div class="img-feedback-wrap img-wrap-whatsapp">
                  <img src="../assets/image/feedback/WhatsApp.png"/>
                </div>
                <div class="text-feedback-wrap text-color-white">
                  написать нам<br/>
                  <span class="text-uppercase">НА WHATSAPP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="photo-box">
          <img src="../assets/image/feedbackImage.png" class="photo"/>
        </div>
      </div>
    </div>
    <div ><a class="footer" href="tel:83952596011">596-011</a></div>
  </div>
</template>

<script>
import logo from '../components/navigation/logo.vue';

export default {
  components: { logo },
  name: 'FeedbackPage',
  data() {
    return {
      config: {
        rating: 4.1,
        fullStarWidth: '0px',
        style: {
          fullStarColor: '#f8c200',
          emptyStarColor: 'white',
          starWidth: 10,
          starHeight: 10,
        },
      },
      platforms: [
        {
          id: '1',
          description: 'Наш рейтинг в 2GIS',
          rating: 4.8,
          socialImage: '../assets/image/feedback/gis.png',
          title: 'в 2gis',
          image: '/image/icon-2gis.svg',
          link: 'https://go.2gis.com/gzsw6v',
          wrapClass: 'btn-feedback btn-feedback-2gis',
          classImg: 'img-wrap-2gis',
          childClass: 'text-color-white',
        },
        {
          id: '2',
          description: 'Наш рейтинг в Яндекс',
          rating: 4.8,
          socialImage: '../assets/image/feedback/Yandex.png',
          title: 'в яндекс.карты',
          image: '/image/icon-yandex.svg',
          link: 'https://yandex.ru/profile/89814993326?intent=reviews&lr=63',
          wrapClass: 'btn-feedback btn-feedback-yandex',
          classImg: 'img-wrap-yandex',
          childClass: 'text-color-black',
        },
        {
          id: '3',
          description: 'Наш рейтинг в Google',
          rating: 4.7,
          socialImage: '../assets/image/feedback/Google.png',
          title: 'в google.карты',
          image: '/image/icon-google.svg',
          link: 'https://goo.gl/maps/33hAJiqF1WTEA91x7',
          wrapClass: 'btn-feedback btn-feedback-google',
          classImg: 'img-wrap-google',
          childClass: 'text-color-black',
        },
        {
          id: '4',
          description: 'Наш рейтинг в Flamp',
          rating: 4.8,
          socialImage: '../assets/image/feedback/Flamp.png',
          title: 'на flamp',
          image: '/image/icon-flamp.svg',
          link: 'https://irkutsk.flamp.ru/addreview/70000001032191878',
          wrapClass: 'btn-feedback-flamp',
          classImg: 'img-wrap-flamp',
          childClass: 'text-color-white',
        },
        {
          id: '5',
          description: 'Наш рейтинг в Trip Advisor',
          rating: 4.5,
          socialImage: '../assets/image/feedback/tripadvisor.png',
          title: 'на trip advisor',
          image: '/image/icon-advisor.svg',
          link:
            'https://www.tripadvisor.ru/Restaurant_Review-g298527-d14167780-Reviews-Pho_Me_Asian_Food_Drinks-Irkutsk_Irkutsk_Oblast_Siberian_District.html?m=19905',
          wrapClass: 'btn-feedback-advisor',
          classImg: 'img-wrap-advisor',
          childClass: 'text-color-white',
        },
        // {
        //   id: '6',
        //   description: 'Остались какие-то вопросы или предлоежения?',
        //   socialImage: '../assets/image/feedback/Whatsup.png',
        // },
      ],
    };
  },
  methods: {
    clickHandle(link) {
      window.location.href = link;
    },
    calcWidth(rating, starNumber) {
      let fillOfStar = '100%';
      if (starNumber <= rating) {
        return fillOfStar;
      }
      fillOfStar = `${((rating % (starNumber - 1)) * 100)}%`;
      return fillOfStar;
    },
  },
};
</script>

<style scoped lang='scss'>
.feedback-side {
  background: radial-gradient(
      59.09% 53.85% at 50% 50%,
      rgba(255, 168, 0, 0.88) 23.44%,
      #fcd000 100%
  );
  min-height: 100%;
  overflow: hidden;
  padding: 0 120px 10% 120px;
  position: relative;
}

.main-box {
  overflow: hidden;
}

.feedback-box {
  background-color: white;
  height: auto;
  z-index: 2;
  border-radius: 10px 0 0 10px;
  padding: 37px 55px 88px 55px;
  width: 940px;
}

.photo-box {
  z-index: 1;
  flex: floor($number: 1);
}

.photo {
  height: 574px;
  object-fit: cover;
  max-width: 100%;
}

.under-title {
  font-family: lb;
  font-style: normal;
  font-weight: 900;
  font-size: 36px;
  line-height: 49px;
  color: #333333;
}

.under-title-post {
  font-family: lcm;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #4f4f4f;
  margin-top: 15px;
}

.feedback-table {
  margin-top: 27px;
}

.social-box {
  position: relative;
}

.description {
  font-family: lcm;
  font-weight: 500;
  font-size: 16px;
  line-height: 36px;
  color: #000000;
  margin-bottom: 5px;
}

.rating {
  font-family: tr;
  font-weight: 500;
  font-size: 26px;
  line-height: 14px;
  color: #333333;
  margin-left: 18px;
}

.empty-star {
  background-image: url("../assets/image/feedback/emptyStar.svg");
  width: 22px;
  height: 22px;
  margin: 0 9px 15px 0;
  position: relative;
}

.full-star {
  background-image: url("../assets/image/feedback/fullStar.png");
  height: 22px;
  position: absolute;
  left: 0;
}

.star-rating {
  margin-bottom: 15.44px;
}

.whatsapp-box {
  position: relative;
}

.btn-feedback {
  display: flex;
  width: 253.88px;
  height: 62.63px;
  background: #ffffff;
  border-radius: 10px;
  cursor: pointer;
}

.btn-feedback:hover {
  background: rgba(0, 0, 0, 0.2) !important;
}

.btn-feedback-google {
  background: #ffffff;
}

.btn-feedback-yandex {
  background: #ffd600;
}

.btn-feedback-2gis {
  background: #a1c611;
}

.btn-feedback-advisor {
  background: #00af87;
}

.btn-feedback-flamp {
  background: #2e6ae4;
}

.btn-feedback-whatsapp {
  background: #25d366;
  padding: 0;
  position: absolute;
  bottom: 0;
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

.img-wrap-whatsapp {
  background: rgba(57, 57, 56, 0.2);
}

.img-feedback-wrap img {
  position: absolute;
  top: 10px;
  left: 17px;
}

.img-wrap-whatsapp img {
  position: absolute;
  top: 13px;
  left: 13px;
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
  font-family: lb;
  text-transform: uppercase;
  line-height: 14px;
  font-size: 8px;
  font-weight: 900;
  padding: 15px 10px 0;
}

.text-uppercase {
  text-transform: uppercase;
  font-size: 14px;
  font-family: lb;
}

.footer {
  display: none;
  color: white;
  text-decoration: none;
}

@media (max-width: 414px) {
  .child-bg {
    width: 100%;
  }
}

@media (max-width: 1177px) {
  .feedback-box {
    height: auto;
  }
}

@media (max-width: 1159px) {
  .feedback-box {
    width: 740px;
  }
  .photo {
    object-fit: cover;
    max-width: 100%;
    height: 100%;
  }
}

@media (max-width: 1023px) {
  .feedback-table {
    margin: 24px 0 0 0;
  }

  .background {
    padding: 25.51px 0px 0 0px;
  }

  .btn-feedback-whatsapp {
    position: inherit;
  }

  .feedback-box {
  }
  .social-box {
    margin: 0 auto;
    padding: 0;
  }
  .whatsapp-box {
    margin: 0 auto;
    padding: 7px;
  }
  .footer {
    display: block;
    height: 68px;
    width: 110%;
    background-color: #f8c200;
    margin: 48px -1px 0 -14.83px;
    font-family: tr;
    line-height: 55px;
    font-size: 36px;
    font-weight: 900;
    color: white;
    text-align: center;
    font-style: italic;
    padding: 6px 0;
  }
}

@media (max-width: 578px) {
  .title {
    margin-bottom: 26px;
  }
  .under-title {
    font-size: 25px;
    line-height: 38px;
  }
  .feedback-box {
    padding: 18px 16px;
  }
}

@media (max-width: 318px) {
  .feedback-box {
    padding: 5px 5px;
  }
}
</style>
