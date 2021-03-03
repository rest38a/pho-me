<template>
    <q-page class="">
        <div class="row items-center q-col-gutter-lg">
            <div class="col-auto row">

                <div class="q-pa-md" style="max-width: 300px">
                    <q-input filled v-model="dateStart" mask="##.##.####" label="начало периода">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy"
                                               transition-show="scale"
                                               transition-hide="scale">
                                    <q-date v-model="dateStart"
                                            today-btn
                                            mask="DD.MM.YYYY"
                                            @input="() => $refs.qDateProxy.hide()"/>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="q-pa-md" style="max-width: 300px">
                    <q-input filled v-model="dateFinish"
                             mask="##.##.####"
                             label="конец периода">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy2"
                                               transition-show="scale"
                                               transition-hide="scale">
                                    <q-date v-model="dateFinish"
                                            today-btn
                                            mask="DD.MM.YYYY"
                                            @input="() => $refs.qDateProxy2.hide()"/>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>

                <!--                <q-toggle-->
                <!--                        label="Только сегодня"-->
                <!--                        v-model="onlyToday"-->
                <!--                        color="amber"-->
                <!--                />-->
            </div>
            <div class="col-auto">
                <q-btn color="primary"

                       @click="getOrders(dateStart, dateFinish)">
                    <div>
                        обновить
                    </div>
                    <div>
                        <q-spinner
                                color="white"
                                class="q-ml-md"
                                v-if="loading"
                        />
                    </div>
                </q-btn>
            </div>
        </div>
        <error-alert :massage-text="alertSearch.massageText"
                     :massage-type="alertSearch.massageType"
                     v-on:close="alertSearch.show = false"
                     :show="alertSearch.show"/>
        <div class="row">
            <div class="col-12 col-md-3 q-pr-lg">
                <q-toolbar class="bg-primary text-white shadow-2">
                    <q-toolbar-title>Тип заказа</q-toolbar-title>
                    <div>Зал, сам, дост</div>
                </q-toolbar>
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>Доставка</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{onlyDeliveryOrders.length}}шт
                                ({{getPercent(onlyDeliveryOrders, allOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>Самовывоз</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{onlyPickupOrders.length}}шт
                                ({{getPercent(onlyPickupOrders, allOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>Зал</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{onlyHallOrders.length}}шт
                                ({{getPercent(onlyHallOrders, allOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="col-12 col-md-3  q-pr-lg">
                <q-toolbar class="bg-primary text-white shadow-2">
                    <q-toolbar-title>Время приготовления</q-toolbar-title>
                    <div>Самовывоз и доставка</div>
                </q-toolbar>
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>До 20 мин</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getCookOrderLowerTime(0, 20).length}}шт
                                ({{getPercent(getCookOrderLowerTime(0, 20),
                                deliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>до 30 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getCookOrderLowerTime(20, 31).length}}шт
                                ({{getPercent(getCookOrderLowerTime(20, 31),
                                deliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>От 30 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getCookOrderLowerTime(31, 1000).length}}
                                шт
                                ({{getPercent(getCookOrderLowerTime(31, 1000),
                                deliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="col-12 col-md-3 q-pr-lg">
                <q-toolbar class="bg-primary text-white shadow-2">
                    <q-toolbar-title>Время доставки</q-toolbar-title>
                    <div>Только доставка</div>
                </q-toolbar>
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>До 45 мин</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getDeliveryOrderLowerTime(0, 46).length}}шт
                                ({{getPercent(getDeliveryOrderLowerTime(0, 46),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>до 60 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getDeliveryOrderLowerTime(46, 61).length}}шт
                                ({{getPercent(getDeliveryOrderLowerTime(46, 61),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>До 90 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getDeliveryOrderLowerTime(61, 90).length}}
                                шт
                                ({{getPercent(getDeliveryOrderLowerTime(61, 90),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>от 90 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getDeliveryOrderLowerTime(90, 1000).length}}
                                шт
                                ({{getPercent(getDeliveryOrderLowerTime(90, 1000),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="col-12 col-md-3 q-pr-lg">
                <q-toolbar class="bg-primary text-white shadow-2">
                    <q-toolbar-title>Время впути</q-toolbar-title>
                    <div>Только доставка</div>
                </q-toolbar>
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>до 20 мин</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getWayOrderLowerTime(0, 20).length}}шт
                                ({{getPercent(getWayOrderLowerTime(0, 20),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>до 30 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getWayOrderLowerTime(20, 30).length}}шт
                                ({{getPercent(getWayOrderLowerTime(20, 30),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>до 45 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getWayOrderLowerTime(30, 45).length}}
                                шт
                                ({{getPercent(getWayOrderLowerTime(30, 45),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label>от 45 минут</q-item-label>
                        </q-item-section>

                        <q-item-section side center>
                            <q-item-label caption>
                                {{getWayOrderLowerTime(45, 1000).length}}
                                шт
                                ({{getPercent(getWayOrderLowerTime(45, 1000),
                                onlyDeliveryOrders)}}%)
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>

        <q-table
                title="Заказы"
                :data="deliveryOrders"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                class="q-pb-xl my-sticky-dynamic"
                ref="table"
                dense
        >
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="ServiceType" class :props="props">
                        {{getNameDeliveryType(props.row['Delivery.ServiceType'])}}

                    </q-td>
                    <q-td key="OrderNum" class :props="props">
                        {{props.row.OrderNum }}

                    </q-td>
                    <q-td key="phone" class :props="props">
                        {{getPhone(props.row['Delivery.CustomerPhone'])}}

                    </q-td>
                    <q-td key="OpenTime" class :props="props">
                        {{getPretyDate(props.row.OpenTime)}}
                    </q-td>
                    <q-td key="printTime" class :props="props">
                        {{ getPretyDate(props.row['Delivery.BillTime']) }}
                    </q-td>
                    <q-td key="finishCook" class :props="props">
                        {{ getPretyDate(props.row['Delivery.CookingFinishTime']) }}
                    </q-td>
                    <q-td key="sendTime" class :props="props">
                        {{ getPretyDate(props.row['Delivery.SendTime']) }}
                    </q-td>
                    <q-td key="deliveryDate" class :props="props">
                        {{ getPretyDate(props.row['Delivery.ExpectedTime']) }}
                    </q-td>
                    <q-td key="actualTime" class :props="props">
                        {{ getPretyDate(props.row['Delivery.ActualTime']) }}
                    </q-td>
                    <q-td key="startCook" class :props="props">
                        {{ getCalcStartCook(props.row['Delivery.ExpectedTime'],
                        props.row['Delivery.ServiceType']) }}
                    </q-td>
                    <q-td key="printDelay" class :props="props">
                        <q-badge :color="getColor(getPrintDelay(props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.BillTime'], props.row['Delivery.ServiceType']), 0)">
                            {{ getPrintDelay(props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.BillTime'], props.row['Delivery.ServiceType']) }}
                        </q-badge>
                    </q-td>
                    <q-td key="cookDuration" class :props="props">
                        <q-badge :color="getColor(getCookDuration(
                            props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.CookingFinishTime'],
                            props.row['Delivery.BillTime'],
                            props.row['Delivery.ServiceType']), 30)">
                            {{ getCookDuration(
                            props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.CookingFinishTime'],
                            props.row['Delivery.BillTime'],
                            props.row['Delivery.ServiceType']) }}
                        </q-badge>
                    </q-td>
                    <q-td key="waitDelivery" class :props="props">
                        <q-badge :color="getColor(getDatesDiff(
                            props.row['Delivery.CookingFinishTime'],
                            props.row['Delivery.SendTime']),10)">
                            {{ getDatesDiff(props.row['Delivery.CookingFinishTime'],
                            props.row['Delivery.SendTime']) }}
                        </q-badge>
                    </q-td>
                    <q-td key="durationInMinutes" class :props="props">
                        <q-badge :color="getColor(props.row['Delivery.WayDuration'],30)">
                            {{ props.row['Delivery.WayDuration'] }}
                        </q-badge>
                    </q-td>
                    <q-td key="lateDelivery" class :props="props">
                        <q-badge
                                :color="getColor(getDeliveryLate(
                            props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.ActualTime']), 0)">
                            {{ getDeliveryLate(props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.ActualTime']) }}
                        </q-badge>
                    </q-td>
                    <q-td key="wholeTime" class :props="props">
                        <q-badge :color="getColor(getWholeTime(props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.ActualTime']), 90, 60)">
                            {{ getWholeTime(props.row['Delivery.ExpectedTime'],
                            props.row['Delivery.ActualTime']) }}
                        </q-badge>
                    </q-td>
                    <q-td key="DishSumInt" class :props="props">
                        {{ props.row.DishSumInt }}
                    </q-td>
                </q-tr>
            </template>
        </q-table>
        <div class="loading" v-if="loading">
            <div class="loading-bg"></div>
            <q-spinner
                    color="primary"
                    size="3em"
            />
        </div>
    </q-page>
</template>

<script>
import { date } from 'quasar';
import ErrorAlert from '../../components/common/ErrorAlert';

export default {
  name: 'ReportPage',
  components: { ErrorAlert },
  data() {
    return {
      loading: true,
      qDate: date,
      dateStart: '10.07.2020',
      dateFinish: '10.07.2020',
      deliveryOrders: [],
      allOrders: [],
      columns: [
        {
          name: 'ServiceType',
          sortable: true,
          required: true,
          label: 'Тип заказа',
          field: (row) => this.getNameDeliveryType(row['Delivery.ServiceType']),
        },
        {
          name: 'OrderNum',
          required: true,
          label: 'Номер',
          align: 'left',
          field: (row) => row.OrderNum,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'phone',
          required: true,
          label: 'Телефон',
          align: 'left',
          field: (row) => (row['Delivery.CustomerPhone'] ? row['Delivery.CustomerPhone'] : ''),

          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'OpenTime',
          align: 'center',
          label: 'Создан',
          field: (row) => this.getPretyDate(row.OpenTime),
          sortable: true,
        },
        {
          name: 'printTime',
          align: 'center',
          label: 'Напечатан',
          field: (row) => this.getPretyDate(row['Delivery.BillTime']),
          sortable: true,
        },
        {
          name: 'finishCook',
          align: 'center',
          label: 'ОП',
          field: (row) => this.getPretyDate(row['Delivery.CookingFinishTime']),
          sortable: true,
        },
        {
          name: 'sendTime',
          align: 'center',
          label: 'ОД',
          field: (row) => this.getPretyDate(row['Delivery.SendTime']),
          sortable: true,
        },
        {
          name: 'deliveryDate',
          label: 'ПВД',
          field: (row) => this.getPretyDate(row['Delivery.ExpectedTime']),
          sortable: true,
        },
        {
          name: 'actualTime',
          label: 'ФВД',
          field: (row) => this.getPretyDate(row['Delivery.ActualTime']),
          sortable: true,
        },
        {
          name: 'startCook',
          label: 'РВНП',
          field: (row) => this.getCalcStartCook(row['Delivery.ExpectedTime']),
          sortable: true,
        },
        {
          name: 'printDelay',
          label: 'ЗП',
          field: (row) => this.getPrintDelay(row['Delivery.ExpectedTime'], row['Delivery.BillTime'], row['Delivery.ServiceType']),
          sortable: true,
        },
        {
          name: 'cookDuration',
          label: 'Время пр-я',
          field: (row) => this.getCookDuration(row['Delivery.ExpectedTime'], row['Delivery.CookingFinishTime'],
            row['Delivery.BillTime'], row['Delivery.ServiceType']),
          sortable: true,
        },
        {
          name: 'waitDelivery',
          label: 'Ож-ие д-ки',
          field: (row) => this.getDatesDiff(row['Delivery.CookingFinishTime'], row['Delivery.SendTime']),
          sortable: true,
        },
        {
          name: 'durationInMinutes',
          label: 'Прод-ть д-ки',
          field: 'Delivery.WayDuration',
          sortable: true,
        },
        {
          name: 'lateDelivery',
          label: 'Опоздание д-ки',
          field: (row) => this.getDeliveryLate(row['Delivery.ExpectedTime'], row['Delivery.ActualTime']),
          sortable: true,
        },
        {
          name: 'wholeTime',
          label: 'ПО',
          field: (row) => `${this.getWholeTime(row['Delivery.ExpectedTime'], row['Delivery.ActualTime'])} мин.`,
          sortable: true,
        },
        {
          name: 'DishSumInt',
          label: 'Сумма',
          field: 'DishSumInt',
        },
        // {
        //   name: 'address',
        //   label: 'Адрес',
        //   field: (row) => this.getAddressFromJson(row.address),
        // },
        // {
        //   name: 'totalPrice',
        //   label: 'Сумма',
        //   field: (row) => this.countSum(row.products),
        // },
        // {
        //   name: 'status',
        //   label: 'Статус',
        //   field: () => 'принят',
        // },
        // {
        //   name: 'edit',
        //   label: 'редактировать',
        //   field: 'edit',
        // },
      ],
      pagination: {
        rowsPerPage: 50,
        sortBy: 'desc',
        descending: false,
        // rowsNumber: xx if getting data from a server
      },
      deliveryTypeName: {
        COURIER: 'Доставка',
        PICKUP: 'Самовывоз',
        null: 'Зал',
      },
      alertSearch: {
        massageText: 'Возникла ошибка',
        massageType: 'error',
        show: false,
      },
      timeOffset: 0,
    };
  },
  methods: {
    calcTimeOffset(dateCalc) {
      if (this.timeOffset !== 0) {
        return this.qDate.addToDate(dateCalc, { hours: -(this.timeOffset) });
      }
      return dateCalc;
    },
    getPretyDate(deliveryDate) {
      const prepareDate = this.calcTimeOffset(deliveryDate);
      return this.qDate.formatDate(prepareDate, 'HH:mm'); // DD.MM.YYYY
    },
    getCalcStartCook(deliveryDate, deliveryType) {
      let diff = { hours: -1 };
      if (deliveryType === 'PICKUP') {
        diff = { minutes: -30 };
      }
      const startCook = this.qDate.addToDate(deliveryDate, diff);
      return this.getPretyDate(startCook);
    },
    getPrintDelay(deliveryDate, printTime, deliveryType) {
      let diff = { hours: -1 };
      if (deliveryType === 'PICKUP') diff = { minutes: -30 };
      const startCook = this.qDate.addToDate(deliveryDate, diff);
      const unit = 'minutes';

      const delay = this.qDate.getDateDiff(printTime, startCook, unit);
      if (delay > 0) return delay;
      return 0;
    },
    getCookDuration(deliveryDate, finishTime, printTime, deliveryType) {
      let diff = { hours: -1 };
      const printDelay = this.getPrintDelay(deliveryDate, printTime, deliveryType);
      if (deliveryType === 'PICKUP') {
        diff = { minutes: -30 };
      }
      const startCook = this.qDate.addToDate(deliveryDate, diff);

      const unit = 'minutes';

      const delay = this.qDate.getDateDiff(finishTime, startCook, unit) - printDelay;
      if (delay > 0) return delay;

      return 0;
    },
    getDeliveryLate(deliveryDate, actualTime) {
      const unit = 'minutes';

      const delay = this.qDate.getDateDiff(actualTime, deliveryDate, unit);
      if (delay > 0) return delay;
      return 0;
    },
    getWholeTime(deliveryDate, actualTime) {
      const startCook = this.qDate.addToDate(deliveryDate, { hours: -1 });
      const unit = 'minutes';

      const delay = this.qDate.getDateDiff(actualTime, startCook, unit);
      if (delay > 0) return delay;
      return 0;
    },
    getDatesDiff(firstDate, secondDate) {
      const unit = 'minutes';
      const delay = this.qDate.getDateDiff(secondDate, firstDate, unit);
      return delay;
    },
    getNameDeliveryType(iikoName) {
      return this.deliveryTypeName[iikoName];
    },
    getPhone(phoneIIko) {
      return phoneIIko || '';
    },
    getColor(time, max, mediume) {
      if (time > max) return 'negative';
      if (mediume !== undefined && time > mediume) return 'warning';
      return 'positive';
    },
    getPercent(numCalc, allItems) {
      if (allItems.length === 0) return 0;

      return Math.floor((numCalc.length / (allItems.length / 100)) * 100) / 100;
    },
    getDeliveryOrderLowerTime(minTime, maxTime) {
      const prepareOrders = this.onlyDeliveryOrders.filter((item) => {
        const wholeTime = this.getWholeTime(item['Delivery.ExpectedTime'], item['Delivery.ActualTime']);
        return minTime <= wholeTime && wholeTime < maxTime;
      });

      return prepareOrders;
    },
    getCookOrderLowerTime(minTime, maxTime) {
      const prepareOrders = this.deliveryOrders.filter((item) => {
        const wholeTime = this.getCookDuration(
          item['Delivery.ExpectedTime'],
          item['Delivery.CookingFinishTime'],
          item['Delivery.BillTime'],
          item['Delivery.ServiceType'],
        );
        return minTime <= wholeTime && wholeTime < maxTime;
      });

      return prepareOrders;
    },

    getWayOrderLowerTime(minTime, maxTime) {
      // eslint-disable-next-line
      const prepareOrders = this.onlyDeliveryOrders.filter((item) => {
        return minTime <= item['Delivery.WayDuration']
          && item['Delivery.WayDuration'] < maxTime;
      });

      return prepareOrders;
    },
    getOrders() {
      this.loading = true;
      this.$axios.get(`/api/iiko/olap?&dateStart=${this.dateStart}&dateFinish=${this.dateFinish}`)
        .then(({ data }) => {
          const orders = JSON.parse(data.answer.data);

          if (orders) {
            this.allOrders.splice(0, this.allOrders.length, ...orders);
            const deliveryOrders = this.allOrders.filter((item) => item['Delivery.ServiceType'] != null);
            this.deliveryOrders.splice(0, this.deliveryOrders.length, ...deliveryOrders);
            this.$refs.table.sort('Delivery.ServiceType');
            this.loading = false;
            this.alertSearch.massageType = 'success';
            this.alertSearch.massageText = 'Заказы успешно подгружены ';
            this.alertSearch.show = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.alertSearch.massageType = 'error';
          this.alertSearch.massageText = 'Возникла ошибка. попробуйте уменьшить период. или проверьте корректность даты';
          this.alertSearch.show = true;
        });
    },
  },
  computed: {
    onlyDeliveryOrders() {
      const onlyDelivery = this.deliveryOrders.filter((item) => item['Delivery.ServiceType'] === 'COURIER');
      return onlyDelivery;
    },
    onlyPickupOrders() {
      const onlyDelivery = this.deliveryOrders.filter((item) => item['Delivery.ServiceType'] === 'PICKUP');
      return onlyDelivery;
    },
    onlyHallOrders() {
      const onlyDelivery = this.allOrders.filter((item) => item['Delivery.ServiceType'] === null);
      return onlyDelivery;
    },
  },
  mounted() {
    // this.orders = this.answer.deliveryOrders;
    const today = new Date();
    const yesterday = this.qDate.addToDate(today, { hours: -24 });
    this.dateStart = this.qDate.formatDate(yesterday, 'DD.MM.YYYY');
    this.dateFinish = this.qDate.formatDate(today, 'DD.MM.YYYY');
    this.getOrders();

    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
      if (ua.indexOf('chrome') === -1) {
        this.timeOffset = 8;
      }
    }
  },
};
</script>

<style lang="sass">
    .my-sticky-dynamic
        /* height or max-height is important */
        height: 410px

        .q-table__top,
        .q-table__bottom,
        thead tr:first-child th  /* bg color is important for th; just specify one */
            background-color: #fff

        thead tr th
            position: sticky
            z-index: 1 /* this will be the loading indicator */
        thead tr:last-child th
            /* height of all previous header rows */
            top: 48px
        thead tr:first-child th
            top: 0
    .loading
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        display: flex
        justify-content: center
        align-items: center

    .loading-bg
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        opacity: 0.4
        background: #000

</style>
