<template>
  <q-page class="main-container">
    <!--        <div class="warning-line">-->
    <!--            Внимание! Режим работы доставки 31.12.20 - принимаем заказы до 19:00.-->
    <!--            А вот 1.01.21 - принимаем заказы с 14:00.-->
    <!--        </div>-->
    <img src="/icons/logo.svg" alt="" class="logo mobile-hide"
         @click="goToRest"/>
    <div class="row desktop-hide items-center">
      <!-- <div class="col-3 q-pa-sm items-center row">
        <img src="/icons/logo.svg" alt="" class="logo-m" />
      </div> -->
    </div>
    <div>
      <!-- <div class="yelow-line" v-if="showCart"></div> -->
      <div
        v-ripple
        class="cart-widget"
        :class="{
          active: orderProductsNum >= 0,
          noActive: orderProductsNum <= 0,
        }"
        @click="showCart = !showCart"
      >
        <img
          src="/icons/basket.svg"
          alt=""
          class="cart-logo form-area-display"
        />
        <img
          src="/icons/cartmob.png"
          alt=""
          class="cart-logo display-none-class"
        />
        <div class="cart-product-num">
          {{ orderProductsNum }}
        </div>
      </div>
      <div
        v-if="showCart"
        class="shadow-cart"
        @click.stop="showCart = !showCart"
      />
    </div>
    <right-navigate-order-page/>
    <!-- корзина-->
    <div v-if="showCart" class="cart row col-8 col-lg-5">
      <div class="close-basket col-xs-0 col-1 q-pl-md-lg"
           v-if="showCart"
           v-show="windowWidth > 1023"
      @click="showCart = !showCart">
        <img src="../assets/icon/closeBasket.png">
      </div>
      <div
        class="col-md-5 col-sm-12 form-area"
        :class="{
          'col-xs-12': ordering === false,
          'form-area-display': ordering === true,
        }"
      >
        <div
          class=""
          :class="{
            'display-none-class': ordering === true,
            'row justify-between items-center content-center vertical-line absolute-top':
              ordering === false,
          }"
        >
          <div class="col-auto">
            <q-btn
              class=""
              color="grey-5"
              size="md"
              flat
              @click="toShowRegistrationOrder"
            >
              <img class="" src="../assets/image/returnButton.png"/>
            </q-btn>
          </div>
          <div class="col-auto justify-center">
            <div class="cart-h1">
              Оформление заказа
            </div>
          </div>
          <div class="col-1"/>
        </div>

        <div
          v-if="showAddress"
          :class="{
            'display-none-class': ordering === true,
            'row justify-between items-center content-center vertical-line absolute-top':
              ordering === false,
          }"
        >
          <div class="col-auto">
            <img
              src="../assets/image/returnButton.png"
              @click="showAddress = !showAddress"
            />
          </div>
          <div class="col-auto cart-h1 justify-center">
            Адрес доставки
          </div>
          <div col-auto/>
        </div>

        <q-scroll-area
          v-if="!thanks"
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 100%; padding-right: 20px"
        >
          <div
            v-if="!showAddress"
            class="cart-h1"
            :class="{
              '': ordering === true,
              'form-area-display': ordering === false,
            }"
          >
            Оформление заказа
          </div>
          <div
            v-if="showAddress"
            class=""
            :class="{
              'cart-h1': ordering === true,
              'form-area-display': ordering === false,
            }"
          ><img
            src="../assets/image/returnButtonBlack.svg"
            @click="showAddress = !showAddress"
            class="q-mr-sm"
            style="cursor: pointer"
          />
            Адрес доставки
          </div>
          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field name-field-first">
              Имя
            </div>
            <q-input
              :value="currentOrder.clientInfo.client.name"
              bg-color="white"
              outlined
              dense
              placeholder="Введите имя"
              @input="setName"
            /><!--
              v-model="text" //вызывает ошибки
              -->
          </div>
          <div class="pho-pb-2">
            <div v-if="!showAddress" class="name-field">
              Телефон
            </div>
            <q-input
              v-if="!showAddress"
              :value="currentOrder.clientInfo.phone"
              mask="+7 (###) ###-##-##"
              unmasked-value
              bg-color="white"
              outlined
              dense
              placeholder="+7 (___)-___-__-__"
              @input="setPhone"
            />
          </div>
          <div v-if="!showAddress" class="row button-box">
            <div class="row col-12">
              <q-btn-group spread class="row col-12 pho-btn-delivery-group">
                <q-btn
                  v-for="item in deliveryTypeButton"
                  :key="item.type"
                  flat
                  class="pho-btn pho-btn-delivery col-6"
                  :class="{ active: item === activeDeliveryTypeButton }"
                  no-caps
                  @click="changeDeliveryType(item)"
                >
                  <div>{{ item.type }}</div>
                </q-btn>
              </q-btn-group>
            </div>
          </div>
          <div v-if="showAddressInput">
            <div
              v-if="!showAddress"
              class="pho-pb-2 address-animation"
              :class="{
                active: showAddressInput === true,
                noActive: showAddressInput === false,
              }"
            >
              <div class="row name-field">
                <div class="col-6">
                  Адрес доставки
                </div>
                <div
                  class="col-6 row items-baseline justify-end"
                  @click="showMap = !showMap"
                >
                  <img
                    src="/icons/location-baloon.svg"
                    class="q-mr-xs baloon-order"
                  />
                  <div class="cursor">
                    Зона доставки
                  </div>
                </div>
              </div>
              <div class="q-mb-sm pseudo-input" @click="showCardAddress">
                <span>{{ currentOrder.clientInfo.addressString }}</span>
              </div>
            </div>
          </div>
          <div v-if="showAddress" class="pho-pb-2">
            <div class="name-field col-6">
              Улица, № дома
            </div>
            <input-adress
              :input-value="currentOrder.clientInfo.addressString"
              :get-price-zone-coords="getPriceZoneCoords"
              :input-func="updateClientAddressString"
              :options="addressHint"
              :valid="hasAddress"
              :has-house="hasHouse"
              :is-in-additional-zone="isInAdditionalZone"
              :start-break="startBreak"
              :finish-break="finishBreak"
              :is-in-zone="isInZone"
            />
          </div>
          <div v-if="showAddress" class="row col-12">
            <div class="pho-pb-2 col-12">
              <div class="name-field">
                Квартира
              </div>
              <div class="row items-center q-col-gutter-md">
                <div class="col-6">
                  <q-input
                    :value="currentOrder.clientInfo.address.apartment"
                    bg-color="white"
                    outlined
                    dense
                    :disable="apartmentDisabled"
                    @input="setApartment"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    v-model="apartmentDisabled"
                    :value="currentOrder.clientInfo.address.apartment"
                    color="yellow-14"
                    size="xs"
                    label="Частный дом"
                    @input="setApartment('')"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div v-if="showAddress" class="pho-pb-2 col-6">
              <div class="name-field">
                Этаж
              </div>
              <div class="col-5">
                <q-input
                  :value="currentOrder.clientInfo.address.floor"
                  bg-color="white"
                  outlined
                  dense
                  :disable="apartmentDisabled"
                  @input="setFloor"
                />
              </div>
            </div>
            <div v-if="showAddress" class="pho-pb-2 col-6">
              <div class="name-field">
                Подъезд
              </div>
              <div class="col-5">
                <q-input
                  :value="currentOrder.clientInfo.address.entrance"
                  bg-color="white"
                  outlined
                  dense
                  :disable="apartmentDisabled"
                  @input="setEntrance"
                />
              </div>
            </div>
          </div>
          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field">
              Кол-во персон
            </div>
            <q-input
              :value="currentOrder.forks"
              bg-color="white"
              outlined
              dense
              @input="setForks"
            />
          </div>
          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field">
              Время доставки
            </div>
            <div v-if="!showAddress" class="row button-box button-box-time">
              <div class="row col-12">
                <q-btn-group spread class="row col-12 pho-btn-delivery-group">
                  <q-btn
                    v-for="item in deliveryTimeButton"
                    :key="item.type"
                    flat
                    class="pho-btn pho-btn-delivery col-6"
                    :class="{ active: item === activeDeliveryTimeButton }"
                    no-caps
                    @click="changeDeliveryTime(item)"
                  >
                    <div>{{ item.type }}</div>
                  </q-btn>
                </q-btn-group>
              </div>
            </div>
          </div>
          <div
            v-if="!showTimeInput"
            class="row items-center time-animation"
            :class="{
              active: showTimeInput === false,
              noActive: showTimeInput === true,
            }"
          >
            <div v-if="!showAddress" class="col-12">
              <q-input
                :value="currentOrder.deliveryInfo.time"
                mask="##:##"
                bg-color="white"
                outlined
                dense
                placeholder="00:00"
                @input="setTime"
              >
                <template v-slot:prepend>
                  <q-icon name="schedule"/>
                </template>
              </q-input>
            </div>
            <div v-if="!showAddress" class="pho-caption">
              <!-- Доставка в среднем занимает 1,5 часа.<br />
                Режим работы доставки: с 12:00 по 22:00 -->
              Среднее время доставки - 90 минут.
            </div>
            <div/>
          </div>
          <div v-if="!showAddress" class="name-field">
            Способ оплаты
          </div>
          <div v-if="!showAddress" class="row button-box">
            <div class="row col-12">
              <q-btn-group spread class="row col-12 pho-btn-delivery-group">
                <q-btn
                  v-for="item in deliveryPayButton"
                  :key="item.type"
                  flat
                  :val="PAIMENT_TYPES.CASH"
                  class="pho-btn pho-btn-delivery col"
                  :class="{ active: item === activeDeliveryPayButton }"
                  no-caps
                  @click="changeDeliveryPay(item)"
                >
                  <div>{{ item.type }}</div>
                </q-btn>
              </q-btn-group>
            </div>
          </div>
          <div v-if="showAddress">
            <div class="name-field">
              Комментарий к адресу
            </div>
            <q-input
              type="textarea"
              class="comment-input"
              :value="currentOrder.comment"
              outlined
              bg-color="white"
              @input="setComment"
            />
          </div>
          <q-banner
            v-if="error"
            inline-actions
            class="text-white bg-red q-my-md"
          >
            При отправке заказа произошла ошибка. Попробуйте ещё раз. Если
            ошибка повториться сообщите пожалуйста нам об этом.
            <template v-slot:action>
              <q-btn flat color="white" label="ОК" @click="error = !error"/>
            </template>
          </q-banner>
          <q-btn
            v-if="!showAddress"
            flat
            style="background: #ca17a8; color: #fff"
            class="full-width q-my-md"
            @click="proxySendOrder('top')"
          >
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-mr-md"
              :thickness="2"
            />
            <div class="bold">
              Оформить заказ
            </div>
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-ml-md"
              :thickness="2"
            />
          </q-btn>
<!--          <template v-if="currentOrder.clientInfo.address.dadata === null">-->
<!--          <q-btn-->
<!--            v-if="showAddress"-->
<!--            flat-->
<!--            style="background: #fcd000; color: #fff"-->
<!--            class="full-width q-my-md"-->
<!--            @click="showCardAddress"-->
<!--          >-->
<!--            <div class="bold">-->
<!--              Назад-->
<!--            </div>-->
<!--          </q-btn>-->
<!--          </template>-->

          <q-btn
            v-if="showAddress"
            flat
            style="background: #fcd000; color: #fff"
            class="full-width q-my-md"
            @click="toExitAddressForm"
            :disable="addressDisadble"
          >
            <div class="bold">
              Сохранить
            </div>
          </q-btn>

        </q-scroll-area>
        <div v-else>
          <h6 class="bold">
            Спасибо за заказ!
          </h6>
          <div>В ближайшее время с вами свяжется наш менеджер.</div>
        </div>
      </div>
      <div
        class="col-12 col-md-6 col-sm-12 cart-area"
        :class="{
          'col-sm-12': ordering === true,
          'form-area-display': ordering === false,
        }"
      >
        <div
          class="row justify-between items-center content-center vertical-line"
        >
          <div class="col-auto">
            <q-btn
              class=""
              color="grey-5"
              size="md"
              flat
              @click="showCart = !showCart"
            >
              <img class="" src="../assets/image/returnButton.png"/>
            </q-btn>
          </div>
          <div class="col-auto justify-center">
            <div class="cart-h1">
              Корзина
            </div>
          </div>
          <div class="col-1"/>
        </div>

        <div class="cart-h1 form-area-display">
          Корзина
        </div>

        <div
          class=" display-none-class col-12 q-mb-sm"
        >
          <q-input
            :value="promoCode.value"
            label="Ввести промокод"
            bg-color="white"
            :disable="promoInputDisabled"
            outlined
            dense
            class="col-grow"
            @input="setPromoCode"
          />
          <q-btn
            v-if="hidePromoButton === true"
            flat
            size="md"
            class="pho-btn pho-btn-med-promo col-3"
            no-caps
            unelevated
            @click="usePromoCode('top')"
          >
            <div>Применить</div>
          </q-btn>
          <q-btn
            v-if="hidePromoButton === false"
            flat
            size="md"
            class="pho-btn pho-btn-med-promo col-3"
            no-caps
            unelevated
            @click="removePromoFromBasket()"
          >
            <div>Отменить</div>
          </q-btn>
          <div>{{ promoNotification }}</div>
        </div>

        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 80%; padding-right: 20px"
        >
          <div class="q-pr-xs-md">
            <q-separator/>
            <div v-for="cartItem in orderProducts" :key="cartItem.id">
              <BasketItem
                :add-to-basket="addProductToBasket"
                :remove-from-basket="removeProductToBasket"
                :remove-one-product="removeOneProduct"
                :cart-item="cartItem"
                :order-products="orderProducts"
              />
              <q-separator/>
            </div>
          </div>
        </q-scroll-area>
        <additional-sale
          :add-to-basket="addProductToBasket"
        />
        <div class="row justify-between items-center col-12">
          <div class="row form-area-display col-12 q-pr-lg">
            <q-input
              :value="promoCode.value"
              label="Ввести промокод"
              bg-color="white"
              :disable="promoInputDisabled"
              outlined
              dense
              @input="setPromoCode"
              class="col-grow"
            />
            <q-btn
              v-if="hidePromoButton === true"
              flat
              size="md"
              class="pho-btn pho-btn-med-promo col-3"
              no-caps
              unelevated
              @click="usePromoCode('top')"
            >
              <div>Применить</div>
            </q-btn>
            <q-btn
              v-if="hidePromoButton === false"
              flat
              size="md"
              class="pho-btn pho-btn-med-promo col-3"
              no-caps
              unelevated
              @click="removePromoFromBasket()"
            >
              <div>Отменить</div>
            </q-btn>
          </div>
          <div class="col-12 q-pr-lg q-xs-none">
            <div class="cart-h1 text-right"
                 v-if="currentOrder.deliveryInfo.type === 2">Скидка за самовывоз 15%</div>
            <div class="total text-right"
            v-if="currentOrder.deliveryInfo.type === 2">
              Сумма заказа:<span class="total-sum">{{ totalSum - (totalSum / 100 * 15)}} ₽</span>
            </div>
            <div v-else class="total text-right">
              Сумма заказа:<span class="total-sum">{{ totalSum }} ₽</span>
            </div>
            <div v-if="currentOrder.deliveryInfo.type === 1">
            <div v-if="totalSum < 800" class="pho-caption text-right">
              Минимальная сумма заказа от 800 ₽
            </div>
          </div>
          </div>
        </div>
        <q-btn
          v-if="!showAddress"
          flat
          style="background: #ca17a8; color: #fff"
          class="full-width create-order-button absolute-bottom q-mb-lg"
          @click="toShowRegistrationOrder"
        >
          <div class="bold">
            К оформлению заказа
          </div>
        </q-btn>
      </div>
    </div>
    <!--        <div class="warning-line-mobile">-->
    <!--            Внимание! Режим работы доставки 31.12.20 - принимаем заказы до 19:00.-->
    <!--            А вот 1.01.21 - принимаем заказы с 14:00.-->
    <!--        </div>-->
    <div class="container">
      <div class="row items-center justify-md-start justify-between">
        <div class="pho-h1 form-area-display q-pr-lg">
          ДОСТАВКА
        </div>
        <div class="pho-h1 display-none-class q-pr-md">
          Доставка
        </div>
        <div>
          <q-btn
            flat
            class="column q-ml-lg q-px-sm pho-btn pho-btn-delivery-zones"
            no-caps
            @click="showMap = !showMap"
          >
            <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm"/>
            <div>Зона доставки</div>
          </q-btn>
        </div>
      </div>
      <!-- главная страница -->
      <div class="carousel-box form-area-display">
        <q-carousel
          :height="heightSlider"
          v-model="slide"
          animated
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            class="q-pa-none carousel-slide-image"
            :name="index"
            v-for="(promo, index) in promotionsDelivery" :key="promo.index"
            :img-src="`${CLIENT_API_LINK}/uploads/${promo.image}`"
          >
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="carousel-box display-none-mobile">
        <q-carousel
          :height="heightSlider"
          v-model="slide"
          animated
          swipeable
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            class="carousel-slide-image"
            :name="index"
            :img-src="`${CLIENT_API_LINK}/uploads/${promo.preview}`"
            v-for="(promo, index) in promotionsDelivery" :key="promo.index"
          ></q-carousel-slide>
        </q-carousel>
      </div>
      <div class="row q-pb-md form-area-display">
        <template v-for="category in categoriesMenu">
          <q-btn
            :id="category.id"
            :key="category.id"
            class="pho-btn"
            :class="{
              '': activeCategory !== null && category.id === activeCategory,
              'pho-btn-outline': category.id !== activeCategory,
            }"
            flat
            no-caps
            @click="chooseCategory(category)"
          >
            <div>
              {{ category.name }}
            </div>
          </q-btn>
        </template>
      </div>
      <div class="justify-center row q-mt-lg"  v-if="loadProductItem === false">
      <q-spinner
        color="white"
        size="10em"
      />
      </div>
      <div
        class="row q-col-gutter-md items-stretch content-stretch form-area-display"
      >
        <ProductItem
          v-for="product in activeCategoryProducts"
          :key="product.name"
          :product="product"
        />
      </div>
      <div class="row mobile-menu-scroll flex-md-block no-wrap display-none-class"
           v-show="windowWidth < 1023"
           id="mobile-menu-scroll"
           :style="{left: `${scrollMobileOffset}px`}">
        <template v-for="category in categoriesMenu">
          <q-btn
            :id="category.id"
            :key="category.id"
            class="pho-btn"
            :class="{
              'active-category': category.id === activeCategory,
              'pho-btn-outline': category.id !== activeCategory,
            }"
            flat
            no-caps
            @scroll="scroll"
            @click="chooseCategory(category)"
          >
            <div>
              <nobr>{{ category.name }}</nobr>
            </div>
          </q-btn>
        </template>
      </div>
      <div
        class="display-none-mobile"
      >
        <div
          v-for="category in categoriesMenu"
          :id="category.name"
          :key="category.id"
        >
          <div class="mobile-category-text">
            {{ category.name }}
          </div>
          <div class="row q-col-gutter-md items-stretch content-stretch">
            <ProductItem
              v-for="product in category.products"
              :key="product.name"
              :product="product"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- зона доставки -->
    <q-dialog v-model="showMap"
              :maximized="true">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Зона доставки
          </div>

          <div class="row justify-between">
            <div class="row items-center q-my-sm">
              <div class="yellow-zone q-mr-sm"/>
              <div>от 800 руб</div>
            </div>
            <div class="row items-center q-my-sm">
              <div class="blue-zone pl-3 q-mr-sm"/>
              <div>от 1100 руб</div>
            </div>
            <div class="row items-center q-my-sm">
              <div class="purple-zone pl-3 q-mr-sm"/>
              <div>от 1400 руб</div>
            </div>
            <div class="row items-center q-my-sm">
              <div class="green-zone pl-3 q-mr-sm"/>
              <div>от 1700 руб</div>
            </div>
          </div>
          <div class="row">
          <yandex-map
            v-if="isMounted"
            :coords="centerMap"
            :style="{height: `${yandexMapHeight}px`}"
            style="width: 100%"
            zoom="12"
          >
            <ymap-marker
              v-for="(item, index) in dsZonesPriced.features"
              :key="index"
              :balloon="{
                body: item.properties.description,
              }"
              :coords="getPriceZoneCoords(item)"
              :marker-fill="{
                color: item.properties.fill,
                opacity: item.properties['fill-opacity'],
              }"
              :marker-stroke="{
                color: item.properties.stroke,
                width: item.properties['stroke-width'],
                opacity: item.properties['stroke-opacity'],
              }"
              :marker-id="'m' + index"
              marker-type="Polygon"
            />
            <ymap-marker
              v-if="coords.length !== 0"
              :coords="[coords[0], coords[1]]"
              marker-id="42m"
              marker-type="Placemark"
            />
            <ymap-marker
              :coords="[ourDepartment[0], ourDepartment[1]]"
              marker-id="ourMap"
              hint-content="Pho Me"
              marker-type="Placemark"
              :properties="departmentProperty"
            />
          </yandex-map>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="OK" color="primary"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <my-footer/>
  </q-page>
</template>

<script>
import { dom, scroll } from 'quasar';

const { height } = dom;
const { getScrollTarget, setScrollPosition } = scroll;
import Vue from 'vue'; // vue
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);
import { loadYmap } from 'vue-yandex-maps';
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import ProductItem from '../components/ProductItem';
import BasketItem from '../components/BasketItem';
import InputAdress from '../components/inputAdress.vue';
import RightNavigateOrderPage from '../components/navigation/RightNavigateOrderPage.vue';
import AdditionalSale from '../components/AdditionalSale.vue';
import myFooter from '../components/footer';

export default {
  name: 'OrderPage',
  components: {
    ProductItem,
    BasketItem,
    InputAdress,
    RightNavigateOrderPage,
    AdditionalSale,
    myFooter,
  },
  preFetch({ store }) {
    return store.dispatch('order/getOrderMenu');
  },
  meta: {
    title: 'Pho me. Доставка из азиатского ресторана в Иркутске',
  },
  data() {
    return {
      API_LINK: process.env.CLIENT_API_LINK,
      CLIENT_API_LINK: process.env.CLIENT_API_LINK,
      PAIMENT_TYPES: process.env.PAIMENT_TYPES,
      slide: 1,
      autoplay: true,
      paymentRadio: '',
      addressDisadble: false,
      deliveryInputDisabled: false,
      promoInputDisabled: false,
      apartmentDisabled: false,
      hidePromoButton: true,
      addressHint: [],
      startBreak: new Date(1989, 5, 26, 17, 0, 0, 0),
      finishBreak: new Date(1989, 5, 26, 19, 30, 0, 0),
      isInZone: true,
      isInAdditionalZone: false,
      categories: [],
      products: [],
      activeCategoryProducts: [],
      activeCategory: null,
      promotionsDelivery: [],
      scrollPosition: null,
      activePromo: null,
      showCart: false,
      showAddress: false,
      activeDeliveryTypeButton: null,
      activeDeliveryTimeButton: null,
      activeDeliveryPayButton: null,
      toShowRegistrationButton: true,
      ordering: true,
      showTimeInput: true,
      showAddressInput: true,
      maximizedToggle: true,
      heightSlider: '',
      windowWidth: null,
      scrollMobileOffset: 0,
      promoNotification: null,
      deliveryTimeButton: [
        {
          type: 'Как можно скорее',
        },
        {
          type: 'Указать время',
        },
      ],
      deliveryTypeButton: [
        {
          type: 'Доставка',
        },
        {
          type: 'Самовывоз',
        },
      ],
      deliveryPayButton: [
        {
          type: 'Наличные',
        },
        {
          type: 'Карта',
        },
        // {
        //  type: 'На сайте',
        // },
      ],
      backgroundBasket: '',
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
      yandexMapHeight: '',
      isMounted: false,
      coords: [],
      centerMap: [52.286191, 104.297709],
      ourDepartment: [52.27333480057664, 104.29042273754133],
      loading: false,
      loadProductItem: false,
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
    ...mapState('order', [
      'order',
      'orderProducts',
      'orderMenu',
      'categoriesMenu',
      'currentOrder',
      'promoCode',
      'promoCodes',
    ]),
    ...mapState('promotions', [
      'promotions',
    ]),
    ...mapGetters('order', [
      'totalSum',
      'orderProductsNum',
      'hasAddress',
      'hasHouse',
      'isAddressInZone',
      'isValidPhone',
    ]),
    ...mapState('contacts', ['contacts', 'dsZonesPriced']),
  },
  methods: {
    ...mapActions('order', [
      'getAddressHints',
      'getCoordsByString',
      'sendOrder',
    ]),
    ...mapMutations('order', [
      'addProductToBasket',
      'removeProductToBasket',
      'setPromoCode',
      'setPromoCodeProduct',
      'removeOneProduct',
      'setPhone',
      'setAddress',
      'setAddressString',
      'setAddressDadata',
      'setApartment',
      'setTime',
      'setEarly',
      'setComment',
      'setPayment',
      'setCostume',
      'setName',
      'setForks',
      'setBusinessLunch',
      'setPromoCode',
      'switchPaymentType',
      'switchDeliveryType',
      'setPaymentSumm',
      'setDate',
      'addProducts',
      'setEntrance',
      'setFloor',
      'catchDefaultState',
      'setDefaultState',
    ]),
    sayThanks() {
      this.thanks = false;
    },
    slideHeight() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 1023) {
        const containers = document.getElementsByClassName('container');
        if (containers.length) {
          const containerWidth = containers[0].clientWidth;
          const newHeight = (this.windowWidth - (this.windowWidth - containerWidth + 30)) / 2.7;
          this.heightSlider = `${newHeight}px`;
        }
      } else {
        const containers = document.getElementsByClassName('container');
        if (containers.length) {
          const containerWidth = containers[0].clientWidth;
          const newHeight = (this.windowWidth - (this.windowWidth - containerWidth + 210)) / 3.3;
          this.heightSlider = `${newHeight}px`;
        }
      }
    },
    goToRest() {
      this.$router.push({ path: '/main/' });
    },
    scroll() {
      const scrollTop = window.pageYOffset;
      const categories = document.getElementsByClassName(
        'mobile-category-text',
      );
      for (let i = 0; i < categories.length; i += 1) {
        const { id } = this.categoriesMenu[i];
        const categoryArea = document.getElementById(
          this.categoriesMenu[i].name,
        );
        if (
          categories[i].offsetTop <= scrollTop + 300
          && categories[i].offsetTop + categoryArea.offsetHeight
          > scrollTop + 180
          && scrollTop !== 0
        ) {
          this.activeCategory = id;
          const activeCategoryClass = document.getElementsByClassName(
            'active-category',
          );
          this.scrollMobileOffset = activeCategoryClass[0].offsetLeft;
          const el = document.getElementById(
            'mobile-menu-scroll',
          );
          el.scrollLeft = this.scrollMobileOffset - 25;
        }
      }
    },
    changeDeliveryTime(item) {
      this.activeDeliveryTimeButton = item;
      if (item.type === 'Как можно скорее') {
        this.showTimeInput = true;
        this.setEarly(true);
      } else if (item.type === 'Указать время') {
        this.setEarly(false);
        this.showTimeInput = false;
      }
    },
    changeDeliveryType(item) {
      this.activeDeliveryTypeButton = item;
      const deliveryType = 1;
      const pickupType = 2;
      if (item.type === 'Доставка') {
        this.switchDeliveryType(deliveryType);
        this.deliveryInputDisabled = false;
        this.showAddressInput = true;
      } else if (item.type === 'Самовывоз') {
        this.switchDeliveryType(pickupType);
        this.deliveryInputDisabled = true;
        this.showAddressInput = false;
      }
    },
    changeDeliveryPay(item) {
      this.activeDeliveryPayButton = item;
      if (item.type === 'Наличные') {
        this.switchPaymentType({ id: 1 });
      } else if (item.type === 'Карта') {
        this.switchPaymentType({ id: 2 });
      } else if (item.type === 'На сайте') {
        this.switchPaymentType({ id: 3 });
      }
    },
    showCardAddress() {
      if (this.deliveryInputDisabled === false) {
        this.showAddress = !this.showAddress;
      }
    },
    toExitAddressForm() {
      if (this.currentOrder.clientInfo.address.apartment != null
        && this.currentOrder.clientInfo.addressString != null) {
        this.addressDisadble = !this.addressDisadble;
        this.showCardAddress();
        this.addressDisadble = !this.addressDisadble;
      } else {
        this.createNotify(
          'Выберите квартиру или частный дом',
        );
      }
    },
    toShowRegistrationOrder() {
      this.toShowRegistrationButton = !this.toShowRegistrationButton;
      this.ordering = !this.ordering;
    },
    chooseCategory(category) {
      this.activeCategory = category.id;
      const prepareProducts = [...category.products];
      this.products = [...category.products];
      const sortFunction = (a, b) => a.sort_index - b.sort_index;
      this.activeCategoryProducts = prepareProducts.sort(sortFunction);
      if (window.innerWidth < 1023) {
        const scrollTop = window.pageYOffset;
        if (scrollTop !== 0) {
          const el = document.getElementById(category.name);
          const scrollTarget = getScrollTarget(el);
          setScrollPosition(scrollTarget, el.offsetTop - 150, 200);
        } else {
          window.scrollTo({
            top: 1,
          });
          console.log(scrollTop);
        }
      }
    },
    reachYandexGoal(name) {
      // eslint-disable-next-line
      yaCounter48434603.reachGoal(name);
    },
    usePromoCode(position) {
      const result = this.promoCodes.filter(
        (item) => item.value === this.promoCode.value,
      );
      if (result.length === 0) {
        this.createNotify('Промокод не найден');
      } else this.checkPromoCode(result[0], position);
    },
    checkPromoCode(result) {
      const date = new Date();
      const limitDate = Date.parse(result.date_finish) - Date.parse(date);
      const filterOrder = this.orderProducts.filter(
        (item) => item.isGift === true,
      );
      if (
        result.min_sum <= this.totalSum
        && limitDate >= 0
        && filterOrder[0] === undefined
        && this.showAddressInput === true
      ) {
        this.setPromoCodeProduct(result.product);
        this.addPromocode(result, result.product);
        this.createNotifyPositive('Промокод добавлен');
        this.promoInputDisabled = true;
        this.hidePromoButton = false;
      } else if (result.min_sum > this.totalSum) {
        this.createNotify('Сумма меньше заявленной в акции');
      } else if (this.showAddressInput === false) {
        this.createNotify(
          'К сожалению, промокод нельзя добавить в заказ самовывозом',
        );
      } else if (filterOrder[0].number + 1 > 1) {
        this.createNotify('Можно добавить только один промокод');
      } else this.createNotify('Промокод не найден');
    },
    addPromocode(result, product) {
      const cartItemPromo = {
        id: `${result.id} ${product.id}`,
        finalPrice: '',
        comment: 'ПОДАРОК',
        product: this.promoCode.product,
        number: 1,
        isGift: true,
      };
      cartItemPromo.finalPrice = product.base_price - (product.base_price / 100) * result.discount;
      this.addProductToBasket(cartItemPromo);
    },
    removePromoFromBasket() {
      this.promoInputDisabled = false;
      this.hidePromoButton = true;
      const filterOrder = this.orderProducts.filter(
        (item) => item.isGift === true,
      );
      this.removeProductToBasket(filterOrder[0]);
    },
    getPriceZoneCoords(item) {
      const result = item.geometry.coordinates[0];
      return [result];
    },
    async updateClientAddressString(e) {
      this.addressHint = await this.getAddressHints(e.target.value);
    },
    isTimeInBreak(checkTime) {
      let prepareTime = checkTime;
      if (typeof prepareTime === 'string') {
        const minutes = prepareTime.split(':')[1];
        const hours = prepareTime.split(':')[0];
        prepareTime = new Date(1989, 5, 26, hours, minutes, 0, 0);
      }
      const checkHour = prepareTime.getHours();
      const checkMinuts = prepareTime.getMinutes();
      const isLessFinishBreak = (checkHour === this.finishBreak.getHours()
        && checkMinuts < this.finishBreak.getMinutes())
        || checkHour < this.finishBreak.getHours();
      const isBiggerFinishBreak = (checkHour === this.startBreak.getHours()
        && checkMinuts > this.startBreak.getMinutes())
        || checkHour > this.startBreak.getHours();
      return isBiggerFinishBreak && isLessFinishBreak;
    },
    proxySendOrder() {
      const filterOrder = this.orderProducts.filter(
        (item) => item.isGift === true,
      );
      this.setPaymentSumm(this.totalSum);
      this.addProducts();
      if (!this.isValidPhone) {
        this.createNotify('Номер телефона указан некорректно');
      } else if (this.currentOrder.clientInfo.client.name === null) {
        this.createNotify('Пожалуйста, введите имя');
      } else if (
        this.orderProducts.length === 0
        || (this.orderProducts.length === 1
        && this.orderProducts[0].isGift === true)
      ) {
        this.createNotify('Нет блюд в корзине');
      } else if (
        this.showAddressInput === true
        && this.currentOrder.clientInfo.address.dadata === null
      ) {
        this.createNotify('Адрес не определён');
      } else if (
        filterOrder[0] !== undefined
        && this.currentOrder.deliveryInfo.type.id === 2
      ) {
        this.createNotify('Промокоды недействительны для самовывоза');
      } else if (this.isValidPhone && this.orderProducts.length !== 0) {
        this.sendOrder();
        this.thanks = true;
        setTimeout(this.sayThanks, 8000);
        this.loading = false;
        this.reachYandexGoal('thank');
        this.setDefaultState();
      }
    },
    createNotify(text, colorType = 'negative') {
      this.$q.notify({
        message: text,
        color: colorType,
        position: 'bottom',
        multiLine: true,
        actions: [
          {
            label: 'Ok',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
    createNotifyPositive(text, colorType = 'positive') {
      this.$q.notify({
        message: text,
        color: colorType,
        position: 'top',
        multiLine: true,
        actions: [
          {
            label: 'Ok',
            color: 'white',
            handler: () => {
              /* ... */
            },
          },
        ],
      });
    },
  },
  async proxySetAddressDadata(dadataAddress) {
    const addressStringForYandex = dadataAddress.value;
    // смотрим есть ли координаты у адреса с дадаты
    if (dadataAddress.data.geo_lat === null) {
      // если нет то строку адреса шлем в геокодер яндеекса
      const coordYandex = await this.getCoordsByString(addressStringForYandex);
      // яндекс это пиздец. он в некоторых методах принимает сначала долготу а потом ширину.
      // а в других наборот. отдает следоватетльно тоже как попало.
      this.coords = [+coordYandex.coords[0], +coordYandex.coords[1]];
    } else {
      // если все ок то берем с дадаты
      this.coords = [dadataAddress.data.geo_lat, dadataAddress.data.geo_lon];
    }
    const chekZones = this.isTimeInBreak(this.currentOrder.deliveryInfo.time)
      ? this.dsZoneWholeTime
      : this.dsZonesPriced;
    const checkNowZones = await this.checkAddressByZones(chekZones);
    console.log('test0');
    if (checkNowZones) {
      // если есть радумеся.
      this.isInZone = true;
      console.log('test1');
      // this.getDepatmentByPoint(this.coords);
    } else {
      console.log('test2');
      const isInAllZones = await this.checkAddressByZones(this.dsZonesPriced);
      if (isInAllZones) {
        this.isInAdditionalZone = true;
      } else {
        this.isInAdditionalZone = false;
      }
      this.isInZone = false;
      this.reachYandexGoal('addresfail');
    }
    // сохраняем адрес
    this.setAddressDadata(dadataAddress);
  },
  async mounted() {
    this.yandexMapHeight = window.innerHeight - 190;
    this.$store.dispatch('promotions/getPromotions').then(() => {
      for (let i = 0; i < this.promotions.length; i += 1) {
        if (JSON.parse(this.promotions[i].type).id === 2) {
          this.promotionsDelivery.push(this.promotions[i]);
        }
      }
      if (this.promotions[0] !== undefined) {
        [this.activePromo] = this.promotions;
      }
    });
    if (this.deliveryPayButton[0] !== undefined) {
      [this.activeDeliveryPayButton] = this.deliveryPayButton;
    }
    if (this.deliveryTypeButton[0] !== undefined) {
      [this.activeDeliveryTypeButton] = this.deliveryTypeButton;
    }
    if (this.deliveryTimeButton[0] !== undefined) {
      [this.activeDeliveryTimeButton] = this.deliveryTimeButton;
    }
    this.setDate();
    this.$store.dispatch('order/getPromocode').then(() => {
      if (this.promoCodes[0] !== undefined) {
        console.log();
      }
    });
    if (this.categoriesMenu[0] !== undefined) {
      this.chooseCategory(this.categoriesMenu[0]);
    }
    this.loadProductItem = true;
    this.isMounted = true;
    const settings = {
      apiKey: '7df138bc-f837-4e1b-b1c3-9790e63279b0',
      lang: 'ru_RU',
      coordorder: 'latlong',
      version: '2.1',
    };
    await loadYmap(settings);
    // eslint-disable-next-line
    this.ymapsObj = ymaps;
    this.catchDefaultState();
  },
  created() {
    if (process.browser) {
      window.addEventListener('scroll', this.scroll);
      window.addEventListener('resize', this.slideHeight);
      this.slideHeight();
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scroll);
    window.removeEventListener('resize', this.slideHeight);
  },
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: lb;
  src: url(../font/TTLakes-Black.ttf);
}
.pho-h1 {
  font-family: lb;
  color: #fff;
  font-style: italic;
  font-weight: 900;
  font-size: 90px;
  line-height: 145px;
}
.logo {
  padding: 22px 0 0px 34px;
  cursor: pointer;
}
.container {
  padding: 0 105px;
  max-width: 1400px;
  margin: 0 auto;
}
.q-carousel {
  border-radius: 20px;
}
.carousel-box {
  margin: 9px 0 28px 0;
  border-radius: 20px;
}
.carousel-slide-image {
  border-radius: 20px;
  width: 100%;
}
.button-box {
  border: 1px solid #dadada;
  border-radius: 10px;
  margin: 8px 0 20px 0;
}
.button-box-time {
  margin: 8px 0 0 0;
}
.button-parent {
  &:first-child {
    border-radius: 0px 10px 0 10px;
  }
  &:last-child {
    border-radius: 0 10px 10px 0;
  }
}
.address-animation {
  &.active {
    animation: active-animation 0.1s;
  }
  &.noActive {
    animation: noactive-animation 0.1s;
  }
}
.time-animation {
  margin: 5px 0 10px 0;
  &.active {
    animation: active-animation 0.1s;
  }
  &.noActive {
    animation: noactive-animation 0.1s;
  }
}
@keyframes active-animation {
  from {
    margin-top: -18px;
  }
  25% {
    margin-top: -14px;
  }
  50% {
    margin-top: -10px;
  }
  75% {
    margin-top: -5px;
  }
  to {
    margin-top: 0;
  }
}
@keyframes noactive-animation {
  from {
    margin-top: 36px;
  }
  25% {
    margin-top: 28px;
  }
  50% {
    margin-top: 20px;
  }
  75% {
    margin-top: 10px;
  }
  to {
    margin-top: 5px;
  }
}
.baloon-order {
  width: 10px;
  height: 12px;
}
.cursor {
  cursor: pointer;
}
.border-radius {
  border-radius: 10px;
}
.pseudo-input {
max-width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.24);
  border-radius: 4px;
  height: 40px;
  padding: 8px 12px;
  box-sizing: border-box;
  cursor: pointer;
}

.vertical-line {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  height: 48px;
  width: 100%;
  z-index: 3;
  background-color: #f8c200;
  color: white;
  padding: 0 16px;
  display: none;
}
.basket-bottom-additional-button {
  bottom: 0;
  right: 10px;
  left: 10px;
}
.basket-cart-name {
  margin: 0 auto;
}

.close-basket {
  margin-top: 33px;
  cursor: pointer;
}
.cart {
  z-index: 99;
  position: fixed;
  right: 100px;
  top: 0;
  width: 90%;
  height: 100%;
}
.form-area {
  padding: 32px 35px 32px 53px;
  background: #fafafa;
  background: #fff;
}
.cart-area {
  padding: 32px 40px 45px 32px;
  background: #fff;
}
.create-order-button {
  display: none;
}
.display-none-class {
  display: none;
}
.q-notifications__list--center {
  bottom: 55px;
}
.q-notifications__list--bottom {
  top: 0;
}
.q-notifications__list--top {
  top: 0;
}
.main-container {
  background: #02bbbd;
  height: 100%;
}
.product-area {
  display: flex;
  flex-direction: row;
}
.cart-widget {
  position: fixed;
  width: 100px;
  height: 100px;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  &.active {
    background: #ca17a8;
  }
  &.noActive {
    background: #eab700;
  }
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
  background: #f8c200;
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
  color: #4f4f4f;
  padding-bottom: 2px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  font-family: tr;
}
.name-field-first {
  margin-top: 21px;
}
.comment-input {
  background: #ffffff;
  box-sizing: border-box;
  resize: none;
}
.pho-caption {
  font-size: 12px;
  line-height: 16px;
  /* Gray 4 */
  color: #bdbdbd;
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
.logo-m {
  width: 100%;
}
.yellow-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #ffd21e;
}
.blue-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #82cdff;
}
.purple-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #f371d1;
}
.green-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #56db40;
}
.mobile-category-text {
  font-family: lb;
  font-weight: 900;
  font-size: 22px;
  font-style: italic;
  line-height: 29.7px;
  color: white;
  margin: 10px 0 6px 0;
}
.pho-btn {
  margin: 10px 10px 10px 0px;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
  font-size: 22px;
  line-height: 30px;
  font-family: ttbold;
  font-weight: 700;
}
.pho-btn-outline {
  background: none;
  border: 2px solid #ffffff;
  color: #fff;
}
.pho-btn-outline:hover {
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
}
.pho-btn-delivery {
  background: #fff;
  border: none;
  color: #828282;
  font-size: 12px;
  line-height: 16px;
  height: 38px;
  font-weight: 500;
  margin: 0;
  font-family: tr;
  &.active {
    background: #fcd000;
    color: #ffffff;
    font-weight: 700;
  }
}
.pho-btn-delivery-group {
  border-radius: 10px;
  box-shadow: none;
}
.pho-btn-med-promo {
  width: 85px;
  border-radius: 0 10px 10px 0;
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  text-transform: none;
  font-weight: 500;
  font-family: tr;
  margin: 0px 0px 0px 0px;
  font-weight: 700;
}
.pho-btn-delivery-zones {
  font-size: 22px;
  line-height: 29.7px;
  font-weight: 500;
  height: 49px;
  font-family: lcm;
}
.display-none-mobile {
  display: none;
}
@media (min-width: 1000px) {
  .warning-line {
    height: 95px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 40px 0 40px;
    background: #fcd000;
    font-family: lcb;
    font-weight: 500;
    color: #ca17a8;
    font-size: 22px;
  }
  .warning-line-mobile {
    display: none;
  }
}
@media (max-width: 999px) {
  .warning-line {
    display: none;
  }
  .warning-line-mobile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 65px 20px 20px 20px;
    background: #fcd000;
    color: #ca17a8;
    font-family: lcb;
    font-weight: 500;
    margin-bottom: -35px;
  }
}
@media (max-width: 1023px) {
  .main-container {
    background: #02bbbd;
  }
  .container {
    margin: 48px auto;
    width: 100%;
    padding: 0 15px;
  }
  .q-carousel {
    height: 289px;
  }
  .q-carousel {
    border-radius: 20px;
  }
  .mobile-menu-scroll {
    overflow-x: scroll;
    position: sticky;
    top: 48px;
    background: #02bbbd;
    z-index: 5;
  }
  ::-webkit-scrollbar {
    background: transparent;
  }
  .logo {
    display: none;
  }
  .form-area {
    padding-top: 60px;
  }
  .form-area-display {
    display: none;
  }
  .create-order-button {
    display: flex;
  }
  .cart {
    right: 0px;
    width: 100%;
    overflow: auto;
    background: #fff;
  }
  .cart-area {
    padding: 69px 23px 32px 32px;
    margin-bottom: 60px;
  }
  .yelow-line {
    width: 48px;
    display: none;
  }
  .vertical-line {
    display: flex;
  }
  .cart-widget {
    width: 48px;
    height: 48px;
    z-index: 5999;
  }
  .cart-product-num {
    font-size: 9px;
    right: 42%;
  }
  .display-none-class {
    display: flex;
  }
  .display-none-mobile {
    display: block;
  }
  .pho-btn-delivery-zones {
    height: 37px;
  }
  .pho-h1 {
    font-family: 'lb';
    font-style: italic;
    font-weight: 900;
    font-size: 36px;
    line-height: 36px;
  }
  .pho-btn {
    font-size: 14px;
    line-height: 18.9px;
  }
  .pho-btn-outline:hover {
    margin: 10px 10px 10px 0px;
    background: none;
    border: 2px solid #ffffff;
    color: #fff;
  }
}
@media (min-width: 1523px) {
  .cart {
    width: 1000px;
  }
  .cart-area {
  padding: 32px 30px 45px 20px;
  }
}

@media (max-width: 380px) {
  .cart-h1 {
    font-size: 18px;
    line-height: 26px;
  }
}
</style>
