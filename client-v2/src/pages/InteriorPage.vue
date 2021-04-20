<template>
  <div class="interior-side background">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">ИНТЕРЬЕР</h1>
      </div>
      <div class="relative-box row q-col-gutter-md display-none-class">
        <div
          class="img-wrapper col-lg-6 col-md-4 col-xs-6 render-card-box"
          v-for="interior in interiors"
          :key="interior.id"
        >
          <img
            class="image" @click="chooseInterior(interior)"
            v-if="interior !== null"
            :src="`${CLIENT_API_LINK}/uploads/${interior.photo}`"
          />
        </div>
        <q-dialog v-model="medium" class="pho-dialog">
          <q-card>
            <img
              v-if="activeInteriors !== null"
              class="image"
              :src="`${CLIENT_API_LINK}/uploads/${activeInteriors.photo}`"
            />
          </q-card>
        </q-dialog>
      </div>
      <div class="row form-area-display">
        <div class="row col-8 relative-position">
          <div class="row col-12 justify-between button-box q-pr-lg q-pl-md">
            <q-btn @click="slidePrev" flat round :ripple="false">
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="19.5" cy="19.5" r="19.5" transform="rotate(-180 19.5 19.5)"
                        fill="#F8C200"/>
                <path d="M14.3452 19.4939L22.6707 27.7964C22.9435 28.0683 23.3851 28.0679 23.6574
            27.795C23.9295 27.5223 23.9288 27.0804 23.656 26.8083L15.8261 19L23.6563
            11.1917C23.9291 10.9195 23.9298 10.478 23.6577 10.2051C23.5212 10.0684 23.3424
            10 23.1635 10C22.9851 10 22.807 10.0679 22.6707 10.2037L14.3452 18.506C14.2138
            18.6367 14.1401 18.8146 14.1401 19C14.1401 19.1853 14.214 19.363 14.3452 19.4939Z"
                      fill="white"/>
              </svg>
            </q-btn>
            <q-btn @click="slideNext" flat round :ripple="false">
              <svg width="39" height="39" viewBox="0 0 39 39" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="19.5" cy="19.5" r="19.5" fill="#F8C200"/>
                <path d="M24.6548 19.5061L16.3293 11.2036C16.0565 10.9317 15.6149 10.9321
            15.3426 11.205C15.0705 11.4777 15.0712 11.9196 15.344 12.1917L23.1739 20L15.3437
            27.8083C15.0709 28.0805 15.0702 28.522 15.3423 28.7949C15.4788 28.9316 15.6576
            29 15.8365 29C16.0149 29 16.193 28.9321 16.3293 28.7963L24.6548 20.494C24.7862
            20.3633 24.8599 20.1854 24.8599 20C24.8599 19.8147 24.786 19.637 24.6548 19.5061Z"
                      fill="white"/>
              </svg>
            </q-btn>
          </div>
        <hooper group="group1"
                class="mainPhoto col-12 row content-stretch q-pr-xs relative-position"
                @slide="updateCarouselMain"
                :infiniteScroll="true"
                ref="carousel"
                style="height: 100%">
          <slide
            v-for="(photos, index) in interiors" :key="`photos${index}`">
            <q-img
              :src="`${CLIENT_API_LINK}/uploads/${photos.photo}`"
              spinner-color="white"
              class=""
            />
          </slide>
        </hooper>
          </div>
        <div class="col-md-4 col-12 row content-stretch">
          <Hooper group="group331" class="row content-stretch"
                  @slide="updateCarousel"
                  :infiniteScroll="false"
                  ref="testRef"
                  style="height: 100%">
            <slide :key="`slide${index}`" v-for="(slide, index) in sliderSet" class="row">
              <div class="col-6 q-px-xs "
                   :key="`photo${photo.id}`" v-for="(photo, indexP) in slide"
                   :class=" { 'col-12' : slide.length === 1,
                             'q-pb-xs': ([0, 1]).includes(indexP) && slide.length !== 1,
                             'q-py-xs': ([2, 3]).includes(indexP),
                             'q-pt-xs': ([4, 5]).includes(indexP)}">
                <q-img
                  :src="`${CLIENT_API_LINK}/uploads/${photo.photo}`"
                  spinner-color="white"
                  class="img-interior"
                  style="height: 100%"
                  @click="goToSlide(indexP + index * 6)"
                />
              </div>
            </slide>
          </Hooper>
        </div>
        <div class="row content-center justify-end fit q-pt-md">
          <div class="row content-center q-mr-lg">
            <q-btn @click="slidePrevSet()" flat>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M1.11188 6.96402L6.95792 12.8081C7.21444 13.064 7.63004 13.064
                7.88721
                12.8081C8.14373 12.5522 8.14373 12.1366 7.88721 11.8808L2.50487
                6.50037L7.88656
                1.11998C8.14308 0.864105 8.14308 0.448501 7.88656 0.191981C7.63004
                -0.0638918 7.21379
                -0.0638918 6.95727 0.191981L1.11123 6.03602C0.858649 6.28925 0.858649
                6.71139 1.11188
                6.96402Z"
                      fill="white"/>
              </svg>
            </q-btn>

          </div>
          <div class="text-white my-m-bold q-px-md row content-center">
                    <span class="q-mr-xs">
                        {{ carouselData + 1 }}
                    </span>
            <span class="q-mx-xs">/</span>
            <span class="q-ml-xs">
                        {{ sliderSet.length }}
                    </span>
          </div>
          <div class="row content-center q-ml-lg">
            <q-btn @click="slideNextSet()"
                   flat>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path d="M7.88812 6.03598L2.04208 0.191882C1.78556 -0.0639902 1.36996 -0.0639902
                1.11279 0.191882C0.85627 0.447754 0.85627 0.863359 1.11279 1.11923L6.49513
                6.49963L1.11344
                11.88C0.856917 12.1359 0.856917 12.5515 1.11344 12.808C1.36996 13.0639 1.78621
                13.0639
                2.04273 12.808L7.88877 6.96398C8.14135 6.71075 8.14135 6.28861 7.88812 6.03598Z"
                      fill="white"/>
              </svg>
            </q-btn>
          </div>
        </div>
        <div class="row content-center justify-end fit q-pt-md">
          <div class="row content-center q-mr-lg">

          </div>
        </div>
      </div>
    </div>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  Hooper, Slide,
} from 'hooper';
import 'hooper/dist/hooper.css';
import BottomNavigation from '../components/navigation/BottomNavigation.vue';
import logo from '../components/navigation/logo.vue';

export default {
  components: {
    logo, BottomNavigation, Hooper, Slide,
  },
  name: 'InteriorPage',
  data() {
    return {
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
      activeInteriors: null,
      medium: false,
      carouselData: 1,
      carouselDataMain: 1,
    };
  },
  computed: {
    ...mapState('interiors', ['interiors']),
    sliderSet() {
      const sliderSet = [];
      this.interiors.forEach((photoItem, i) => {
        if (i % 6 === 0) {
          sliderSet.push([photoItem]);
        } else {
          sliderSet[sliderSet.length - 1].push(photoItem);
        }
      });
      return sliderSet;
    },
  },
  methods: {
    ...mapMutations('interiors', ['setInterior']),
    chooseInterior(interior) {
      this.activeInteriors = interior;
      this.medium = true;
    },
    updateCarousel(payload) {
      this.carouselData = payload.currentSlide;
    },
    updateCarouselMain(payload) {
      this.carouselDataMain = payload.currentSlide;
      for (let i = 0; i < this.sliderSet.length; i += 1) {
        if (((this.carouselDataMain + 1) / 6) > i
          && ((this.carouselDataMain + 1) / 6) < i + 1) {
          this.$refs.testRef.slideTo(i);
        } else if (((this.carouselDataMain + 1) / 6) > i + 2) {
          this.$refs.testRef.slideTo(0);
        } else if (this.carouselDataMain < 0) {
          this.$refs.testRef.slideTo(this.sliderSet.length - 1);
        }
      }
    },
    showPhoto(photo) {
      this.activeInteriors = photo;
    },
    slidePrev(index) {
      this.$refs.carousel.slidePrev();
      console.log(index);
    },
    slidePrevSet() {
      this.$refs.testRef.slidePrev();
    },
    slideNext() {
      this.$refs.carousel.slideNext();
    },
    slideNextSet() {
      this.$refs.testRef.slideNext();
    },
    goToSlide(index) {
      this.$refs.carousel.slideTo(index);
      console.log('index', index);
    },
  },
  async mounted() {
    this.$store.dispatch('interiors/getInteriors').then(() => {
      if (this.interiors[0] !== undefined) {
        [this.activeInteriors] = this.interiors;
      }
    });
  },
  watch: {
    carouselData() {
      this.$refs.testRef.slideTo(this.carouselData);
    },
    carouselDataMain() {
      this.$refs.carousel.slideTo(this.carouselDataMain);
    },
  },
};
</script>

<style scoped>
.interior-side {
  background: radial-gradient(#215f64, #02bbbd);
  min-height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 120px 130px 120px;
}

.img-interior {
  box-sizing: border-box;
  padding: 1px;
}

.img-interior:hover {
  border: 1px solid #fff;
  cursor: pointer;
  padding: 0;
}

.mainPhoto {
  position: relative;
}

.button-box {
  position: absolute;
  z-index: 999;
  top: 43%;
}

.hooper-prev {
  background-color: yellow;
}

.rightButton {
  position: absolute;
  top: 45%;
  left: 30px;
}

.leftButton {
  position: absolute;
  top: 45%;
  right: 30px;
}

.interiorButton {
  background: inherit;
  border: 0;
}

.image {
  width: 100%;
}

.image-hooper {
  width: 90%;
}

.display-none-class {
  display: none;
}

.q-card {
  overflow: hidden;
}

.hooper-list {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.text-white {
  font-family: tr;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
}

@media only screen and (max-width: 599px) {

  ::-webkit-scrollbar {
    background: transparent;
  }

  .title {
    margin: 0 0 18px 0;
  }
}

@media only screen and (max-width: 1023px) {
  .interior-side {
    overflow: hidden;
    padding: 0;
  }

  .image {
    cursor: pointer;
    width: 100%;
    height: auto;
    object-fit: fill;
  }

  .img-wrapper {
    overflow: hidden;
  }

  .q-card {
    overflow: hidden;
  }

  .form-area-display {
    display: none;
  }

  .display-none-class {
    display: flex;
  }
}

@media only screen and (max-width: 991.98px) {
  .background {
    padding: 25.51px 14.83px 48px 14.83px;
  }
}

@media only screen and (min-width: 0px) and (max-width: 1561px) {
  .image {
    margin: 0 0;
  }
}
</style>
