<template>
  <div class="interior-side background">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">ИНТЕРЬЕР</h1>
      </div>
      <div class="relative-box row q-col-gutter-md">
        <div class="img-wrapper col-lg-6 col-md-6 col-xs-12 render-card-box"
         v-for="interior in interiors"
      :key="interior.id">
          <img class="image"
          :src="`${CLIENT_API_LINK}/uploads/${interior.photo}`" />
        </div>
        <!-- <q-btn
            v-if="activeInterior !== null && interior.id === activeinterior"
            @click="chooseInterior(interior)"
            class="pho-btn"
            flat
            :key="interior.id"
          >
            <div>
              {{ interior.name }}
            </div>
          </q-btn>
          <q-btn
            v-else
            flat
            class="pho-btn-outline"
            @click="chooseInterior(Interior)"
            :key="interior.id"
          >
            <div>
              {{ interior.name }}
            </div>
          </q-btn> -->
        <!-- <div class="img-wrapper col-md-grow col-12">
          <img class="image"
          :src="`${CLIENT_API_LINK}/uploads/${item.photo}`" />
        </div> -->
        </div>
        <!-- <div
          class="interior-box row justify-between q-pr-md q-col-gutter-md no-wrap wrap-md"
        >
          <div class="img-wrapper col-md-grow col-12">
            <img class="image" src="..\assets\image\interiorCard\testimg.jpg" />
          </div>
          <div class="img-help img-wrapper col-md-grow">
            <img class="image" src="..\assets\image\interiorCard\testimg.jpg" />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg2.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg3.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg4.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg5.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg6.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg7.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow col-12"></div>
          <div class="img-wrapper col-md-grow col-12">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg8.jpg"
            />
          </div>
          <div class="img-help img-wrapper col-md-grow">
            <img
              class="image"
              src="..\assets\image\interiorCard\testimg8.jpg"
            />
          </div>
        </div> -->
    </div>
    <bottom-navigation></bottom-navigation>
  </div>
</template >

<script >
import { mapState, mapMutations } from 'vuex';
import BottomNavigation from '../components/navigation/bottomNavigation.vue';
import logo from '../components/navigation/logo.vue';

export default {
  components: { logo, BottomNavigation },
  name: 'InteriorPage',
  data() {
    return {
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
      interior: [],
      photos: [],
      activeInteriorPhoto: [],
      activeInteriors: null,
    };
  },
  computed: {
    ...mapState('interiors', ['interiors']),
  },
  methods: {
    ...mapMutations('interiors', ['setInterior']),
    chooseInterior(interior) {
      this.activeInteriors = interior.id;
      const prepareInterior = [...interior.photo];
      this.photo = [...interior.photo];
      const sortFunction = (a, b) => a.sort_index - b.sort_index;
      this.activeInteriorPhoto = prepareInterior.sort(sortFunction);
    },
  },
  async mounted() {
    this.$store.dispatch('interiors/getInteriors').then(() => {
      if (this.interiors[0] !== undefined) {
        [this.activeInteriors] = this.interiors;
      }
    });
  },
};
</script >

<style scoped >
.interior-side {
  background: radial-gradient(#02babc, #215f64);
  min-height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 120px 178px 120px;
}

.image {
  cursor: pointer;
  margin: 0 5%;
  z-index: 0;
}

.img-wrapper {
  overflow: hidden;
  height: auto;
  z-index: 1;
  will-change: transform;
  transform: translateZ(0);
}

.relative-box {
  position: relative;
  height: 100%;
}

.interior-box {
  padding-bottom: 0;
}

.img-wrapper:hover {
  width: 100%;
  height: 100%;
  object-fit: fill;
  padding-bottom: 16px;
  position: absolute;
  animation: img-animation 0.3s;
  z-index: 9999;
}

.img-help {
  display: none;
}

.img-wrapper:hover + .img-help {
  width: 138px;
  display: block;
}

@keyframes img-animation {
  from {
    opacity: 0;
  }
  10% {
  }
  50% {
    opacity: 0.75;
  }
  to {
    opacity: 1;
  }
}

@media only screen and (max-width: 599px) {
  .interior-side {
    padding: 25.51px 14.83px 64px 14.83px;
  }

  ::-webkit-scrollbar {
    background: transparent;
  }

  .title {
    margin: 0 0 18px 0;
  }
  .logo {
    display: none;
  }
  .img-wrapper {
    height: 375px;
  }

  .image {
    height: 100%;
    width: 100vw;
  }

  .interior-box {
    padding-right: 14.83px;
    overflow-x: scroll;
  }
  .img-wrapper:hover {
    width: 100%;
    padding-bottom: 16px;
  }
}
@media only screen and (max-width: 1019px) {
  .interior-box {
    padding-right: 14.83px;
    overflow-x: scroll;
  }
  .img-wrapper:hover {
    width: 100%;
  }
  ::-webkit-scrollbar {
    display: none;
  }
}

@media screen and (max-width: 991.98px) {
  .background {
    padding: 25.51px 14.83px 96px 14.83px;
  }
}

@media only screen and (max-width: 919px) {
  @keyframes img-animation {
    from {
      opacity: 0;
    }
    10% {
      -webkit-transform: scale(0, 0);
    }
    50% {
      opacity: 0.75;
    }
    to {
      opacity: 1;
      -webkit-transform: scale(1, 1);
    }
  }
}
@media only screen and (min-width: 0px) and (max-width: 1344px) {
  .img-wrapper:hover {
    width: 100%;
    padding-bottom: 0;
  }
  .img-wrapper {
    height: 321.5px;
  }
  .image {
    height: 100%;
    width: 100vw;
    margin: 0 0;
  }
}

@media only screen and (min-width: 0px) and (max-width: 1561px) {
  .image {
    margin: 0 0;
  }
}
</style>
