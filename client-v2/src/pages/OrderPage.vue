<template >
  <q-page class="main-container">
    <!--        <div class="warning-line">-->
    <!--            Внимание! Режим работы доставки 31.12.20 - принимаем заказы до 19:00.-->
    <!--            А вот 1.01.21 - принимаем заказы с 14:00.-->
    <!--        </div>-->
    <img src="/icons/logo.svg" alt="" class="logo mobile-hide" />
    <div class="row desktop-hide items-center">
      <!-- <div class="col-3 q-pa-sm items-center row">
        <img src="/icons/logo.svg" alt="" class="logo-m" />
      </div> -->
      <div
        v-ripple
        class="cart-widget-m"
        @click="showMobileCart = !showMobileCart"
      >
        <img src="/icons/basket.svg" alt="" class="cart-logo" />
        <div class="cart-product-num-m">{{ orderProductsNum }}</div>
      </div>
    </div>
    <div>
      <div
        v-ripple
        class="cart-widget mobile-hide"
        @click="showCart = !showCart"
      >
        <img src="/icons/basket.svg" alt="" class="cart-logo" />
        <div class="cart-product-num">{{ orderProductsNum }}</div>
      </div>
      <div class="yelow-line mobile-hide" v-if="showCart"></div>
      <div
        class="shadow-cart mobile-hide"
        v-if="showCart"
        @click.stop="showCart = !showCart"
      ></div>
    </div>
    <right-navigate-order-page></right-navigate-order-page>
    <!-- корзина десктоп -->
    <div class="cart row col-8" v-if="showCart">
      <div class="col-md-5 form-area mobile-hide"
      :class="{'col-sm-12': ordering === false, 'form-area-display': ordering === true}">
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 100%; padding-right: 20px"
          v-if="!thanks"
        >
          <div v-if="!showAddress" class="cart-h1"
          >Оформление заказа</div>
          <div v-if="showAddress" class="cart-h1">Адрес доставки</div>
          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field">Имя</div>
            <q-input
              :value="currentOrder.clientInfo.client.name"
              @input="setName"
              bg-color="white"
              outlined
              dense
              placeholder="Введите имя"
            /><!--
              v-model="text" //вызывает ошибки
              -->
          </div>
          <div class="pho-pb-2">
            <div class="name-field" v-if="!showAddress">Телефон</div>
            <q-input
              v-if="!showAddress"
              :value="currentOrder.clientInfo.phone"
              @input="setPhone"
              mask="+7 (###) ###-##-##"
              bg-color="white"
              outlined
              dense
              placeholder="+7 (___)-___-__-__"
            />
          </div>
          <div v-if="!showAddress" class="row button-box">
            <div
              v-for="item in deliveryTypeButton"
              :key="item.type"
              class="row col-6"
            >
              <q-btn
                v-if="
                  activeDeliveryTypeButton !== null &&
                  item === activeDeliveryTypeButton
                "
                flat
                @click="changeDeliveryType(item)"
                class="pho-btn-delivery col"
                no-caps
              >
                <div class="pho-btn-delivery-text">{{ item.type }}</div>
              </q-btn>
              <q-btn
                v-else
                flat
                @click="changeDeliveryType(item)"
                class="pho-btn-delivery-outline col"
                :key="item.type"
                no-caps
              >
                <div class="pho-btn-delivery-text">{{ item.type }}</div>
              </q-btn>
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
                <div class="col-6">Адрес доставки</div>
                <div
                  @click="showMap = !showMap"
                  class="col-6 row items-baseline justify-end"
                >
                  <img
                    src="/icons/location-baloon.svg"
                    class="q-mr-xs baloon-order"
                  />
                  <div class="cursor">Зона доставки</div>
                </div>
              </div>
              <div @click="showCardAddress" class="orderMargin">
                <q-input
                  :value="currentOrder.clientInfo.addressString"
                  bg-color="white"
                  outlined
                  dense
                  :disable="deliveryInputDisabled"
                />
              </div>
            </div>
          </div>
          <div v-if="showAddress" class="pho-pb-2">
            <div class="name-field col-6">Улица и дом</div>
            <input-adress
              :inputValue="currentOrder.clientInfo.addressString"
              :getPriceZoneCoords="getPriceZoneCoords"
              :inputFunc="updateClientAddressString"
              :options="addressHint"
              :valid="hasAddress"
              :hasHouse="hasHouse"
              :isInAdditionalZone="isInAdditionalZone"
              :startBreak="startBreak"
              :finishBreak="finishBreak"
              :isInZone="isInZone"
            ></input-adress>
          </div>
          <div v-if="showAddress" class="row">
            <div class="pho-pb-2">
              <div class="name-field">Квартира</div>
              <div class="row items-center q-col-gutter-md">
                <div class="col-6">
                  <q-input
                    :value="currentOrder.clientInfo.address.apartment"
                    @input="setApartment"
                    bg-color="white"
                    outlined
                    dense
                    :disable="apartmentDisabled"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    v-model="apartmentDisabled"
                    @input="setApartment('')"
                    :value="currentOrder.clientInfo.address.apartment"
                    color="yellow-14"
                    size="xs"
                    label="Частный дом"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div v-if="showAddress" class="pho-pb-2 col-6">
              <div class="name-field">Этаж</div>
              <div class="col-5">
                <q-input
                  :value="currentOrder.clientInfo.address.floor"
                  @input="setFloor"
                  bg-color="white"
                  outlined
                  dense
                  :disable="apartmentDisabled"
                />
              </div>
            </div>
            <div v-if="showAddress" class="pho-pb-2 col-6">
              <div class="name-field">Подъезд</div>
              <div class="col-5">
                <q-input
                  :value="currentOrder.clientInfo.address.entrance"
                  @input="setEntrance"
                  bg-color="white"
                  outlined
                  dense
                  :disable="apartmentDisabled"
                />
              </div>
            </div>
          </div>
          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field">Кол-во персон</div>
            <q-input
              :value="currentOrder.forks"
              @input="setForks"
              bg-color="white"
              outlined
              dense
            />
          </div>
          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field">Время доставки</div>
            <div v-if="!showAddress" class="row button-box-time">
              <div
                v-for="item in deliveryTimeButton"
                :key="item.type"
                class="row col-6"
              >
                <q-btn
                  v-if="
                    activeDeliveryTimeButton !== null &&
                    item === activeDeliveryTimeButton
                  "
                  flat
                  @click="changeDeliveryTime(item)"
                  class="pho-btn-delivery col"
                  no-caps
                >
                  <div class="pho-btn-delivery-text">{{ item.type }}</div>
                </q-btn>
                <q-btn
                  v-else
                  flat
                  @click="changeDeliveryTime(item)"
                  class="pho-btn-delivery-outline col"
                  :key="item.type"
                  no-caps
                >
                  <div class="pho-btn-delivery-text">{{ item.type }}</div>
                </q-btn>
              </div>
            </div>
          </div>
          <div
            class="row items-center time-animation"
            v-if="!showTimeInput"
            :class="{
              active: showTimeInput === false,
              noActive: showTimeInput === true,
            }"
          >
            <div class="col-12" v-if="!showAddress">
              <q-input
                :value="currentOrder.deliveryInfo.time"
                @input="setTime"
                mask="##:##"
                bg-color="white"
                outlined
                dense
                placeholder="00:00"
              >
                <template v-slot:prepend>
                  <q-icon name="schedule" />
                </template>
              </q-input>
            </div>
            <div class="pho-caption" v-if="!showAddress">
              <!-- Доставка в среднем занимает 1,5 часа.<br />
                Режим работы доставки: с 12:00 по 22:00 -->
              Среднее время доставки - 90 минут.
            </div>
            <div></div>
          </div>
          <div v-if="!showAddress" class="name-field">Способ оплаты</div>
          <div v-if="!showAddress" class="row button-box">
            <div
              v-for="item in deliveryPayButton"
              :key="item.type"
              class="row col-6"
            >
              <q-btn
                v-if="
                  activeDeliveryPayButton !== null &&
                  item === activeDeliveryPayButton
                "
                flat
                :val="PAIMENT_TYPES.CASH"
                @click="changeDeliveryPay(item)"
                class="pho-btn-delivery col"
                no-caps
              >
                <div class="pho-btn-delivery-text">{{ item.type }}</div>
              </q-btn>
              <q-btn
                v-else
                flat
                :val="PAIMENT_TYPES.CARD"
                @click="changeDeliveryPay(item)"
                class="pho-btn-delivery-outline col"
                :key="item.type"
                no-caps
              >
                <div class="pho-btn-delivery-text">{{ item.type }}</div>
              </q-btn>
            </div>
          </div>
          <div v-if="showAddress">
            <div class="name-field">Комментарий к адресу</div>
            <q-input
              type="textarea"
              class="comment-input"
              :value="currentOrder.comment"
              @input="setComment"
              outlined
              bg-color="white"
            />
          </div>
          <q-banner
            inline-actions
            class="text-white bg-red q-my-md"
            v-if="error"
          >
            При отправке заказа произошла ошибка. Попробуйте ещё раз. Если
            ошибка повториться сообщите пожалуйста нам об этом.
            <template v-slot:action>
              <q-btn flat color="white" @click="error = !error" label="ОК" />
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
            <div class="bold">Оформить заказ</div>
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-ml-md"
              :thickness="2"
            />
          </q-btn>
          <q-btn
            v-if="showAddress"
            flat
            style="background: #fcd000; color: #fff"
            class="full-width q-my-md"
            @click="showCardAddress"
          >
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-mr-md"
              :thickness="2"
            />
            <div class="bold">Сохранить</div>
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-ml-md"
              :thickness="2"
            />
          </q-btn>
        </q-scroll-area>
        <div v-else>
          <h6 class="bold">Спасибо за заказ!</h6>
          <div>В ближайшее время с вами свяжется наш менеджер.</div>
        </div>
      </div>
      <div class="col-12 col-md-7 col-sm-12 cart-area mobile-hide"
        :class="{'col-sm-12': ordering === true, 'form-area-display': ordering === false}">
        <div class="cart-h1"
        >Корзина</div>
        <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 80%; padding-right: 20px"
        >
          <div class="column">
            <q-separator />
            <div :key="cartItem.id" v-for="cartItem in orderProducts">
              <BasketItem
                :addToBasket="addProductToBasket"
                :removeFromBasket="removeProductToBasket"
                :removeOneProduct="removeOneProduct"
                :cartItem="cartItem"
                :orderProducts="orderProducts"
              ></BasketItem>
              <q-separator />
            </div>
          </div>
          <additional-sale
            :addToBasket="addProductToBasket"
            :categoriesMenu="categoriesMenu"
          ></additional-sale>
        </q-scroll-area>
        <div class="row justify-between items-center">
          <div class="row">
            <q-input
              :value="promoCode.value"
              @input="setPromoCode"
              label="Ввести промокод"
              bg-color="white"
              :disable="promoInputDisabled"
              outlined
              dense
            />
            <q-btn
              flat
              size="md"
              @click="usePromoCode('top')"
              class="pho-btn-med-promo"
              no-caps
              unelevated
              v-if="hidePromoButton === true"
            >
              <div>Применить</div>
            </q-btn>
            <q-btn
              flat
              size="md"
              @click="removePromoFromBasket()"
              class="pho-btn-med-promo"
              no-caps
              unelevated
              v-if="hidePromoButton === false"
            >
              <div>Отменить</div>
            </q-btn>
          </div>
          <div>
            <div class="total text-right">
              Сумма заказа: <span class="total-sum">{{ totalSum }} ₽</span>
            </div>
            <div class="pho-caption" v-if="totalSum < 800">
              Минимальная сумма заказа от 800 ₽
            </div>
          </div>
        </div>
        <q-btn
            v-if="!showAddress"
            flat
            style="background: #ca17a8; color: #fff"
            class="full-width q-my-md create-order-button"
            @click="toShowRegistrationOrder"
          >
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-mr-md"
              :thickness="2"
            />
            <div class="bold">К оформлению заказа</div>
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-ml-md"
              :thickness="2"
            />
          </q-btn>
      </div>
    </div>
    <!--        <div class="warning-line-mobile">-->
    <!--            Внимание! Режим работы доставки 31.12.20 - принимаем заказы до 19:00.-->
    <!--            А вот 1.01.21 - принимаем заказы с 14:00.-->
    <!--        </div>-->
    <div class="container">
      <div class="row items-center justify-md-start justify-between">
        <div class="pho-h1">Доставка</div>
        <div>
          <q-btn
            flat
            style="background: #fcd000; color: #4f4f4f"
            @click="showMap = !showMap"
            class="q-ml-lg q-px-sm mobile-hide"
          >
            <img src="/icons/location-baloon.svg" alt="" class="q-mr-sm" />
            <div>Зона доставки</div>
          </q-btn>
          <q-btn
            flat
            style="background: #ffffff; color: #4f4f4f"
            @click="showMap = !showMap"
            class="q-ml-lg q-px-sm zone-btm-m desktop-hide"
          >
            <img
              src="/icons/location-baloon.svg"
              alt=""
              class="q-mr-sm ballun-m"
            />
            <div>
              Зона<br />
              доставки
            </div>
          </q-btn>
        </div>
      </div>
      <!-- главная страница -->
      <div class="carosel-box">
        <q-carousel
          animated
          v-model="slide"
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
            class="carousel-slide"
            :name="1"
            img-src="..\assets\image\interiorCard\testimg.jpg"
          />
          <q-carousel-slide
            class="carousel-slide"
            :name="2"
            img-src="..\assets\image\interiorCard\testimg2.jpg"
          />
          <q-carousel-slide
            class="carousel-slide"
            :name="3"
            img-src="..\assets\image\interiorCard\testimg3.jpg"
          />
          <q-carousel-slide
            class="carousel-slide"
            :name="4"
            img-src="..\assets\image\interiorCard\testimg4.jpg"
          />
        </q-carousel>
      </div>
      <div class="row q-pb-lg">
        <template v-for="category in categoriesMenu">
          <q-btn
            v-if="activeCategory !== null && category.id === activeCategory"
            @click="chooseCategory(category)"
            class="pho-btn"
            flat
            :key="category.id"
          >
            <div>
              {{ category.name }}
            </div>
          </q-btn>
          <q-btn
            v-else
            flat
            class="pho-btn-outline"
            @click="chooseCategory(category)"
            :key="category.id"
          >
            <div>
              {{ category.name }}
            </div>
          </q-btn>
        </template>
      </div>
      <div class="row q-col-gutter-md items-stretch content-stretch">
        <ProductItem
          :key="product.name"
          :product="product"
          v-for="product in activeCategoryProducts"
        >
        </ProductItem>
      </div>
    </div>
        <!-- мобильная версия -->
    <q-dialog :maximized="maximizedToggle"
    :full-width="true" v-model="showMobileCart">
      <q-card style="width: 100%; height: 100%">
        <div class="cart-area" v-if="toShowRegistrationButton">
          <div class="row justify-between items-center content-center vertical-line">
            <div class="col-auto">
            <q-btn
              class=""
              color="grey-5"
              size="md"
              @click="showMobileCart = !showMobileCart"
              flat
            >
            <img class="" src="../assets/image/returnButton.png"></q-btn>
            </div>
            <div class="col-auto justify-center">
              <div class="cart-h1 " >Корзина</div>
            </div>
            <div class="col-1"></div>
          </div>
          <q-scroll-area
          :thumb-style="thumbStyle"
          :content-style="contentStyle"
          :content-active-style="contentActiveStyle"
          style="height: 80%; padding-right: 20px"
        >
          <div class="row justify-center items-center content-center">
            <q-input
              :value="promoCode.value"
              @input="setPromoCode"
              label="Ввести промокод"
              bg-color="white"
              :disable="promoInputDisabled"
              outlined
              dense
              class="col-9"
            />
            <q-btn
              flat
              size="md"
              @click="usePromoCode('top')"
              class="pho-btn-med-promo col"
              no-caps
              unelevated
              v-if="hidePromoButton === true"
            >
              <div>Применить</div>
            </q-btn>
            <q-btn
              flat
              size="md"
              @click="removePromoFromBasket()"
              class="pho-btn-med-promo col"
              no-caps
              unelevated
              v-if="hidePromoButton === false"
            >
              <div>Отменить</div>
            </q-btn>
          </div>
          <div class="column">
            <q-separator />
            <div :key="cartItem.id" v-for="cartItem in orderProducts">
              <BasketItem
                :addToBasket="addProductToBasket"
                :removeFromBasket="removeProductToBasket"
                :removeOneProduct="removeOneProduct"
                :cartItem="cartItem"
                :orderProducts="orderProducts"
              ></BasketItem>
              <q-separator />
            </div>
          </div>
          </q-scroll-area>
          <div class="basket-bottom-additional-button">
            <div class="column justify-end items-end content-end">
            <div class="total">
              Сумма заказа: <span class="total-sum">{{ totalSum }} ₽</span>
            </div>
            <div class="pho-caption" v-if="totalSum < 800">
              Минимальная сумма заказа 800 ₽
            </div>
          </div>
          <additional-sale
            :addToBasket="addProductToBasket"
            :categoriesMenu="categoriesMenu"
          ></additional-sale>
          <q-btn
            v-if="!showAddress"
            flat
            style="background: #ca17a8; color: #fff"
            class="full-width q-my-md"
            @click="toShowRegistrationOrder"
          >
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-mr-md"
              :thickness="2"
            />
            <div class="bold">К оформлению заказа</div>
            <q-spinner
              v-if="loading"
              color="white"
              size="1em"
              class="q-ml-md"
              :thickness="2"
            />
          </q-btn>
          </div>
        </div>
        <div v-if="!toShowRegistrationButton">
        <div class="col-12 form-area" v-if="!thanks">
          <div class="row justify-between items-center content-center vertical-line">
            <div class="col-auto">
            <img src="../assets/image/returnButton.png"
            class=""
            @click="toShowRegistrationOrder">
            </div>
            <div class="col-auto justify-center">
              <div v-if="!showAddress" class="cart-h1">Оформление заказа</div>
            </div>
            <div class="col-auto"></div>
          </div>

          <div v-if="showAddress"
          class="cart-h1 row justify-between items-center content-center vertical-line">
          <div class="col-auto">
            <img src="../assets/image/returnButton.png"
          @click="showAddress = !showAddress">
          </div>
          <div class="col-auto justify-center">Адрес доставки</div>
          <div col-auto></div>
          </div>

          <div v-if="!showAddress" class="pho-pb-2">
            <div class="name-field">Имя</div>
            <q-input
              :value="currentOrder.clientInfo.client.name"
              @input="setName"
              bg-color="white"
              outlined
              dense
              placeholder="Введите имя"
            /><!--
              v-model="text" //вызывает ошибки
              -->
          </div>
          <div class="pho-pb-2" v-if="!showAddress">
            <div class="name-field">Телефон</div>
            <q-input
              :value="currentOrder.clientInfo.phone"
              @input="setPhone"
              mask="+7 (###) ###-##-##"
              bg-color="white"
              outlined
              dense
              placeholder="+7 (___)-___-__-__"
            />
          </div>
          <div v-if="!showAddress" class="row button-box">
            <div v-for="item in deliveryTypeButton" :key="item.type" class="row col-6">
              <q-btn
                v-if="
                  activeDeliveryTypeButton !== null &&
                  item === activeDeliveryTypeButton
                "
                flat
                @click="changeDeliveryType(item)"
                class="pho-btn-delivery col"
                no-caps
              >
                <div class="pho-btn-delivery-text">{{ item.type }}</div>
              </q-btn>
              <q-btn
                v-else
                flat
                @click="changeDeliveryType(item)"
                class="pho-btn-delivery-outline col"
                :key="item.type"
                no-caps
              >
                <div class="pho-btn-delivery-text">{{ item.type }}</div>
              </q-btn>
            </div>
          </div>
          <div class="pho-pb-2 gutter" v-if="!showAddress">
            <div>
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
                    <div class="col-6">Адрес доставки</div>
                    <div
                      @click="showMap = !showMap"
                      class="col-6 row items-baseline justify-end"
                    >
                      <img
                        src="/icons/location-baloon.svg"
                        class="q-mr-xs baloon-order"
                      />
                      <div class="cursor">Зона доставки</div>
                    </div>
                  </div>
                  <div @click="showCardAddress" class="orderMargin">
                    <q-input
                      :value="currentOrder.clientInfo.addressString"
                      bg-color="white"
                      outlined
                      dense
                      :disable="deliveryInputDisabled"
                    />
                  </div>
                </div>
              </div>
              <div v-if="showAddress" class="pho-pb-2">
                <div class="name-field col-6">Улица и дом</div>
                <input-adress
                  :inputValue="currentOrder.clientInfo.addressString"
                  :getPriceZoneCoords="getPriceZoneCoords"
                  :inputFunc="updateClientAddressString"
                  :options="addressHint"
                  :valid="hasAddress"
                  :hasHouse="hasHouse"
                  :isInAdditionalZone="isInAdditionalZone"
                  :startBreak="startBreak"
                  :finishBreak="finishBreak"
                  :isInZone="isInZone"
                ></input-adress>
              </div>
              <div v-if="showAddress" class="row">
                <div class="pho-pb-2">
                  <div class="name-field">Квартира</div>
                  <div class="row items-center q-col-gutter-md">
                    <div class="col-6">
                      <q-input
                        :value="currentOrder.clientInfo.address.apartment"
                        @input="setApartment"
                        bg-color="white"
                        outlined
                        dense
                        :disable="apartmentDisabled"
                      />
                    </div>
                    <div class="col-6">
                      <q-toggle
                        v-model="apartmentDisabled"
                        @input="setApartment('')"
                        :value="currentOrder.clientInfo.address.apartment"
                        color="yellow-14"
                        size="xs"
                        label="Частный дом"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row q-col-gutter-md">
                <div v-if="showAddress" class="pho-pb-2 col-6">
                  <div class="name-field">Этаж</div>
                  <div class="col-5">
                    <q-input
                      :value="currentOrder.clientInfo.address.floor"
                      @input="setFloor"
                      bg-color="white"
                      outlined
                      dense
                      :disable="apartmentDisabled"
                    />
                  </div>
                </div>
                <div v-if="showAddress" class="pho-pb-2 col-6">
                  <div class="name-field">Подъезд</div>
                  <div class="col-5">
                    <q-input
                      :value="currentOrder.clientInfo.address.entrance"
                      @input="setEntrance"
                      bg-color="white"
                      outlined
                      dense
                      :disable="apartmentDisabled"
                    />
                  </div>
                </div>
              </div>
              <div v-if="!showAddress" class="pho-pb-2">
                <div class="name-field">Кол-во персон</div>
                <q-input
                  :value="currentOrder.forks"
                  @input="setForks"
                  bg-color="white"
                  outlined
                  dense
                />
              </div>
              <div v-if="!showAddress" class="pho-pb-2">
                <div class="name-field">Время доставки</div>
                <div v-if="!showAddress" class="row button-box-time">
                  <div
                    v-for="item in deliveryTimeButton"
                    :key="item.type"
                    class="row col-6"
                  >
                    <q-btn
                      v-if="
                        activeDeliveryTimeButton !== null &&
                        item === activeDeliveryTimeButton
                      "
                      flat
                      @click="changeDeliveryTime(item)"
                      class="pho-btn-delivery col"
                      no-caps
                    >
                      <div class="pho-btn-delivery-text">{{ item.type }}</div>
                    </q-btn>
                    <q-btn
                      v-else
                      flat
                      @click="changeDeliveryTime(item)"
                      class="pho-btn-delivery-outline col"
                      :key="item.type"
                      no-caps
                    >
                      <div class="pho-btn-delivery-text">{{ item.type }}</div>
                    </q-btn>
                  </div>
                </div>
              </div>
              <div
                class="row items-center time-animation"
                v-if="!showTimeInput"
                :class="{
                  active: showTimeInput === false,
                  noActive: showTimeInput === true,
                }"
              >
                <div class="col-12" v-if="!showAddress">
                  <q-input
                    :value="currentOrder.deliveryInfo.time"
                    @input="setTime"
                    mask="##:##"
                    bg-color="white"
                    outlined
                    dense
                    placeholder="00:00"
                  >
                    <template v-slot:prepend>
                      <q-icon name="schedule" />
                    </template>
                  </q-input>
                </div>
                <div class="pho-caption" v-if="!showAddress">
                  <!-- Доставка в среднем занимает 1,5 часа.<br />
                Режим работы доставки: с 12:00 по 22:00 -->
                  Среднее время доставки - 90 минут.
                </div>
                <div></div>
              </div>
              <div v-if="!showAddress" class="name-field">Способ оплаты</div>
              <div v-if="!showAddress" class="row button-box-time">
                <div
                  v-for="item in deliveryPayButton"
                  :key="item.type"
                  class="row col-6"
                >
                  <q-btn
                    v-if="
                      activeDeliveryPayButton !== null &&
                      item === activeDeliveryPayButton
                    "
                    flat
                    :val="PAIMENT_TYPES.CASH"
                    @click="changeDeliveryPay(item)"
                    class="pho-btn-delivery col"
                    no-caps
                  >
                    <div class="pho-btn-delivery-text">{{ item.type }}</div>
                  </q-btn>
                  <q-btn
                    v-else
                    flat
                    :val="PAIMENT_TYPES.CARD"
                    @click="changeDeliveryPay(item)"
                    class="pho-btn-delivery-outline col"
                    :key="item.type"
                    no-caps
                  >
                    <div class="pho-btn-delivery-text">{{ item.type }}</div>
                  </q-btn>
                </div>
              </div>
              <div v-if="showAddress">
                <div class="name-field">Комментарий к адресу</div>
                <q-input
                  type="textarea"
                  class="comment-input"
                  :value="currentOrder.comment"
                  @input="setComment"
                  outlined
                  bg-color="white"
                />
              </div>
              <q-btn
                v-if="showAddress"
                flat
                style="background: #fcd000; color: #fff"
                class="full-width q-my-md"
                @click="showCardAddress"
              >
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-mr-md"
                  :thickness="2"
                />
                <div class="bold">Сохранить</div>
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-ml-md"
                  :thickness="2"
                />
              </q-btn>
              <q-banner
                inline-actions
                class="text-white bg-red q-my-md"
                v-if="error"
              >
                При отправке заказа произошла ошибка. Попробуйте ещё раз. Если
                ошибка повториться сообщите пожалуйста нам об этом.
                <template v-slot:action>
                  <q-btn
                    flat
                    color="white"
                    @click="error = !error"
                    label="ОК"
                  />
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
                <div class="bold">Оформить заказ</div>
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-ml-md"
                  :thickness="2"
                />
              </q-btn>
              <q-btn
                v-if="showAddress"
                flat
                style="background: #fcd000; color: #fff"
                class="full-width q-my-md"
                @click="showCardAddress"
              >
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-mr-md"
                  :thickness="2"
                />
                <div class="bold">Сохранить</div>
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-ml-md"
                  :thickness="2"
                />
              </q-btn>
              <!-- <div v-else>
                <h6 class="bold">Спасибо за заказ!</h6>
                <div>В ближайшее время с вами свяжется наш менеджер.</div>
              </div> -->
              <div class="name-field" v-if="showMap">Зона доставки</div>
            </div>
          </div>
          <div v-if="showAddress" class="pho-pb-2">
            <div class="name-field col-6">Улица и дом</div>
            <input-adress
              :inputValue="currentOrder.clientInfo.addressString"
              :getPriceZoneCoords="getPriceZoneCoords"
              :inputFunc="updateClientAddressString"
              :options="addressHint"
              :valid="hasAddress"
              :hasHouse="hasHouse"
              :isInAdditionalZone="isInAdditionalZone"
              :startBreak="startBreak"
              :finishBreak="finishBreak"
              :isInZone="isInZone"
            ></input-adress>
          </div>
          <div v-if="showAddress" class="row">
            <div class="pho-pb-2">
              <div class="name-field">Квартира</div>
              <div class="row items-center q-col-gutter-md">
                <div class="col-6">
                  <q-input
                    :value="currentOrder.clientInfo.address.apartment"
                    @input="setApartment"
                    bg-color="white"
                    outlined
                    dense
                    :disable="apartmentDisabled"
                  />
                </div>
                <div class="col-6">
                  <q-toggle
                    v-model="apartmentDisabled"
                    @input="setApartment('')"
                    :value="currentOrder.clientInfo.address.apartment"
                    color="yellow-14"
                    size="xs"
                    label="Частный дом"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-md">
            <div v-if="showAddress" class="pho-pb-2 col-6">
              <div class="name-field">Этаж</div>
              <div class="col-5">
                <q-input
                  :value="currentOrder.clientInfo.address.floor"
                  @input="setFloor"
                  bg-color="white"
                  outlined
                  dense
                  :disable="apartmentDisabled"
                />
              </div>
            </div>
            <div v-if="showAddress" class="pho-pb-2 col-6">
              <div class="name-field">Подъезд</div>
              <div class="col-5">
                <q-input
                  :value="currentOrder.clientInfo.address.entrance"
                  @input="setEntrance"
                  bg-color="white"
                  outlined
                  dense
                  :disable="apartmentDisabled"
                />
              </div>
            </div>
          </div>
          <div class="pho-pb-2 row" v-if="!showAddress">
          </div>
          <div v-if="showAddress">
            <div class="name-field">Комментарий к адресу</div>
            <q-input
              type="textarea"
              class="comment-input"
              :value="currentOrder.comment"
              @input="setComment"
              outlined
              bg-color="white"
            />
          </div>
          <q-btn
                v-if="showAddress"
                flat
                style="background: #fcd000; color: #fff"
                class="full-width q-my-md"
                @click="showCardAddress"
              >
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-mr-md"
                  :thickness="2"
                />
                <div class="bold">Сохранить</div>
                <q-spinner
                  v-if="loading"
                  color="white"
                  size="1em"
                  class="q-ml-md"
                  :thickness="2"
                />
              </q-btn>
          <q-banner
            inline-actions
            class="text-white bg-red q-my-md"
            v-if="error"
          >
            При отправке заказа произошла ошибка. Попробуйте ещё раз. Если
            ошибка повториться сообщите пожалуйста нам об этом.
            <template v-slot:action>
              <q-btn flat color="white" @click="error = !error" label="ОК" />
            </template>
          </q-banner>
        </div>
        </div>
        <div v-if="thanks">
        <div class="form-area">
          <div class="row justify-between items-center content-center vertical-line">
                  <div class="col-auto">
                    <q-btn
                    class=""
                    color="grey-5"
                    size="md"
                    @click="showMobileCart = !showMobileCart"
                    flat
                    >
                      <img class="" src="../assets/image/returnButton.png"></q-btn>
                  </div>
                  <div class="col-auto justify-center">
                    <div class="cart-h1 " ></div>
                  </div>
                  <div class="col-1"></div>
          </div>
          <h6 class="bold">Спасибо за заказ!</h6>
          <div>Дайте нам пару минут и наш менеджер свяжется с вами.</div>
          <div>Но если этого не произойдет, звоните по телефону 596-011.</div>
        </div>
        </div>
      </q-card>
    </q-dialog>
    <!-- зона доставки -->
    <q-dialog v-model="showMap">
      <q-card style="min-width: 80%">
        <q-card-section>
          <div class="text-h6">Зона доставки</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="row items-center">
              <div class="yellow-zone"></div>
              <div>от 800 руб</div>
            </div>
            <div class="row items-center">
              <div class="blue-zone pl-3"></div>
              <div>от 1100 руб</div>
            </div>
            <div class="row items-center q-ml-md-md">
              <div class="purple-zone pl-3"></div>
              <div>от 1400 руб</div>
            </div>
            <div class="row items-center">
              <div class="green-zone pl-3"></div>
              <div>от 1700 руб</div>
            </div>
          </div>
          <yandex-map
            :coords="centerMap"
            style="width: 100%; height: 600px"
            v-if="isMounted"
            zoom="12"
          >
            <ymap-marker
              :balloon="{
                body: item.properties.description,
              }"
              :coords="getPriceZoneCoords(item)"
              :key="index"
              :marker-fill="{
                color: item.properties.fill,
                opacity: item.properties['fill-opacity'],
              }"
              :marker-stroke="{
                color: item.properties.stroke,
                width: item.properties['stroke-width'],
                opacity: item.properties['stroke-opacity'],
              }"
              :markerId="'m' + index"
              marker-type="Polygon"
              v-for="(item, index) in dsZonesPriced.features"
            ></ymap-marker>
            <ymap-marker
              v-if="coords.length !== 0"
              :coords="[coords[0], coords[1]]"
              markerId="42m"
              marker-type="Placemark"
            ></ymap-marker>
            <ymap-marker
              :coords="[ourDepartment[0], ourDepartment[1]]"
              markerId="ourMap"
              hint-content="Pho Me"
              marker-type="Placemark"
              :properties="departmentProperty"
            ></ymap-marker>
          </yandex-map>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template >

<script >
import { dom } from 'quasar';

const { height } = dom;
import { loadYmap } from 'vue-yandex-maps';
import {
  mapState, mapGetters, mapMutations, mapActions,
} from 'vuex';
import ProductItem from '../components/ProductItem';
import BasketItem from '../components/BasketItem';
import YmapConstructor from '../boot/yandex-map-constructor.json';
import InputAdress from '../components/inputAdress.vue';
import RightNavigateOrderPage from '../components/navigation/RightNavigateOrderPage.vue';
import AdditionalSale from '../components/AdditionalSale.vue';

export default {
  name: 'OrderPage',
  components: {
    ProductItem,
    BasketItem,
    InputAdress,
    RightNavigateOrderPage,
    AdditionalSale,
  },
  meta: {
    title: 'Pho me. Доставка из азиатского ресторана в Иркутске',
  },
  data() {
    return {
      API_LINK: process.env.CLIENT_API_LINK,
      PAIMENT_TYPES: process.env.PAIMENT_TYPES,
      DELIVERY_TYPE_LIST: process.env.DELIVERY_TYPE_LIST,
      slide: 1,
      autoplay: true,
      paymentRadio: '',
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
    ...mapState('order', [
      'order',
      'orderProducts',
      'orderMenu',
      'categoriesMenu',
      'currentOrder',
      'promoCode',
      'promoCodes',
    ]),
    ...mapGetters('order', [
      'totalSum',
      'orderProductsNum',
      'hasAddress',
      'hasHouse',
      'isAddressInZone',
      'isValidPhone',
    ]),
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
    ]),
    changeBasketColor() {
      if (this.orderProducts === 0) {
        this.backgroundBasket = '#eab700';
      } else if (this.orderProducts !== 0) {
        this.backgroundBasket = '#ca17a8';
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
      if (item.type === 'Доставка') {
        this.switchDeliveryType({ id: 1 });
        this.deliveryInputDisabled = false;
        this.showAddressInput = true;
      } else if (item.type === 'Самовывоз') {
        this.switchDeliveryType({ id: 2 });
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
    },
    reachYandexGoal(name) {
      // eslint-disable-next-line
      yaCounter48434603.reachGoal(name);
    },
    usePromoCode(position) {
      const result = this.promoCodes.filter((item) => item.value === this.promoCode.value);
      if (result.length === 0) {
        this.createNotify('Промокод не найден');
      } else this.checkPromoCode(result[0], position);
    },
    checkPromoCode(result) {
      const date = new Date();
      const limitDate = Date.parse(result.date_finish) - Date.parse(date);
      const filterOrder = this.orderProducts.filter((item) => item.isGift === true);
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
        this.createNotify('К сожалению, промокод нельзя добавить в заказ самовывозом');
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
      const filterOrder = this.orderProducts.filter((item) => item.isGift === true);
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
      return isBiggerFinishBreak
      && isLessFinishBreak;
    },
    proxySendOrder() {
      const filterOrder = this.orderProducts.filter((item) => item.isGift === true);
      this.setPaymentSumm(this.totalSum);
      this.addProducts();
      if (!this.isValidPhone) {
        this.createNotify('Номер телефона указан некорректно');
      } else if (
        this.orderProducts.length === 0
        || (this.orderProducts.length === 1
        && this.orderProducts[0].isGift === true)) {
        this.createNotify('Нет блюд в корзине');
      } else if (
        this.showAddressInput === true
        && this.currentOrder.clientInfo.address.dadata === null) {
        this.createNotify('Адрес не определён');
      } else if (
        filterOrder[0] !== undefined
        && this.currentOrder.deliveryInfo.type.id === 2) {
        this.createNotify('Промокоды недействительны для самовывоза');
      } else if (this.isValidPhone
      && this.orderProducts.length !== 0) {
        this.sendOrder();
        this.thanks = true;
        this.loading = false;
        this.reachYandexGoal('thank');
      }
    },
    createNotify(text, colorType = 'negative') {
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
        console.log(2);
      }
    });
    this.$store.dispatch('order/getOrderMenu').then(() => {
      if (this.categoriesMenu[0] !== undefined) {
        this.chooseCategory(this.categoriesMenu[0]);
      }
    });
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

    this.dsZonesPriced.features.forEach((feature, featureInd) => {
      if (
        Array.isArray(this.dsZonesPriced.features[featureInd].geometry.coordinates[0])
      ) {
        this.dsZonesPriced.features[featureInd].geometry.coordinates[0].forEach(
          (item, idex) => {
            const temp0 = item[0];
            const temp1 = item[1];
            this.dsZonesPriced.features[featureInd].geometry.coordinates[0][
              idex
            ][0] = temp1;
            this.dsZonesPriced.features[featureInd].geometry.coordinates[0][
              idex
            ][1] = temp0;
          },
        );
      }
    });
  },
};
</script >

<style scoped lang='scss' >
@font-face {
  font-family: lb;
  src: url(../font/TTLakes-Black.ttf);
}

.logo {
  padding: 40px 0 0px 40px;
}

.q-carousel {
  border-radius: 20px;
}

.carosel-box {
  margin: 38px 0 38px 0;
}

.button-box {
  border: 1px solid #dadada;
  border-radius: 10px;
  margin: 8px 0 20px 0;
}

.button-box-time {
  border: 1px solid #dadada;
  border-radius: 10px;
  height: 42px;
  margin: 8px 0 0 0;
}

.pho-btn-delivery {
  font-family: TT Lakes;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  width: 145px;
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

.pho-btn-outline {
  font-family: TT Lakes;
  border-radius: 10px;
  border: 2px solid #828282;
  color: #fff;
  font-family: lcb;
  font-size: 12px;
  line-height: 16px;
  width: 145px;
}

.pho-btn-delivery-outline:hover {
  font-family: TT Lakes;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  width: 145px;
}

.pho-btn-delivery-text {
  font-size: 12px;
  line-height: 16px;
  font-family: TT Lakes;
}
.pho-btn-med-promo {
  width: 85px;
  font-family: TT Lakes;
  border-radius: 0 10px 10px 0;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #ffffff;
  font-size: 12px;
  line-height: 16px;
  text-transform: none;
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

.orderMargin {
  margin-bottom: 13px;
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
  }

.basket-bottom-additional-button {
  bottom: 0;
  right: 10px;
  left: 10px;
}

.basket-cart-name {
  margin: 0 auto;
}
  .cart {
    z-index: 100;
    position: fixed;
    right: 95px;
    top: 0;
    width: 80%;
    height: 100%;
    background: #fff;
  }

.form-area {
    padding: 32px 35px 32px 53px;
    background: #fafafa;
  }

  .cart-area {
    padding: 32px;
  }
.create-order-button {
  display: none;
}

@media (max-width: 1023px) {
  .q-carousel {
    height: 289px;
  }
  .logo {
    display: none;
  }
  .form-area-display {
    display: none;
  }
  .create-order-button {
  display: block;
}
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
  padding-bottom: 100px;
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
  background: #ca17a8;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.cart-widget-m {
  position: fixed;
  width: 48px;
  height: 48px;
  right: 0;
  top: 0;
  background: #ca17a8;
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
  font-family: TT Lakes;
}

.comment-input {
  height: 77px;

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

.header-mobile {
  z-index: 100;
  width: 100%;
  height: 48px;
  position: fixed;
  background: #f8c200;
}

.logo-m {
  width: 100%;
}
.yellow-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #ffd21e;
  margin: 20px 10px 20px 0;
}
.blue-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #82cdff;
  margin: 20px 10px 20px 20px;
}
.purple-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #f371d1;
  margin: 20px 10px 20px 0px;
}
.green-zone {
  width: 50px;
  height: 30px;
  border-radius: 20px;
  background: #56db40;
  margin: 20px 10px 20px 20px;
}

.pho-btn-med {
  width: 175px;
  margin-top: 10px;
  font-family: lcb;
  border-radius: 10px;
  background: #fcd000;
  border: 2px solid #fcd000;
  color: #4f4f4f;
  font-size: 16px;
  text-transform: none;
}

@media (min-width: 1199.98px) {
  .container {
    max-width: 1140px;
    margin: auto;
    padding: 0;
  }
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
    background: #fcd000;
    border: 2px solid #fcd000;
    color: #4f4f4f;
    font-size: 22px;
  }

  .pho-btn-outline {
    margin: 10px 10px 10px 0px;
    border-radius: 10px;
    border: 2px solid #ffffff;
    color: #fff;
    font-family: lcb;
    font-size: 22px;
  }

  .pho-btn-outline:hover {
    margin: 10px 10px 10px 0px;
    border-radius: 10px;
    background: #fcd000;
    border: 2px solid #fcd000;
    color: #4f4f4f;
  }

  .pho-btn-outline:hover > div {
    color: #4f4f4f;
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
    margin: 10px 10px 0px 0px;
    border-radius: 10px;
    background: #fcd000;
    border: 2px solid #fcd000;
    color: #4f4f4f;
    font-size: 14px;
  }

  .pho-btn-outline {
    margin: 10px 10px 0px 0px;
    border-radius: 10px;
    border: 2px solid #ffffff;
    color: #fff;
    font-family: lcb;
    font-size: 14px;
  }

  .pho-btn-outline:hover {
    margin: 10px 10px 10px 0px;
    border-radius: 10px;
    background: #fcd000;
    border: 2px solid #fcd000;
    color: #4f4f4f;
  }

  .pho-btn-outline:hover > div {
    color: #4f4f4f;
  }
}
</style >
