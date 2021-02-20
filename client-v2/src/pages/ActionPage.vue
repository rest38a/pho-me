<template>
  <div class="pink-side">
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">АКЦИИ</h1>
      </div>
      <div class="action-cards row q-col-gutter-md">
        <div class="col-6" v-for="item in actions" :key="item.id">
          <div class="render-card" :style="{ background: item.gradient }">
            <div class="titles-btn">
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
              <div class="btn-image" @click="chooseCard(item), (medium = true)">
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
                <div class="titles-btn">
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
export default {
  name: 'ActionPage',
  data() {
    return {
      activeAction: null,
      medium: false,
      actions: [
        {
          title: 'ЗАХОДИ ЕСЛИ ЧТО',
          description: 'Каждый день молниеносные скидки на блюда дня!',
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
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.render-card {
  border-radius: 10px;
  height: 286px;
  position: relative;
}

.title {
  margin: 112px 0 79px;
}

.action-cards {
  margin-bottom: 178px;
}

.titles-btn {
  padding: 35px 0 0 46px;
  height: 100%;
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
  width: 306px;
}

.image {
  position: absolute;
  right: -17px;
  bottom: -32px;
}

.btn-image {
  cursor: pointer;
}

.q-card {
  overflow: hidden;
  border-radius: 10px;
}

.q-card-section {
  padding: 0;
}

</style>
