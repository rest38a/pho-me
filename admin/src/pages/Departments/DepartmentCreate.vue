<template>
    <div class="q-pa-md">
        <div class="text-h6">Подразделение</div>
        <q-tabs
                v-model="tab"
                class="text-teal"
                align="left"
        >
            <q-tab name="main" label="Основное"/>
            <q-tab name="map" label="Карта"/>
            <q-tab name="work-time" label="Режим работы"/>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="main">
                <div class="text-h6">Основное</div>
        <q-form
                class="q-gutter-y-md"
        >
            <div class="row q-gutter-md">
                <div class="col-4">
                    <q-input v-model="department.name" label="Название для клиентов"/>
                </div>
                <div class="col-4">
                    <q-input v-model="department.phone" label="Телефон"/>
                </div>
            </div>
            <div class="row q-gutter-md">
                <div class="col-3">
                    <q-toggle
                            label="Можно забрать самовывоз"
                            v-model="department.canPickUp"
                            color="amber"
                    />
                </div>
            </div>
            <div class="row q-gutter-md">
                <div class="col-3">
                    <q-toggle
                            label="Можно платить онлайн"
                            v-model="department.canOnlinePay"
                            color="amber"
                    />
                </div>
<!--                <div class="col-3">-->
<!--                    <q-select outlined-->
<!--                              v-model="department.merchantId"-->
<!--                              emit-value-->
<!--                              map-options-->
<!--                              use-input-->
<!--                              option-label="name"-->
<!--                              @filter="filterFn"-->
<!--                              :options="merchants" label="Мерчант для оплаты">-->
<!--                        <template v-slot:no-option>-->
<!--                            <q-item>-->
<!--                                <q-item-section class="text-grey">-->
<!--                                    нет резульататов-->
<!--                                </q-item-section>-->
<!--                            </q-item>-->
<!--                        </template>-->
<!--                    </q-select>-->
<!--                </div>-->
            </div>

            <div class="row q-gutter-md">
                <div class="col-3">
                    <q-toggle
                            label="Активен"
                            v-model="department.isActive"
                            color="amber"
                    />
                </div>
                <div class="col-4 ">
                    <q-input v-model="department.sortIndex" label="Сортировка"/>
                </div>
            </div>

            <errorAlert
                    :massageText="alert.massageText"
                    :massageType="alert.massageType"
                    :show="alert.show"
            ></errorAlert>
            <div class="rowq-gutter-md ">
                <div class="col-4 ">
                    <q-btn color="primary" @click='createItem' label="Сохранить"/>
                </div>
                <div class="col-grow" v-if="edit"></div>
                <div class="col-4 row justify-end" v-if="edit">
                    <q-btn color="negative" @click='deleteItem(department.id)'
                           label="Удалить"/>
                </div>
            </div>
        </q-form>
            </q-tab-panel>
            <q-tab-panel name="map">
                <div class="text-h6">Карта</div>
                <q-form
                        class="q-gutter-y-md"
                >
                    <div class="row q-gutter-md">
                        <div class="col-4">
                            <q-input v-model="department.address" label="Адрес"/>
                        </div>
                    </div>
                    <div class="row q-gutter-md">
                        <div class="col-4">
                            <q-input v-model="department.latLong.lat" label="Широта"/>
                        </div>
                        <div class="col-4">
                            <q-input v-model="department.latLong.long" label="Долгота"/>
                        </div>
                    </div>
                    <div class="row q-gutter-md">
                        <div class="col-6">
                            <q-input
                                    outlined
                                    v-model="department.area"
                                    label="Зона обслуживания"
                                    type="textarea"
                            />
                        </div>
                        <div class="col-4 text-red" v-if="hasMapError">
                            <h6>Ошибка карты !</h6>
                        </div>
                    </div>
                    <div>
                        <yandex-map :controls="controls"
                                    :coords="centerMap"
                                    style="width: 100%; height: 600px;"
                                    v-if="isMounted"
                                    zoom="10"
                                    :settings="settings"
                        >
                            <ymap-marker
                                    :coords="[department.latLong.lat, department.latLong.long]"
                                    marker-id="123"
                                    hint-content="some hint"
                            />
                            <ymap-marker :balloon="{
                                        body: item.properties.description
                                     }"
                                         :coords="getPriceZoneCoords(item)"
                                         :key="'m' + index"
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
                                         v-for="(item, index) in getZones()"
                            ></ymap-marker>
                        </yandex-map>
                    </div>
                </q-form>
            </q-tab-panel>
            <q-tab-panel name="work-time">
                <div class="text-h6">Режим работы</div>
                <q-form
                        class="q-gutter-y-md"
                >
                    <div class="row q-gutter-md items-center"
                         :key="index"
                         v-for="(weekDay, index) in department.workTime">
                        <div class="col-2">
                            <h6 class="q-mb-none q-my-none">
                                {{weekDay.name}}
                            </h6>
                        </div>
                        <div class="col-2">
                            <q-input v-model="weekDay.start"
                                     type="time"
                                     outlined label="начало работы"/>
                        </div>
                        <div class="col-2">
                            <q-input v-model="weekDay.end"
                                     type="time"
                                     outlined label="окончание"/>
                        </div>
                    </div>
                </q-form>
            </q-tab-panel>

        </q-tab-panels>
    </div>
</template>

<script>
import { loadYmap } from 'vue-yandex-maps';
import moment from 'moment';
import errorAlert from '../../components/common/ErrorAlert.vue';
import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'DepartmentCreate',
  components: {
    errorAlert,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.isMounted = true;
    const settings = { lang: 'ru_RU' };
    loadYmap(settings);
    if (this.edit) {
      this.$axios.get(`/api/department/${this.$route.params.id}`)
        .then(({ data }) => {
          const prepareData = keysToCamel(data.department);

          prepareData.latLong = JSON.parse(prepareData.latLong);
          prepareData.workTime = JSON.parse(prepareData.workTime);
          prepareData.area = JSON.parse(prepareData.area);
          prepareData.canPickUp = prepareData.canPickUp === 1;
          prepareData.isActive = prepareData.isActive === 1;
          prepareData.canOnlinePay = prepareData.canOnlinePay === 1;

          this.department = keysToCamel(prepareData);
        });
    }
  },
  data() {
    return {
      momentUtil: moment,
      isMounted: false,
      tab: 'main',
      settings: {
        lang: 'ru_RU',
      },
      hasMapError: false,
      centerMap: [52.286191, 104.297709],
      merchants: [],
      department: {
        id: null,
        phone: null,
        canPickUp: false,
        canOnlinePay: false,
        merchantId: null,
        latLong: {
          lat: null,
          long: null,
        },
        area: '{}',
        address: '',
        workTime: [{
          name: 'Понедельник',
          start: new Date(),
          end: new Date(),
        },
        {
          name: 'Вторник',
          start: new Date(),
          end: new Date(),
        },
        {
          name: 'Среда',
          start: new Date(),
          end: new Date(),
        },
        {
          name: 'Четверг',
          start: new Date(),
          end: new Date(),
        },
        {
          name: 'Пятница',
          start: new Date(),
          end: new Date(),
        },
        {
          name: 'Суббота',
          start: new Date(),
          end: new Date(),
        },
        {
          name: 'Воскресенье',
          start: new Date(),
          end: new Date(),
        },
        ],
        sortIndex: 500,
        isActive: true,
        isDelete: false,
        iikoId: null,
      },
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    getZones() {
      try {
        const areaObj = JSON.parse(this.department.area);
        this.hasMapError = false;
        if (areaObj.features) {
          areaObj.features.forEach((feature, featureInd) => {
            if (Array.isArray(areaObj.features[featureInd].geometry.coordinates[0])) {
              areaObj.features[featureInd].geometry.coordinates[0].forEach((item, idex) => {
                const temp0 = item[0];
                const temp1 = item[1];
                areaObj.features[featureInd].geometry.coordinates[0][idex][0] = temp1;
                areaObj.features[featureInd].geometry.coordinates[0][idex][1] = temp0;
              });
            }
          });

          return areaObj.features;
        }
        return [];
      } catch (e) {
        this.hasMapError = true;
        return [];
      }
    },
    getPriceZoneCoords(item) {
      const result = item.geometry.coordinates[0];

      return [result];
    },
    createItem() {
      this.$axios.post('/api/department', { department: this.department })
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
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
    deleteItem(productId) {
      this.$axios.delete(`/api/department/${productId}`)
        .then(({ data }) => {
          if (data.error !== undefined) {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          } else {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';

            setTimeout(() => {
              this.$router.push('/departments');
            }, 1500);
          }
        })
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
  },
};
</script>

<style scoped>

</style>
