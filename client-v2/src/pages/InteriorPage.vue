<template>
  <div class="interior-side background">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">ИНТЕРЬЕР</h1>
      </div>
      <div class="relative-box row q-col-gutter-md display-none-class">
        <div
          class="img-wrapper col-lg-6 col-md-4 col-xs-6 render-card-box display-none-class"
          v-for="interior in interiors"
          :key="interior.id"
        >
          <img
            class="image" @click="chooseInterior(interior)"
            :src="`${CLIENT_API_LINK}/uploads/${interior.photo}`"
          />
        </div>
        <q-dialog v-model="medium" class="pho-dialog">
          <q-card>
            <img
              class="image"
              :src="`${CLIENT_API_LINK}/uploads/${activeInteriors.photo}`"
            />
          </q-card>
        </q-dialog>
      </div>
      <div class="relative-box row q-col-gutter-md form-area-display">
        <div
          class="img-wrapper col-lg-6 col-md-4 col-xs-6 render-card-box "
          v-for="interior in interiors"
          :key="interior.id"
        >
          <img
            class="image" @click="chooseInterior(interior)"
            :src="`${CLIENT_API_LINK}/uploads/${interior.photo}`"
          />
        </div>
      </div>
      <div class="mainPhoto">
        <img :src="`${CLIENT_API_LINK}/uploads/${activeInteriors.photo}`">
      <div class="row content-stretch">
        <Hooper class="column content-stretch col-4"
                @slide="updateCarousel"
                :infiniteScroll="false"
                ref="carousel" style="height: 100%">
          <Slide :key="interior.id" v-for="interior in interiors" class=" column col-4">
            <img :src="`${CLIENT_API_LINK}/uploads/${interior.photo}`" class="col-4"/>
          </Slide>
        </Hooper>
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
      photos: [],
    };
  },
  computed: {
    ...mapState('interiors', ['interiors']),
    sliderSet() {
      const sliderSet = [];
      const num = this.photos.length;
      if (num % 6 === 0) {
        sliderSet.push(this.photos);
      } else {
        const minusNum = num - 1;
        sliderSet[minusNum].push(this.photos);
      }
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
  },
  async mounted() {
    this.$store.dispatch('interiors/getInteriors').then(() => {
      if (this.interiors[0] !== undefined) {
        [this.activeInteriors] = this.interiors;
      }
      let interiorsPhoto = [];
      for (let i = 0; this.interiors[i]; i += 1) {
        const filterInteriors = this.interiors[i].photo;
        interiorsPhoto = [...interiorsPhoto, filterInteriors];
        this.photos = interiorsPhoto;
      }
    });
  },
};
</script>

<style scoped>
.interior-side {
  background: radial-gradient(#65e06e, #02bbbd);
  min-height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0 120px 178px 120px;
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

.display-none-class {
  display: none;
}

.q-card {
  overflow: hidden;
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
}

@media only screen and (max-width: 1023px) {
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

@media screen and (max-width: 991.98px) {
  .background {
    padding: 25.51px 14.83px 96px 14.83px;
  }
}

@media only screen and (min-width: 0px) and (max-width: 1561px) {
  .image {
    margin: 0 0;
  }
}
</style>
