<template>
  <div class="row basket-item q-col-gutter-md justify-center items-center">
    <div class="col-2">
      <div class="pho-img-wrapper">
        <q-img
          :src="`${CLIENT_API_LINK}/uploads/${cartItem.product.main_photo}`"
          :ratio="4/3"
        />
      </div>
    </div>
    <div class="col-4 column">
      <div class="name">{{ cartItem.product.name }}</div>
      <div
        class="name-modifiers">{{ cartItem.comment }}
      </div>
      <!-- <div class="grey4">{{cartItem.product.weight}} гр</div> -->
    </div>
    <div class="col-3 row items-cente">
      <q-btn flat
             v-if="cartItem.isGift !== true"
             round
             class="round-btn button-mobile-size"
             size="xs"
             icon="remove"
             @click="removeOneProduct(cartItem)">
      </q-btn>
      <div
        v-if="cartItem.isGift !== true"
        class="num-product">{{ cartItem.number }}
      </div>
      <q-btn flat
             v-if="cartItem.isGift !== true"
             class="round-btn"
             round
             size="xs"
             icon="add"
             @click="addToBasket(cartItem)">
      </q-btn>
    </div>
    <div class="col-2 price">
      {{ cartItem.finalPrice }} ₽
    </div>
    <div class="col-1">
      <q-btn flat
             v-if="cartItem.isGift !== true"
             size="xs"
             round
             color="grey-5"
             icon="close" @click="removeFromBasket(cartItem)"></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasketItem',
  props: {
    currentOrder: {
      type: Array,
    },
    addToBasket: {
      type: Function,
    },
    proxyAddBasket: {
      type: Function,
    },
    removeOneProduct: {
      type: Function,
    },
    removeFromBasket: {
      type: Function,
    },
    cartItem: {
      type: Object,
    },
  },
  data() {
    return {
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
    };
  },
};
</script>

<style scoped>
.basket-item {
  min-height: 60px;
  padding: 18px 0;
}

.pho-img-wrapper {
  border-radius: 11px;
  overflow: hidden;
  width: 100%;
}

.name {
  font-family: lcm;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  color: #000000;
}

.grey4 {
  color: #BDBDBD;
}

.price {
  font-family: ttbold;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
}

.num-product {
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  padding: 0 11px;
  font-family: lcm;
}

.round-btn {
  background: #E0E0E0;
  color: #828282;
}

.name-modifiers {
  font-family: tr;
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 15px;
  color: #000000;
}
</style>
