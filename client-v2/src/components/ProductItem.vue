<template >
  <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="pho-card column mobile-hide">
      <div class="pho-img-wrapper col-auto">
        <q-img
          :src="`${CLIENT_API_LINK}/uploads/${product.main_photo}`"
          :ratio="4 / 3"
        />
      </div>
      <div class="pho-card-info-area col-grow column justify-between">
        <div class="row justify-between">
          <div class="pho-card-product-name">{{ product.name }}</div>
          <div class="pho-card-product-weight">{{ product.weight }} гр.</div>
        </div>
        <div class="pho-card-description">
          {{ product.description }}
        </div>
        <modifiers-block
          :modifiers="product.modifiers"
          :userModifiers="userModifiers"
          :setModifierFunction="setModifier"
        ></modifiers-block>
        <div class="row justify-between items-center q-mt-xs">
          <div class="pho-card-price">{{ finalPrice }} ₽</div>
          <div>
            <q-btn
              flat
              @click="proxyAddBasket(product)"
              class="pho-btn pho-btn-med"
            >
              <div class="row">
                {{ getName(product.id) }}
                <img class="q-ml-sm" src="../assets/image/basketimage.png" />
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="pho-card-m row desktop-hide">
      <div class="pho-img-wrapper-row col-5">
        <q-img
          :src="`${CLIENT_API_LINK}/uploads/${product.main_photo}`"
          style="height: 100%"
        />
      </div>
      <div class="pho-card-info-area col-7 column justify-between">
        <div class="row justify-between items-center">
          <div class="pho-card-product-name col-12">{{ product.name }}</div>
          <div class="pho-card-product-weight col-12">
            {{ product.weight }} гр.
          </div>
        </div>
        <div class="pho-card-description">
          {{ product.description }}
        </div>
        <modifiers-block
          :modifiers="product.modifiers"
          :userModifiers="userModifiers"
          :setModifierFunction="setModifier"
        ></modifiers-block>
        <div class="row justify-between items-center q-mt-xs">
          <div class="pho-card-price">{{ finalPrice }} ₽</div>
          <div>
            <q-btn
              flat
              @click="proxyAddBasket(product)"
              class="pho-btn pho-btn-med"
            >
              <div class="row items-center">
                {{ getName(product.id) }}
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template >

<script >
import { mapMutations, mapState } from 'vuex';
import ModifiersBlock from './ModifiersBlock.vue';

export default {
  components: { ModifiersBlock },
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
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
    };
  },
  methods: {
    ...mapMutations('order', ['addProductToBasket', 'removeProductToBasket']),
    getName(productId) {
      const searchProduct = this.orderProducts.find((item) => item.product.id === productId);
      if (searchProduct !== undefined) return `В корзине ${searchProduct.number}`;
      return 'В корзину';
    },
    proxyAddBasket(productItem) {
      const cartItem = {
        id: '',
        userModifiers: {},
        finalPrice: '',
        comment: '',
        product: productItem,
        number: 1,
      };
      cartItem.id = this.buildIdToBasket(this.product, this.userModifiers);
      cartItem.userModifiers = JSON.parse(JSON.stringify(this.userModifiers));
      cartItem.finalPrice = this.finalPrice;
      cartItem.comment = this.buildCommentToBasket(
        this.product,
        this.userModifiers,
      );
      this.addProductToBasket(cartItem);
    },
    buildIdToBasket(product, userModifiers) {
      let cartId = `${product.id}`;
      if (userModifiers.main.product.id !== undefined) {
        cartId += ` ${userModifiers.main.product.id}`;
      }
      if (userModifiers.size.product.id !== undefined) {
        cartId += ` ${userModifiers.size.product.id}`;
      }
      for (let i = 0; i < userModifiers.add.length; i += 1) {
        cartId += `${userModifiers.add[i].product.id}`;
      }
      return cartId;
    },
    buildCommentToBasket(product, userModifiers) {
      let cartComment = '';
      if (userModifiers.main.product.id !== undefined) {
        cartComment += ` ${userModifiers.main.pName}`;
      }
      if (userModifiers.size.product.id !== undefined) {
        // todo поменять на структуру pName у всех модификаторов = name
        cartComment += ` ${userModifiers.size.pName}`;
      }
      for (let i = 0; i < userModifiers.add.length; i += 1) {
        cartComment += `${userModifiers.add[i].pName}`;
      }
      return cartComment;
    },
    setModifier(modifier, type) {
      if (type !== 'add') {
        this.userModifiers[type] = modifier;
      } else {
        let needIndex = null;
        this.userModifiers.add.forEach((item, index) => {
          if (item.product.id === modifier.product.id) needIndex = index;
        });
        if (needIndex === null) {
          this.userModifiers.add.push(modifier);
        } else {
          this.userModifiers.add.splice(needIndex, 1);
        }
      }
    },
    hasMainOrSizeModifiers() {
      return this.mainModifiers.length > 0 || this.sizeModifiers.length > 0;
    },
  },
  computed: {
    ...mapState('order', ['orderProducts', 'promoCode']),
    mainModifiers() {
      return this.product.modifiers.filter((item) => {
        if (item.type === undefined) return true;
        if (item.type === 'main') return true;
        return false;
      });
    },
    sizeModifiers() {
      return this.product.modifiers.filter((item) => {
        if (item.type === 'size') return true;
        return false;
      });
    },
    addModifiers() {
      return this.product.modifiers.filter((item) => {
        if (item.type === 'add') return true;
        return false;
      });
    },
    finalPrice() {
      let preparePrice = this.product.base_price;
      if (
        this.userModifiers.main !== undefined
        && this.userModifiers.main.addPrice !== undefined
      ) {
        preparePrice += +this.userModifiers.main.addPrice;
      }
      if (
        this.userModifiers.size !== undefined
        && this.userModifiers.size.addPrice !== undefined
      ) {
        preparePrice += +this.userModifiers.size.addPrice;
      }
      for (let i = 0; i < this.userModifiers.add.length; i += 1) {
        preparePrice += this.userModifiers.add[i].product.base_price;
      }
      return preparePrice;
    },
  },
  mounted() {
    if (this.product.modifiers.length > 0) {
      if (this.mainModifiers.length > 0) {
        [this.userModifiers.main] = this.mainModifiers;
      }
      if (this.sizeModifiers.length > 0) {
        [this.userModifiers.size] = this.sizeModifiers;
      }
      if (this.addModifiers.length > 0) {
        [this.userModifiers.add] = this.addModifiers;
      }
    }
  },
};
</script >

<style scoped >
.pho-card {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
}
.pho-card-m {
  background: #ffffff;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
  padding: 7px;
  height: 100%;
}
.pho-img-wrapper {
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
}
.pho-img-wrapper-row {
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  max-height: 180px;
}

.pho-btn {
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
  font-size: 22px;
  line-height: 29.7px;
  font-family: lcm;
  font-weight: 700;
}

.pho-btn-med {
  font-size: 16px;
  font-weight: 500;
  text-transform: none;
  line-height: 22px;
  color: #333333;
  margin: 0;
}

.pho-card-price {
  font-family: lcb;
  font-size: 22px;
  line-height: 22px;
  /* Gray 1 */
  color: #333333;
}
.pho-card-product-name {
    font-family: lcm;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: #4f4f4f;
}

.pho-card-product-weight {
  font-family: tr;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
  text-align: right;
}
  .pho-card-info-area {
    padding: 16px 20px 20px 20px;
  }

@media (max-width: 1023px) {
.pho-card-info-area {
    padding: 7px 2px 10px 11px;
  }
  .pho-card-product-name {
    font-size: 14px;
    font-weight: 700;
    line-height: 19px;
    padding-right: 5px;
    padding-bottom: 5px;
  }

.pho-card-product-weight {
  font-size: 10px;
  line-height: 16px;
  text-align: left;
}
.pho-card-description {
  font-family: lcm;
  padding: 5px 0 10px;
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  /* Gray 3 */
  color: #828282;
}
.pho-card-price {
  font-size: 18px;
  line-height: 24px;
}

.pho-btn-med {
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  max-height: 28px;
}

.q-btn__wrapper {
  padding: 0;
  min-height: none;
}

.cart-logo {
  width: 22px;
  margin-left: 10px;
}
.cart-icon-m {
  width: 15px;
  margin-left: 10px;
}
switch_item {
  cursor: pointer;
}

switch_area {
  background: #f2f2f2;
  border-radius: 10px;
  font-size: 12px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.05em;
  color: #828282;
  padding: 3px;
  font-family: tr;
}

.active_switch {
  background: #fff;
  box-shadow: 4px 4px 5px rgb(0 0 0 / 15%);
  border-radius: 9px;
  padding: 4px;
  cursor: pointer;
}
}
</style >
