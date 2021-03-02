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
          v-for="item in actions"
          :key="item.id"
        >
          <div class="render-card" :style="{ background: item.gradient }">
            <div class="titles-btn column justify-between">
              <div class="titles">
                <div class="under-title">{{ item.title }}</div>
                <div class="description">{{ item.description }}</div>
              </div>
              <div>
                <img
                  class="image"
                  :src="require(`../assets/image/actionCard/${item.image}`)"
                />
              </div>
              <div class="btn-image" @click="chooseCard(item)">
                <img src="..\assets\image\actionCard\actionButton.png" />
              </div>
            </div>
          </div>
        </div>

        <q-dialog v-model="medium" class="q-dialog">
          <q-card style="width: 700px; max-width: 80vw" class="q-card">
            <q-card-section class="q-card-section">
              <div
                class="render-card justify-between"
                :style="{ background: activeAction.gradient }"
              >
                <div class="titles-btn column justify-between">
                  <div class="titles">
                    <div class="under-title">{{ activeAction.title }}</div>
                    <div class="description">
                      {{ activeAction.description }}
                    </div>
                  </div>
                  <div>
                    <img
                      class="image"
                      :src="
                        require(`../assets/image/actionCard/${activeAction.image}`)
                      "
                    />
                  </div>
                  <div class="btn-image" @click="medium = false">
                    <img
                      src="..\assets\image\actionCard\actionButtonreturn.png"
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
</template>

<script>
import logo from '../components/navigation/logo.vue';

export default {
  components: { logo },
  name: 'ActionPage',
  data() {
    return {
      activeAction: null,
      medium: false,
      actions: [
        {
          title: 'ТЕМ КТО В ТЕМЕ',
          description: 'К каждому Том Кха - рис бесплатно!',
          image: 'actionCard1.png',
          id: '1',
          gradient: 'radial-gradient(at right bottom, #4de963, #02bbbd)',
        },
        {
          title: 'ШЕСТЬ ПЕЧАТЕЙ',
          description: 'Собирай печати за каждую покупку и получай подарки!',
          image: 'actionCard2.png',
          id: '2',
          gradient: 'radial-gradient(at right bottom, #F51F4B, #CA17A8)',
        },
        {
          title: 'ТРИ ПО ЦЕНЕ ТРЁХ',
          description:
            'Наши коктейли сильно крутые чтобы продавать их по скидке. Просто пробуй!',
          image: 'actionCard3.png',
          id: '3',
          gradient: 'radial-gradient(at right bottom, #F48C17, #EAC102)',
        },
        {
          title: 'ЗАХОДИ ЕСЛИ ЧТО',
          description: 'Каждый день молниеносные скидки на блюда дня!',
          image: 'actionCard4.png',
          id: '4',
          gradient: 'radial-gradient(at right bottom, #F1B505, #5D9F57)',
        },
      ],
    };
  },
  methods: {
    chooseCard(item) {
      this.activeAction = item;
      this.medium = true;
    },
  },
  mounted() {
    if (this.actions[0] !== undefined) {
      [this.activeAction] = this.actions;
    }
  },
};
</script >
<style scoped >
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

@media only screen and (max-width: 599px) {
  .pink-side {
    padding: 25.51px 14.83px 64px 14.83px;
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
  }

  .btn-image {
    width: 76px;
    height: 76px;
  }
}

@media only screen and (max-width: 991.98px) {
  .background {
    padding: 25.51px 14.83px 64px 14.83px;
  }
}

@media only screen and (min-width: 991.98px) {
  .action-cards {
  margin-bottom: 178px;
}
}
</style>
