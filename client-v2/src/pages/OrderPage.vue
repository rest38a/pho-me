<template >
    <q-page class="main-container" >
<!--        <div class="warning-line">-->
<!--            Внимание! Режим работы доставки 31.12.20 - принимаем заказы до 19:00.-->
<!--            А вот 1.01.21 - принимаем заказы с 14:00.-->
<!--        </div>-->
        <img src="/icons/logo.svg" alt="" class="logo mobile-hide" >
        <div class="header-mobile row desktop-hide items-center" >
            <div class="col-3 q-pa-sm items-center row" >
                <img src="/icons/logo.svg" alt="" class="logo-m" >
            </div >
            <div v-ripple class="cart-widget-m " @click="showMobileCart = !showMobileCart" >
                <img src="/icons/basket.svg" alt="" class="cart-logo" >
                <div class="cart-product-num-m" >{{orderProductsNum}}</div >
            </div >
        </div >
        <div >
            <div v-ripple class="cart-widget mobile-hide" @click="showCart = !showCart" >
                <img src="/icons/basket.svg" alt="" class="cart-logo" >
                <div class="cart-product-num" >{{orderProductsNum}}</div >
            </div >
            <div class="yelow-line mobile-hide" v-if="showCart" >
            </div >
            <div class="shadow-cart mobile-hide" v-if="showCart"
                 @click.stop="showCart = !showCart" >
            </div >
        </div >
        <div class="cart row" v-if="showCart" >
            <div class="col-12 col-md-5 form-area mobile-hide" >
                <q-scroll-area
                        :thumb-style="thumbStyle"
                        :content-style="contentStyle"
                        :content-active-style="contentActiveStyle"
                        style="height: 100%; padding-right: 20px"
                        v-if="!thanks"
                >

                    <div class="cart-h1" >Оформление заказа</div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Имя</div >
                        <q-input
                                :value="order.name"
                                @input="setName"
                                bg-color="white"
                                outlined v-model="text" dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Телефон</div >
                        <q-input
                                :value="order.phone"
                                @input="setPhone"
                                mask="+7 (###) ###-##-##"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Укажите тип оплаты</div >
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="1"
                                 label="Наличные"
                                 color="yellow-14" />
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="2"
                                 label="Карта"
                                 color="yellow-14" />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Адрес</div >
                        <q-input
                                :value="order.address"
                                @input="setAddress"
                                bg-color="white"
                                outlined dense />
                    </div >

                    <div class="pho-pb-2" >
                        <div class="name-field" >Квартира</div >
                        <q-input
                                :value="order.apartment"
                                @input="setApartment"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Кол-во персон</div >
                        <q-input
                                :value="order.forks"
                                @input="setForks"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Время доставки</div >
                        <div class="row items-center" >
                            <div class="col-5" >
                                <q-input
                                        :value="order.time"
                                        @input="setTime"
                                        mask="##:##"
                                        bg-color="white"
                                        outlined dense />
                            </div >
                            <div class="col-grow" >
                                <q-checkbox
                                        :value="order.early"
                                        @input="setEarly"
                                        color="yellow-14"
                                        size="xs" label="Как можно скорее" />
                            </div >
                            <div class="pho-caption" >
                                Доставка в среднем занимает 1,5 часа.<br>
                                Режим работы доставки: с 12:00 по 22:00
                            </div >
                            <div >
                            </div >
                        </div >
                    </div >
                    <div >
                        <div class="name-field" >Комментарий</div >
                        <q-input type="textarea"
                                 class="comment-input"
                                 :value="order.comment"
                                 @input="setComment"
                                 outlined bg-color="white"
                        />
                    </div >
                    <q-banner inline-actions class="text-white bg-red q-my-md" v-if="error" >
                        При отправке заказа произошла ошибка.
                        Попробуйте ещё раз. Если ошибка повториться сообщите пожалуйста нам об этом.
                        <template v-slot:action >
                            <q-btn flat color="white" @click="error = !error" label="ОК" />
                        </template >
                    </q-banner >
                    <q-btn flat style="background: #FCD000; color:#fff" class="full-width q-my-md"
                           @click="sendOrder"
                    >
                        <q-spinner
                                v-if="loading"
                                color="white"
                                size="1em"
                                class="q-mr-md"
                                :thickness="2"
                        />
                        <div class="bold" >
                            Оформить заказ
                        </div >
                        <q-spinner
                                v-if="loading"
                                color="white"
                                size="1em"
                                class="q-ml-md"
                                :thickness="2"
                        />
                    </q-btn >
                </q-scroll-area >
                <div v-else >
                    <h6 class="bold" >Спасибо за заказ!</h6 >
                    <div >
                        В ближайшее время с вами свяжется наш менеджер.
                    </div >
                </div >
            </div >

            <div class="col-12 col-md-7 cart-area mobile-hide" >
                <div class="cart-h1" >
                    Корзина
                </div >
                <q-scroll-area
                        :thumb-style="thumbStyle"
                        :content-style="contentStyle"
                        :content-active-style="contentActiveStyle"
                        style="height: 80%; padding-right: 20px"
                >
                    <div class="column" >

                        <q-separator />
                        <div :key="product.id" v-for="product in orderProducts" >
                            <BasketItem
                                    :addToBasket="addProductToBasket"
                                    :removeFromBasket="removeProductToBasket"
                                    :removeOneProduct="removeOneProduct"

                                    :product="product"
                            ></BasketItem >
                            <q-separator />
                        </div >

                    </div >
                </q-scroll-area >
                <div class="row justify-between items-center" >
                    <div>
                        <q-input
                                :value="order.promocode"
                                @input="setPromoCode"
                                label="Промокод"
                                bg-color="white"
                                outlined dense />
                    </div>
                    <div >
                        <div class="total text-right" >
                            Сумма заказа: <span class="total-sum" >{{totalSum}} ₽</span >
                        </div >
                        <div class="pho-caption" v-if="totalSum < 800">
                            Минимальная сумма заказа от 800 ₽
                        </div >
                    </div >
                </div >
            </div >
        </div >
<!--        <div class="warning-line-mobile">-->
<!--            Внимание! Режим работы доставки 31.12.20 - принимаем заказы до 19:00.-->
<!--            А вот 1.01.21 - принимаем заказы с 14:00.-->
<!--        </div>-->
        <div class="container" >
            <div class="row items-center justify-md-start justify-between" >
                <div class="pho-h1" >
                    Доставка
                </div >
                <div >
                    <q-btn flat style="background: #FCD000; color: #4F4F4F"
                           @click="showMap = !showMap"
                           class="q-ml-lg q-px-sm mobile-hide" >
                        <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm" >
                        <div >
                            Зона доставки
                        </div >
                    </q-btn >
                    <q-btn flat style="background: #FFFFFF; color: #4F4F4F"
                           @click="showMap = !showMap"
                           class="q-ml-lg q-px-sm zone-btm-m desktop-hide" >
                        <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm ballun-m" >
                        <div >
                            Зона<br >
                            доставки
                        </div >
                    </q-btn >
                </div >
            </div >
            <div class="row q-pb-lg" >
                <template v-for="category in categoriesMenu" >
                    <q-btn v-if="activeCategory !== null &&  category.id === activeCategory"
                           @click="chooseCategory(category)"
                           class="pho-btn"
                           flat :key="category.id" >
                        <div >
                            {{category.Name}}
                        </div >
                    </q-btn >
                    <q-btn v-else
                           flat
                           class="pho-btn-outline"
                           @click="chooseCategory(category)"
                           :key="category.id" >
                        <div >
                            {{category.Name}}
                        </div >
                    </q-btn >
                </template >
            </div >
            <div class="row q-col-gutter-md items-stretch content-stretch" >
                <ProductItem :key="product.name" :product="product"
                             v-for="product in activeCategoryProducts" >
                </ProductItem >
            </div >
        </div >
        <q-dialog :full-width="true" v-model="showMobileCart" >
            <q-card style="width: 100%; height: 95%" >
                <div class="col-12 cart-area" >
                    <div class="row justify-between " >
                        <div class="cart-h1 q-py-md" >
                            Корзина
                        </div >
                        <q-btn class="" color="grey-5" size="md"
                               @click="showMobileCart = !showMobileCart"
                               flat icon="close" ></q-btn >
                    </div >
                    <div class="column" >
                        <q-separator />
                        <div :key="product.id" v-for="product in orderProducts" >
                            <BasketItem
                                    :addToBasket="addProductToBasket"
                                    :removeFromBasket="removeProductToBasket"
                                    :removeOneProduct="removeOneProduct"

                                    :product="product"
                            ></BasketItem >
                            <q-separator />
                        </div >
                    </div >
                    <div class="row justify-end" >
                        <div class="total" >
                            Сумма заказа: <span class="total-sum" >{{totalSum}} ₽</span >
                        </div >
                        <div class="pho-caption" v-if="totalSum < 800">
                            Минимальная сумма заказа 800 ₽
                        </div >
                    </div >
                </div >
                <div class="col-12 form-area" v-if="!thanks" >
                    <div class="cart-h1" >Оформление заказа</div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Имя</div >
                        <q-input
                                :value="order.name"
                                @input="setName"
                                bg-color="white"
                                outlined v-model="text" dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Телефон</div >
                        <q-input
                                :value="order.phone"
                                @input="setPhone"
                                mask="+7 (###) ###-##-##"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Укажите тип оплаты</div >
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="1"
                                 label="Наличные"
                                 color="yellow-14" />
                        <q-radio :value="order.payment"
                                 @input="setPayment"
                                 val="2"
                                 label="Карта"
                                 color="yellow-14" />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Адрес</div >
                        <q-input
                                :value="order.address"
                                @input="setAddress"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Квартира</div >
                        <q-input
                                :value="order.apartment"
                                @input="setApartment"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Кол-во персон</div >
                        <q-input
                                :value="order.forks"
                                @input="setForks"
                                bg-color="white"
                                outlined dense />
                    </div >
                    <div class="pho-pb-2" >
                        <div class="name-field" >Время доставки</div >
                        <div class="row items-center" >
                            <div class="col-5" >
                                <q-input
                                        :value="order.time"
                                        @input="setTime"
                                        mask="##:##"
                                        bg-color="white"
                                        outlined dense />
                            </div >
                            <div class="col-grow" >
                                <q-checkbox
                                        :value="order.early"
                                        @input="setEarly"
                                        color="yellow-14"
                                        size="xs" label="Как можно скорее" />
                            </div >
                            <div class="pho-caption" >
                                Доставка в среднем занимает 1,5 часа
                                <br>
                                Режим работы доставки: с 12:00 о 22:00
                            </div >
                            <div >
                            </div >
                        </div >
                    </div >
                    <div class="pho-pb-2">
                        <q-input
                                :value="order.promocode"
                                @input="setPromoCode"
                                label="Промокод"
                                bg-color="white"
                                outlined dense />
                    </div>
                    <div >
                        <div class="name-field" >Комментарий</div >
                        <q-input type="textarea"
                                 class="comment-input"
                                 :value="order.comment"
                                 @input="setComment"
                                 outlined bg-color="white"
                        />
                    </div >
                    <q-banner inline-actions class="text-white bg-red q-my-md" v-if="error" >
                        При отправке заказа произошла ошибка.
                        Попробуйте ещё раз. Если ошибка повториться сообщите пожалуйста нам об этом.
                        <template v-slot:action >
                            <q-btn flat color="white" @click="error = !error" label="ОК" />
                        </template >
                    </q-banner >
                    <q-btn flat style="background: #FCD000; color:#fff" class="full-width q-my-md"
                           @click="sendOrder"
                    >
                        <q-spinner
                                color="white"
                                size="1em"
                                :thickness="2"
                                class="q-mx-md"
                                v-if="loading"
                        />

                        <div class="bold" >
                            Оформить заказ
                        </div >
                        <q-spinner
                                v-if="loading"
                                color="white"
                                size="1em"
                                class="q-mx-md"
                                :thickness="2"
                        />

                    </q-btn >
                </div >
                <div v-else class="form-area" >
                    <h6 class="bold" >Спасибо за заказ!</h6 >
                    <div >
                        Дайте нам пару минут и наш менеджер свяжется с вами.
                    </div >
                    <div >
                        Но если этого не произойдет, звоните по телефону 596-011.
                    </div >
                </div >
            </q-card >
        </q-dialog >
        <q-dialog v-model="showMap" >
            <q-card style="min-width: 80%" >
                <q-card-section >
                    <div class="text-h6" >Зона доставки</div >
                </q-card-section >

                <q-card-section class="q-pt-none" >
                    <div class=" row   ">
                        <div class="row items-center">
                            <div class="yellow-zone ">

                            </div>
                            <div>
                                от 800 руб
                            </div>
                        </div>
                        <div class="row items-center">
                            <div class="blue-zone pl-3">

                            </div>
                            <div>
                                от 1100 руб
                            </div>
                        </div>
                        <div class="row items-center q-ml-md-md">
                            <div class="purple-zone pl-3">

                            </div>
                            <div>
                                от 1400 руб
                            </div>
                        </div>
                        <div class="row items-center">
                            <div class="green-zone pl-3">

                            </div>
                            <div>
                                от 1700 руб
                            </div>
                        </div>
                    </div>
                    <yandex-map :controls="controls"
                                :coords="centerMap"
                                style="width: 100%; height: 600px;"
                                v-if="isMounted"
                                zoom="12"
                    >
                        <ymap-marker :balloon="{
                                        body: item.properties.description
                                     }"
                                     :coords="getPriceZoneCoords(item)"
                                     :key="index"
                                     :marker-fill="{
                                        color: item.properties.fill,
                                        opacity: item.properties['fill-opacity']
                                     }"
                                     :marker-stroke="{
                                        color: item.properties.stroke,
                                        width: item.properties['stroke-width'],
                                        opacity: item.properties['stroke-opacity'],
                                    }"
                                     :markerId="'m' + index"
                                     marker-type="Polygon"
                                     v-for="(item, index) in dsZonesPriced.features"
                        ></ymap-marker >
                        <ymap-marker
                                v-if="coords.length !== 0"
                                :coords="[coords[0], coords[1]]"
                                markerId="42m"
                                marker-type="Placemark"
                        ></ymap-marker >
                        <ymap-marker
                                :coords="[ourDepartment[0], ourDepartment[1]]"
                                markerId="ourMap"
                                hint-content="Pho Me"
                                marker-type="Placemark"
                                :properties="departmentProperty"
                        ></ymap-marker >

                    </yandex-map >
                </q-card-section >

                <q-card-actions align="right" >
                    <q-btn flat label="OK" color="primary" v-close-popup />
                </q-card-actions >
            </q-card >
        </q-dialog >
    </q-page >
</template >

<script >
import { dom } from 'quasar';

const { height } = dom;
import { loadYmap } from 'vue-yandex-maps';
import { mapState, mapMutations, mapGetters } from 'vuex';
import ProductItem from '../components/ProductItem';
import BasketItem from '../components/BasketItem';
import YmapConstructor from '../boot/yandex-map-constructor.json';

export default {
  name: 'OrderPage',
  components: {
    ProductItem,
    BasketItem,
  },
  meta: {
    title: 'Pho me. Доставка из азиатскиого ресторана в Иркутске',
  },
  data() {
    return {
      API_LINK: process.env.CLIENT_API_LINK,
      categories: [],
      products: [],
      activeCategoryProducts: [],
      activeCategory: null,
      showCart: false,
      contentStyle: {
        color: '#555',
      },
      showMap: false,
      showMobileCart: false,
      contentActiveStyle: {
        color: 'black',
      },

      thumbStyle: {
        right: '2px',
        borderRadius: '5px',
        backgroundColor: '#F8C200',
        width: '5px',
        opacity: 0.75,
      },
      height: height - 1,
      isMounted: false,
      dsZonesPriced: YmapConstructor,
      coords: [],
      centerMap: [52.286191, 104.297709],
      ourDepartment: [52.27333480057664, 104.29042273754133],
      loading: false,
      thanks: false,
      error: false,
      departmentProperty: {
        description: 'Наш ресторан',
        iconCaption: 'Фо Ми',
        'marker-color': '#f371d1',
      },
    };
  },
  computed: {
    ...mapState('order', ['order', 'orderProducts', 'orderMenu', 'categoriesMenu']),
    ...mapGetters('order', ['totalSum', 'orderProductsNum']),

  },
  methods: {
    ...mapMutations('order', ['addProductToBasket',
      'removeProductToBasket',
      'setPromoCode',
      'removeOneProduct',
      'setPhone',
      'setAddress',
      'setApartment',
      'setTime',
      'setEarly',
      'setComment',
      'setPayment',
      'setCostume',
      'setName',
      'setForks',
      'setBusinessLunch',
    ]),
    chooseCategory(category) {
      this.activeCategory = category.id;
      const prepareProducts = [...category.products];
      const sortFunction = (a, b) => a.sort_index - b.sort_index;
      this.activeCategoryProducts = prepareProducts.sort(sortFunction);
    },
    reachYandexGoal(name) {
      // eslint-disable-next-line
      yaCounter48434603.reachGoal(name);
    },
    sendOrder() {
      this.loading = true;

      this.$axios.post('https://repairs.rest38.ru/api/phome',
        {
          order: this.order,
          products: this.orderProducts,
        })
        .then(() => {
          this.thanks = true;
          this.loading = false;
          this.reachYandexGoal('thank');
        })
        .then(() => {
          this.$store.dispatch('order/createOrder', this.order);
        })
        .catch((e) => {
          console.log('e', e);
          this.loading = false;
          this.error = true;
        });
    },
    getPriceZoneCoords(item) {
      const result = item.geometry.coordinates[0];

      return [result];
    },
  },
  async mounted() {
    this.$store.dispatch('order/getOrderMenu')
      .then(() => {
        if (this.categoriesMenu[0] !== undefined) {
          this.chooseCategory(this.categoriesMenu[0]);
        }
      });
    this.isMounted = true;
    const settings = {
      apiKey: '7df138bc-f837-4e1b-b1c3-9790e63279b0', lang: 'ru_RU', coordorder: 'latlong', version: '2.1',
    };
    await loadYmap(settings);
    // eslint-disable-next-line
      this.ymapsObj = ymaps;

    this.dsZonesPriced.features.forEach((feature, featureInd) => {
      if (Array.isArray(this.dsZonesPriced.features[featureInd].geometry.coordinates[0])) {
        this.dsZonesPriced.features[featureInd].geometry.coordinates[0].forEach((item, idex) => {
          const temp0 = item[0];
          const temp1 = item[1];
          this.dsZonesPriced.features[featureInd].geometry.coordinates[0][idex][0] = temp1;
          this.dsZonesPriced.features[featureInd].geometry.coordinates[0][idex][1] = temp0;
        });
      }
    });
  },
};
</script >

<style scoped >
    @font-face {
        font-family: lb;
        src: url(../font/TTLakes-Black.ttf);
    }

    .logo {
        padding: 40px 0 0px 40px;
    }

    @media (min-width: 500px) {
        .pho-h1 {
            font-family: 'lb';
            color: #fff;
            font-style: italic;
            font-weight: 900;
            text-transform: uppercase;
            font-size: 90px;
            line-height: 145px;
        }

        .pho-btn {
            font-family: lcb;
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
            font-size: 22px;
        }

        .pho-btn-outline {
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            border: 2px solid #FFFFFF;
            color: #fff;
            font-family: lcb;
            font-size: 22px;
        }

        .pho-btn-outline:hover {
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
        }

        .pho-btn-outline:hover > div {
            color: #4F4F4F;
        }
    }

    @media (max-width: 499px) {
        .container {
            padding-top: 48px;
        }

        .pho-h1 {
            font-family: 'lb';
            color: #fff;
            font-style: italic;
            font-weight: 900;
            font-size: 36px;
        }

        .pho-btn {
            font-family: lcb;
            margin: 10px 10px 0px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
            font-size: 14px;
        }

        .pho-btn-outline {
            margin: 10px 10px 0px 0px;
            border-radius: 10px;
            border: 2px solid #FFFFFF;
            color: #fff;
            font-family: lcb;
            font-size: 14px;
        }

        .pho-btn-outline:hover {
            margin: 10px 10px 10px 0px;
            border-radius: 10px;
            background: #FCD000;
            border: 2px solid #FCD000;
            color: #4F4F4F;
        }

        .pho-btn-outline:hover > div {
            color: #4F4F4F;
        }
    }

    .main-container {
        background: #02BBBD;
        padding-bottom: 100px;
    }

    .container {
    }

    .product-area {
        display: flex;
        flex-direction: row;
    }

    .cart-widget {
        position: fixed;
        width: 95px;
        height: 95px;
        right: 0;
        top: 0;
        background: #CA17A8;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .cart-widget-m {
        position: fixed;
        width: 48px;
        height: 48px;
        right: 0;
        top: 0;
        background: #CA17A8;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .cart-product-num-m {
        position: absolute;
        font-family: lcb;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 4px;
        color: #fff;
        font-size: 9px;
    }

    .cart-product-num {
        position: absolute;
        top: 39%;
        right: 45%;
        font-family: lcb;
        color: #fff;
        font-size: 12px;
    }

    .yelow-line {
        position: fixed;
        width: 95px;
        height: 100%;
        right: 0;
        top: 0;
        background: #F8C200;
        z-index: 100;
    }

    .shadow-cart {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.4;
        z-index: 99;
    }

    @media (min-width: 1000px) {
        .warning-line {
            height: 95px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 0 40px 0 40px;
            background: #FCD000;
            font-family: lcb;
            font-weight: 500;
            color: #CA17A8;
            font-size: 22px;
        }
        .warning-line-mobile{
            display: none;
        }
        .cart {
            z-index: 100;
            position: fixed;
            right: 95px;
            top: 0;
            width: 50%;
            min-width: 900px;
            max-width: 100%;
            height: 100%;
            background: #fff;
        }

        .cart-area {
            padding: 32px;
        }

        .form-area {
            padding: 32px 16px 32px 53px;
            background: #FAFAFA;

        }

    }

    @media (max-width: 999px) {
        .warning-line{
            display: none;
        }
        .warning-line-mobile{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            padding: 65px 20px 20px 20px;
            background: #FCD000;
            color: #CA17A8;
            font-family: lcb;
            font-weight: 500;
            margin-bottom: -35px;
        }
        .cart {
            position: fixed;
            z-index: 100;
            padding-top: 48px;
            top: 48px;
            width: 100%;
            max-width: 100%;
            background: #fff;
        }

        .form-area {
            padding: 32px 15px 32px 15px;
            background: #FAFAFA;

        }

        .cart-area {
            padding: 10px;
        }

    }

    .cart-h1 {
        font-family: 'lb';
        font-style: italic;
        font-size: 24px;
        line-height: 32px;
    }

    .total {
        font-size: 16px;
        line-height: 22px;
        color: #828282;
    }

    .total-sum {
        font-size: 24px;
        line-height: 32px;
        font-family: lcb;
        padding-left: 20px;
        color: #333333;
    }

    .name-field {
        color: #4F4F4F;
        padding-bottom: 2px;
        font-weight: 500;
    }

    .comment-input {
        height: 77px;

        background: #FFFFFF;
        box-sizing: border-box;
        resize: none;
    }

    .pho-caption {
        font-size: 12px;
        line-height: 16px;

        /* Gray 4 */
        color: #BDBDBD;
    }

    .pho-pb-2 {
        padding-bottom: 13px;
    }

    .ballun-m {
        width: 15px;
    }

    .zone-btm-m {
        text-transform: none;
        font-size: 12px;
        line-height: 12px;
        border-radius: 10px;
    }

    .header-mobile {
        z-index: 100;
        width: 100%;
        height: 48px;
        position: fixed;
        background: #F8C200;
    }

    .logo-m {
        width: 100%;
    }
    .yellow-zone{
        width: 50px;
        height: 30px;
        border-radius: 20px;
        background: #ffd21e;
        margin:20px 10px 20px 0;
    }
    .blue-zone{
        width: 50px;
        height: 30px;
        border-radius: 20px;
        background: #82cdff;
        margin: 20px 10px 20px 20px;
    }
    .purple-zone{
        width: 50px;
        height: 30px;
        border-radius: 20px;
        background: #f371d1;
        margin: 20px 10px 20px 0px;
    }
    .green-zone{
        width: 50px;
        height: 30px;
        border-radius: 20px;
        background: #56db40;
        margin: 20px 10px 20px 20px;
    }
</style >
