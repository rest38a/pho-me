<template >
    <div class="row basket-item q-col-gutter-md justify-center items-center">
        <div class="col-2">
            <div class="pho-img-wrapper">
                <q-img
                        :src="`${CLIENT_API_LINK}${product.photo[0].url}`"
                        :ratio="4/3"
                />
            </div>
        </div>
        <div class="col-4 column">
            <div class="name">{{product.name}}</div>
            <div class="grey4">{{product.weight}} гр</div>
        </div>
        <div class="col-3 row items-cente">
                <q-btn flat
                       round
                       class="round-btn"
                       size="xs"
                       icon="remove"
                       @click="removeOneProduct(product)">
                </q-btn>
            <div class="num-product">{{product.count}}</div>
                <q-btn flat
                       class="round-btn"
                       round
                       size="xs"
                       icon="add"
                       @click="addToBasket(product)">
                </q-btn>
        </div>
        <div class="col-2 price">
            {{product.price}} ₽
        </div>
        <div class="col-1">
            <q-btn flat
                   size="xs"
                   round
                   color="grey-5"
                   icon="close" @click="removeFromBasket(product)"></q-btn>
        </div>
    </div>
</template >

<script >
export default {
  name: 'BasketItem',
  props: {
    product: {
      type: Object,
    },
    addToBasket: {
      type: Function,
    },
    removeOneProduct: {
      type: Function,
    },
    removeFromBasket: {
      type: Function,
    },
  },
  data() {
    return {
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
    };
  },
};
</script >

<style scoped >
    .basket-item{
        min-height: 60px;
        padding: 18px  0;
    }
    .pho-img-wrapper{
        border-radius: 11px;
        overflow: hidden;
        width: 100%;
    }
    .name{
        font-family: tr;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 15px;

        color: #000000;
    }
    .grey4{
        color:#BDBDBD;
    }
    .price{
        font-family: ttbold;
    }
    .num-product{
        font-weight: 600;
        font-size: 16px;
        line-height: 22px;
        padding: 0 10px;
    }
    .round-btn{
        background: #E0E0E0;
        color: #828282;
    }
</style >
