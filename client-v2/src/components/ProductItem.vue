<template >
    <div class=" col-md-3 col-sm-6 col-12" >
        <div class="pho-card column mobile-hide" >
            <div class="pho-img-wrapper col-auto">
                <q-img
                        :src="`${API_LINK}${product.photo[0].url}`"
                        :ratio="4/3"
                />
            </div >
            <div class="pho-card-info-area col-grow column justify-between">
                <div class="row justify-between" >
                    <div class="pho-card-product-name">{{product.name}}</div >
                    <div class="pho-card-product-weight">{{product.weight}} гр.</div >
                </div >
                <div class="pho-card-description">
                    {{product.description}}
                </div >
                <div class="row justify-between items-center" >
                    <div class="pho-card-price">
                        {{product.price}} ₽
                    </div >
                    <div>
                        <q-btn flat
                               @click="addProductToBasket(product)"
                               class="pho-btn-med" >
                            <div >
                                {{getName(product.id)}}
                            </div >
                        </q-btn >
                    </div >
                </div >
            </div >
        </div >
        <div class="pho-card-m row desktop-hide" >
            <div class="pho-img-wrapper-row col-5">
                <q-img
                        :src="`${API_LINK}${product.photo[0].url}`"
                        style="height: 100%"
                />
            </div >
            <div class="pho-card-info-area col-7 column justify-between">
                <div class="row justify-between items-center" >
                    <div class="pho-card-product-name col-9">{{product.name}}</div >
                    <div class="pho-card-product-weight col-3">{{product.weight}} гр.</div >
                </div >
                <div class="pho-card-description">
                    {{product.description}}
                </div >
                <div class="row justify-between items-center" >
                    <div class="pho-card-price">
                        {{product.price}} ₽
                    </div >
                    <div>
                        <q-btn flat
                               size="sm"
                               @click="addProductToBasket(product)"
                               class="pho-btn-med" >
                            <div >
                                {{getName(product.id)}}
                            </div >
                        </q-btn >
                    </div >
                </div >
            </div >
        </div >
    </div >
</template >

<script >
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
    },
  },
  data() {
    return {
      API_LINK: process.env.API_LINK,
    };
  },
  methods: {
    ...mapMutations('order', ['addProductToBasket',
      'removeProductToBasket']),
    getName(productId) {
      const searchProduct = this.orderProducts.find((item) => item.id === productId);

      if (searchProduct !== undefined) return `В корзине ${searchProduct.count}`;

      return 'В корзину';
    },
  },
  computed: {
    ...mapState('order', ['orderProducts']),
  },
};
</script >

<style scoped >
    .pho-card {
        background: #FFFFFF;
        box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
        border-radius: 24px;
        overflow: hidden;
        height: 100%;
    }
    .pho-card-m{
        background: #FFFFFF;
        box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.1);
        border-radius: 24px;
        overflow: hidden;
        padding: 7px;
        height: 100%;
    }
    .pho-img-wrapper{
        border-radius: 24px;
        overflow: hidden;
        width: 100%;
    }
    .pho-img-wrapper-row{
        padding: ;
        border-radius: 24px;
        overflow: hidden;
        height: 100%;
    }
    @media (min-width: 500px) {
        .pho-card-info-area{
            padding: 19px;
        }
        .pho-card-product-name {
            font-family: lcb;
            font-size: 18px;
            line-height: 24px;
            color: #4F4F4F;
        }
    }
    @media (max-width: 500px) {
        .pho-card-info-area{
            padding: 4px 10px;
        }
        .pho-card-product-name {
            font-family: lcb;
            font-size: 14px;
            line-height: 14px;
            padding-right:5px;
            padding-bottom: 5px;
            color: #4F4F4F;
        }
    }
    .pho-card-product-weight{
        font-family: lcm;
        font-size: 10px;
        line-height: 19px;
        color: #333333;
    }
    .pho-card-description{
        font-family: lcm;
        padding: 5px 0 10px;
        font-weight: 500;
        font-size: 15px;
        line-height: 20px;

        /* Gray 3 */
        color: #828282;
    }
    .pho-card-price{
        font-family: lcb;
        font-size: 18px;
        line-height: 24px;

        /* Gray 1 */
        color: #333333;
    }
    .pho-btn-med{
        font-family: lcb;
        border-radius: 10px;
        background: #FCD000;
        border: 2px solid #FCD000;
        color: #4F4F4F;
        font-size: 16px;
        text-transform: none;
    }
    .cart-logo{
        width: 22px;
        margin-left: 10px;
    }
    .cart-icon-m{
        width: 15px;
        margin-left: 10px;
    }
</style >
