<template>
  <div class="q-pa-md ">
    <h4 class="q-mt-md q-mb-sm">Настройки сайта</h4>
    <q-tabs
      v-model="tab"
      class="text-teal"
      align="left"
    >
      <q-tab name="main" label="Основное"/>
      <q-tab name="seo" label="SEO"/>
      <q-tab name="blind" label="Заглушка"/>
      <!--            <q-tab name="work-time" label="Режим работы"/>-->
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="main" class="q-gutter-y-md">
        <div class="row q-gutter-md">
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.caption"
                     hint="например 'доставка суши и пиццы в иркутске'"
                     dense label="Подзаголовок сайта"/>
          </div>
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.minSum"
                     dense label="Минимальная сумма заказа"/>
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.defaultPickupTime"
                     dense label="Время на самовывоз мин"/>
          </div>
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.defaultDeliveryTime"
                     dense label="Время на доставку мин"/>
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.phone"
                     dense label="Телефон"/>
          </div>
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.companyName"
                     dense hint="Указывается на сайте" label="Название компании"/>
          </div>
          <div class="col-3 col-lg-2">
            <q-input outlined
                     type="text"
                     v-model="state.lawCompanyName"
                     dense label="Юр лицо"/>
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col-3">
            <q-input outlined
                     type="text"
                     v-model="state.instagram"
                     dense label="intagram"/>
          </div>
          <div class="col-3">
            <q-input outlined
                     type="text"
                     v-model="state.facebook"
                     dense label="facebook"/>
          </div>
          <div class="col-3">
            <q-input outlined
                     type="text"
                     v-model="state.vk"
                     dense label="vk"/>
          </div>
        </div>
        <div class="row q-gutter-md">
          <div class="col-3">
            <q-toggle
              label="Принимаем заказы"
              v-model="state.canMakeOrder"
              color="amber"
            />
          </div>
          <div class="col-8 col-lg-6">
            <q-input outlined
                     type="text"
                     :disable="!state.canMakeOrder"
                     v-model="state.repairText"
                     dense label="Сообщение когда сайт не работает"/>
          </div>
        </div>

        <div class="row">
          <div class="col-4">
            <q-toggle
              label="Применять скидку для самовывоза"
              v-model="state.isDiscountPickup"
              color="amber"
            />
          </div>
        </div>
        <!--                <div class="row" v-if="state.isDiscountPickupUse" >-->
        <!--                    <div class="col-12 col-lg-4" >-->
        <!--                        <q-select outlined-->
        <!--                                  v-model="state.picupDiscount"-->
        <!--                                  option-label="name"-->
        <!--                                  option-value="id"-->
        <!--                  :options="categories" label="Скидка для самовывоза" />-->
        <!--                    </div >-->
        <!--                    <div class="col row content-center q-px-md" >-->
        <!--                        выбирается из тех что есть в айке-->
        <!--                    </div >-->
        <!--                </div >-->
      </q-tab-panel>
      <q-tab-panel name="seo" class="">
        <div :key="seoItem.name" v-for="seoItem in seo" class="q-gutter-y-md">
          <h6 class="q-mb-none q-pt-md">
            {{ seoItem.name }}
          </h6>
          <div class="row q-gutter-md">
            <div class="col-6">
              <q-input outlined v-model="seoItem.title" label="Title"/>
            </div>
            <div class="col-5">
              <q-input outlined v-model="seoItem.keywords" label="Keywords"/>
            </div>
          </div>
          <div class="row q-gutter-md">
            <div class="col-6">
              <q-input
                outlined
                v-model="seoItem.description"
                label="description"
                type="textarea"
              />
            </div>
          </div>
        </div>
      </q-tab-panel>
      <q-tab-panel name="blind" class="column">
        <div class="row col-6">
          <upload-photo-button
            class="col-3"
            :photo="blind[0].mainPhoto"
            :label="'фото заглушки для ПК'"
            v-on:upload_photo="val => this.blind[0].mainPhoto = val">
          </upload-photo-button>
          <upload-photo-button
            class="col-4"
            :photo="blind[0].secondPhoto"
            :label="'фото заглушки для моб.устройств'"
            v-on:upload_photo="val => this.blind[0].secondPhoto = val">
          </upload-photo-button>
        </div>
        <div class="row col-6">
          <div class="row q-mb-md">
            <div class="col-6">C какого времени работает</div>
            <template class="col-6">
              <div class="" style="max-width: 300px">
                <q-input filled v-model="blind[0].fromTime">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="blind[0].fromTime" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="blind[0].fromTime" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
          </div>
          <div class="row ">
            <div class="col-6 q-ml-lg">До какого времени работает</div>
            <template class="col-6 ">
              <div class="q-ml-lg" style="max-width: 300px">
                <q-input filled v-model="blind[0].toTime">
                  <template v-slot:prepend>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="blind[0].toTime" mask="YYYY-MM-DD HH:mm">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>

                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="blind[0].toTime" mask="YYYY-MM-DD HH:mm" format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat/>
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </template>
          </div>
        </div>
      </q-tab-panel>

    </q-tab-panels>
    <div>
      <errorAlert
        :massageText="alert.massageText"
        :massageType="alert.massageType"
        :show="alert.show"
      ></errorAlert>
      <div class="row">
        <div class="col-4">
          <q-btn color="primary" @click='saveState' label="Сохранить"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import errorAlert from 'components/common/ErrorAlert.vue';

import UploadPhotoButton from 'components/common/UploadPhotoButton';

import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'SettingSite',
  components: {
    UploadPhotoButton,
    errorAlert,
  },
  data() {
    return {
      tab: 'main',
      state: {
        canMakeOrder: true,
        isDiscountPickup: true,
        startTime: null,
        finishTime: null,
        minSum: 0,
        caption: '',
        defaultDeliveryTime: 60,
        defaultPickupTime: 30,
        discountPickupValue: 10,
        phone: '+7',
        companyName: '',
        lawCompanyName: '',
        instagram: '',
        vk: '',
        facebook: '',
        repairText: '',
      },
      seo: [
        {
          name: 'Главная',
          page: 'main',
          title: '',
          keywords: '',
          description: '',
        },
        {
          name: 'Акции',
          page: 'promo',
          title: '',
          keywords: '',
          description: '',
        },
        {
          name: 'Обратная связь',
          page: 'feedback',
          title: '',
          keywords: '',
          description: '',
        },
        {
          name: 'Зона доставки',
          page: 'delivery_zone',
          title: '',
          keywords: '',
          description: '',
        },
      ],
      blind: [
        {
          mainPhoto: '',
          secondPhoto: '',
          fromTime: null,
          toTime: null,
        },
      ],
      alert: {
        show: false,
        massageText: '',
        massageType: 'error',
      },
    };
  },
  methods: {
    saveState() {
      this.$axios.post('/api/main-state', {
        mainState: {
          ...this.state,
          seo: [...this.seo],
          blind: [...this.blind],
        },
      })
        .then(({ data }) => {
          if (data.error !== undefined) {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          } else {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';
          }
        })
        .catch((errro) => {
          this.alert.show = true;
          this.alert.massageText = errro;
          this.alert.massageType = 'error';
        });
    },
    setSeo(index, seoObj) {
      this.seo[index].title = seoObj.title;
      this.seo[index].keywords = seoObj.keywords;
      this.seo[index].description = seoObj.description;
    },
  },
  mounted() {
    this.$axios.get('/api/main-state')
      .then(({ data }) => {
        // console.log(data);
        if (data.mainState !== null) {
          const camelData = keysToCamel(data.mainState);
          camelData.canMakeOrder = camelData.canOrderMake === 1;
          camelData.isDiscountPickup = camelData.isDiscountPickup === 1;

          this.state = camelData;
          const mainSeoObj = JSON.parse(camelData.mainSeo);
          const promoSeoObj = JSON.parse(camelData.promoSeo);
          const feedbackSeoObj = JSON.parse(camelData.feedbackSeo);
          const deliveryZoneSeoObj = JSON.parse(camelData.deliveryZoneSeo);
          this.setSeo(0, mainSeoObj);
          this.setSeo(1, promoSeoObj);
          this.setSeo(2, feedbackSeoObj);
          this.setSeo(3, deliveryZoneSeoObj);
        }
      });
  },
};
</script>

<style scoped>

</style>
