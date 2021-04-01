<template>
  <div class="main-box">
    <div class="cart-h1">Добавить к заказу?</div>
    <div class="">
      <VueSlickCarousel
        ref="slick"
        :arrows="true"
        :slidesToShow="slidesToShow"
        :focusOnSelect="true"
        :speed="500"
        :accessibility="true"
      >
        <div v-for="product in filterProducts" :key="product" class="item">
          <div>
            <div class="row sale-box">
              <div class="image-box">
                <img
                  class="sale-image"
                  :src="`${CLIENT_API_LINK}/uploads/${product.main_photo}`"
                />
              </div>
              <div class="column text-button-box">
                <div class="name-field">{{ product.name }}</div>
                <div class="price">{{ product.base_price }} ₽</div>
                <q-btn
                  flat
                  @click="proxyAddBasket(product)"
                  class="pho-btn-med-promo"
                  no-caps
                  unelevated
                >
                  <div>Добавить</div>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
  <div>
  </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'AdditionalSale',
  components: {
    VueSlickCarousel,
  },
  props: {
    addToBasket: {
      type: Function,
    },
  },
  data() {
    return {
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
      userModifiers: {
        main: { product: {} },
        size: { product: {} },
        add: [],
      },
      window: {
        width: 0,
      },
      slidesToShow: 0,
    };
  },
  methods: {
    ...mapMutations('order', ['addProductToBasket']),
    proxyAddBasket(productItem) {
      const cartItem = {
        id: productItem.id,
        userModifiers: {},
        finalPrice: productItem.base_price,
        comment: '',
        product: productItem,
        number: 1,
      };
      this.addProductToBasket(cartItem);
    },
    handleResize() {
      this.window.width = window.innerWidth;
      if (this.window.width >= 1400) {
        this.slidesToShow = 3;
      } else if (this.window.width >= 1190) {
        this.slidesToShow = 2.5;
      } else if (this.window.width >= 1028) {
        this.slidesToShow = 2.1;
      } else if (this.window.width >= 1023) {
        this.slidesToShow = 4;
      } else if (this.window.width >= 875) {
        this.slidesToShow = 3.5;
      } else if (this.window.width >= 750) {
        this.slidesToShow = 3;
      } else if (this.window.width >= 650) {
        this.slidesToShow = 2.1;
      } else if (this.window.width >= 500) {
        this.slidesToShow = 1.5;
      }
    },
  },
  computed: {
    ...mapState('order', ['categoriesMenu', 'orderProducts']),
    filterProducts() {
      let productsUpSales = [];
      for (let i = 0; this.categoriesMenu[i]; i += 1) {
        // eslint-disable-next-line
        const filterMenu = this.categoriesMenu[i].products.filter((item) => item.isUpsales === true);
        productsUpSales = [...productsUpSales, ...filterMenu];
      }
      return productsUpSales;
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style scoped>
.main-box {
  overflow: hidden;
}
.cart-h1 {
  font-family: TT Lakes;
  font-style: italic;
  font-size: 16px;
  line-height: 22px;
  font-weight: 900;
  margin: 10px 0 10px 0;
  padding-top: 10px;
}
.VueSlickCarousel {
  width: 603px;
  margin: 5px;
}

.vhl-item {
  width: 200px;
}
.item {
  width: 183px;
  border-radius: 3px;
  background: #f5f5f5;
}
.sale-box {
  height: 84px;
  width: 193px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 5px;
  display: inline-flex;
  margin-right: 10px;
}

.text-button-box {
  width: 94px;
  padding: 12px 5px 14px 10px;
}

.name-field {
  font-family: TT Lakes;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: black;
  margin-bottom: 4px;
}

.price {
  font-family: TT Lakes;
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  color: #828282;
  margin: 4px 0;
}

.image-box {
  height: 84px;
  width: 84px;
}

.sale-image {
  width: 84px;
  height: 84px;
}

.pho-btn-med-promo {
  width: 79px;
  font-family: TT Lakes;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: black;
  font-size: 9px;
  line-height: 12px;
  text-align: center;
  padding: 0;
}

@media (max-width: 919px) {
}

</style>
