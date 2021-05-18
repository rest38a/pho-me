<template>
  <div class="pink-side background">
    <logo></logo>
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">АКЦИИ</h1>
      </div>
      <div class="action-cards row q-col-gutter-md">
        <div
          class="col-lg-6 col-md-6 col-xs-12 render-card-box"
          v-for="(promo, index) in promotionRestoraunt"
          :key="promo.id"
        >
          <div
            class="render-card justify-between"
            v-if="promo !== null"
            :style="{
                  background: gradients[index].gradient}">
            <img
              class="image"
              :src="`${CLIENT_API_LINK}/uploads/${promo.image}`"
            />
            <div class="titles-btn column justify-between">
              <div class="titles">
                <div class="under-title">{{ promo.name }}</div>
                <div class="description">{{ promo.short_text }}</div>
              </div>
              <div>
                <img
                  class="image"
                  :src="`${CLIENT_API_LINK}/uploads/${promo.image}`"
                />
              </div>
              <div class="btn-image" @click="chooseCard(promo, index)">
                <img src="../assets/image/actionCard/actionButton.png"/>
              </div>
            </div>
          </div>
          <q-dialog v-model="medium" class="q-dialog">
            <q-card style="width: 700px; max-width: 80vw" class="q-card">
              <q-card-section class="q-card-section">
                <div
                  v-if="activePromo !== null"
                  class="render-card justify-between"
                  :style="{
                  background: gradients[activePromoIndex].gradient}">
                  <div class="titles-btn column justify-between">
                    <div class="titles">
                      <div class="under-title">{{ activePromo.name }}</div>
                      <div class="description">
                        {{ activePromo.long_text }}
                      </div>
                    </div>
                    <div>
                      <img
                        class="image"
                        :src="`${CLIENT_API_LINK}/uploads/${activePromo.image}`"
                      />
                    </div>
                    <div class="btn-image" @click="medium = false">
                      <img
                        src="../assets/image/actionCard/actionButtonreturn.png"
                      />
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
      </div>
    </div>
    <bottom-navigation></bottom-navigation>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import BottomNavigation from '../components/navigation/BottomNavigation.vue';
import logo from '../components/navigation/logo.vue';

export default {
  components: {
    logo,
    BottomNavigation,
  },
  name: 'ActionPage',
  data() {
    return {
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
      activePromo: null,
      activePromoIndex: null,
      medium: false,
      gradients: [
        {
          id: '1',
          gradient: 'linear-gradient(225deg, rgba(2,187,189,1) 0%, rgba(255,237,0,1) 50%, rgba(122,255,217,1) 100%)',
        },
        {
          id: '2',
          gradient: 'linear-gradient(135deg, rgba(255,112,230,1) 0%, rgba(2,187,189,1) 50%, rgba(255,237,0,1) 100%)',
        },
        {
          id: '3',
          gradient: 'linear-gradient(225deg, rgba(255,112,230,1) 0%, rgba(232,78,15,1) 50%, rgba(255,237,0,1) 100%)',
        },
        {
          id: '4',
          gradient: 'linear-gradient(135deg, rgba(2,187,189,1) 0%, rgba(255,112,230,1) 50%, rgba(255,237,0,1) 100%)',
        },
      ],
    };
  },
  computed: {
    ...mapState('promotions', ['promotions']),
    promotionRestoraunt() {
      const filterPromo = this.promotions.filter((item) => {
        const type = JSON.parse(item.type);
        return type.id === 1;
      });
      return filterPromo;
    },
  },
  methods: {
    chooseCard(promo, index) {
      this.activePromo = promo;
      this.activePromoIndex = index;
      this.medium = true;
    },
  },
  async mounted() {
    this.$store.dispatch('promotions/getPromotions')
      .then(() => {
        if (this.promotions[0] !== undefined) {
          [this.activePromo] = this.promotions;
        }
      });
  },
};
</script>
<style scoped>
.pink-side {
  background: radial-gradient(#ffa1c7, #f07550);
  min-height: 100%;
  overflow: hidden;
  padding: 0 120px 0 120px;
  position: relative;
}

.render-card {
  border-radius: 10px;
  height: 286px;
  position: relative;
  z-index: 1;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.titles-btn {
  padding: 35px 0 0 46px;
  height: 100%;
}

.titles {
  z-index: 3;
}

.under-title {
  font-size: 36px;
  font-family: lcb;
  line-height: 48.6px;
  color: #fff;
  font-style: normal;
}

.description {
  font-size: 24px;
  line-height: 36px;
  color: #fff;
}

.image {
  position: absolute;
  right: -17px;
  bottom: -32px;
  z-index: -1;
  width: 302px;
}

.btn-image {
  cursor: pointer;
  display: inline-block;
}

.q-card {
  overflow: hidden;
  border-radius: 10px;
}

.q-card-section {
  padding: 0;
}

@media only screen and (max-width: 1023px) {
  .pink-side {
    padding: 25.51px 0px 48px 0px;
  }

  .logo {
    display: none;
  }

  .render-card-box {
    padding-right: 0;
    padding-left: 0;
  }

  .action-cards {
    margin: 0;
  }

  .titles-btn {
    padding: 17px 22px 17px 22px;
    height: 100%;
  }

  .under-title {
    font-size: 20px;
    line-height: 27px;
  }

  .description {
    font-size: 16px;
    line-height: 22px;
  }

  .image {
    position: absolute;
    right: -14px;
    bottom: -14px;
    z-index: -1;
    width: 211px;
  }

  .btn-image {
    width: 76px;
    height: 76px;
  }
}

@media only screen and (min-width: 991.98px) {
  .action-cards {
    margin-bottom: 178px;
  }
}
</style>
