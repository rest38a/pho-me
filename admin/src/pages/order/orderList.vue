<template>
    <q-page class="">
      <router-view/>
        <div class="row items-center q-col-gutter-lg">
            <div class="col-4">
                <q-select outlined
                          v-model="selectStatus"
                          option-label="name"
                          :options="statuses"
                          label="Статус"/>
            </div>
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
                                v-if="isLoading"
                        />
                    </div>
                </q-btn>
            </div>
        </div>
        <error-alert :massage-text="alertSearch.massageText"
                     :massage-type="alertSearch.massageType"
                     :show="alertSearch.show"
                     v-on:close="alertSearch.show = false"
        />
        <q-table
                title="Заказы"
                :data="filtredOrders"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                class="q-pb-xl"
        >
            <template v-slot:body-cell-preview="props">
                <q-td :props="props">
                    {{props.row.preview}}
                    <q-img
                            :src="`${api_link}/uploads/${props.row.preview}`"
                            spinner-color="white"
                            style="height: 140px; max-width: 150px"
                    />
                </q-td>
            </template>
            <template v-slot:body-cell-edit="props">
                <q-td :props="props">
                    <q-btn color="primary" label="редактировать"
                           @click="editOrder(props.row.id)"/>
                </q-td>
            </template>
        </q-table>
        <q-btn color="primary" class='fixed-bottom-right q-ma-md' label="Добавить"
               @click="newOrder"/>
    </q-page>
</template>

<script>
import { date } from 'quasar';
import keysToCamel from '../../helpers/toCamelCase';
import ErrorAlert from '../../components/common/ErrorAlert';

export default {
  name: 'orderList',
  components: { ErrorAlert },
  mounted() {
    this.getOrders();
    this.$axios.get('/api/statuses')
      .then(({ data }) => {
        const camelData = keysToCamel(data.statuses);
        this.statuses.splice(0, this.statuses.length, ...camelData);
      });
    const today = new Date();
    const tomorrow = this.qDate.addToDate(today, { hours: 24 });
    this.dateStart = this.qDate.formatDate(today, 'DD.MM.YYYY');
    this.dateFinish = this.qDate.formatDate(tomorrow, 'DD.MM.YYYY');
  },
  data() {
    return {
      qDate: date,
      onlyToday: true,
      api_link: process.env.ADMIN_API_LINK,
      pagination: {
        rowsPerPage: 20,
        // rowsNumber: xx if getting data from a server
      },
      statuses: [],
      selectStatus: null,
      dateStart: '10.07.2020',
      dateFinish: '10.07.2020',
      isLoading: false,
      alertSearch: {
        massageText: 'Возникла ошибка',
        massageType: 'error',
        show: false,
      },
      columns: [
        {
          name: 'id',
          required: true,
          label: 'Номер',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'createAt',
          align: 'center',
          label: 'Создан',
          field: 'createAt',
          sortable: true,
        },
        {
          name: 'deliveryTime',
          label: 'Время доставки',
          field: (row) => this.getPretyDate(row.deliveryTime),
          sortable: true,
        },
        {
          name: 'clientName',
          label: 'Клиент',
          field: (row) => row.client.name,
        },
        {
          name: 'iiko',
          label: 'Выгружен в  айку',
          field: (row) => (row.iikoId === null ? ' нет' : 'да'),
        },
        {
          name: 'phone',
          label: 'Телефон',
          field: (row) => {
            if (row.phone !== null) return row.phone.phone;
            return '';
          },
        },
        {
          name: 'address',
          label: 'Адрес',
          field: (row) => this.getAddressFromJson(row.address),
        },
        {
          name: 'totalPrice',
          label: 'Сумма',
          field: (row) => this.countSum(row.products),
        },
        {
          name: 'status',
          label: 'Статус',
          field: () => 'принят',
        },
        {
          name: 'edit',
          label: 'редактировать',
          field: 'edit',
        },
      ],
      orders: [],
    };
  },
  computed: {
    filtredOrders() {
      let ordersInput = this.orders;
      if (this.selectStatus !== null) {
        ordersInput = this.orders.filter((item) => {
          if (item.mainStatus === null) {
            return false;
          }
          return item.mainStatus.statusId === this.selectStatus.id;
        });
      }

      return ordersInput;
    },
  },
  methods: {
    editOrder(orderId) {
      this.$router.push(`/orders/${orderId}`);
    },
    countSum(products) {
      // eslint-disable-next-line
        const summ = products.reduce((accumulator, item) => {
        return accumulator + item.product.basePrice * item.number;
      }, 0);

      return summ;
    },
    getAddressFromJson(address) {
      if (address !== null) {
        return JSON.parse(address.addressJson).string;
      }
      return '';
    },
    getPretyDate(deliveryDate) {
      return this.qDate.formatDate(deliveryDate, 'HH:mm DD.MM');
    },
    newOrder() {
      this.$router.push('/orders/create');
    },
    getOrders(dateStart = null, dateFinish = null) {
      this.isLoading = true;
      this.$axios.get(`/api/orders?today=${this.onlyToday}&dateStart=${dateStart}&dateFinish=${dateFinish}`)
        .then(({ data }) => {
          const camelData = keysToCamel(data.orders);
          this.orders.splice(0, this.orders.length, ...camelData);
          this.alertSearch.massageType = 'success';
          this.alertSearch.massageText = 'Заказы успешно подгружены ';
          this.alertSearch.show = true;
          this.isLoading = false;
        }).catch(() => {
          this.alertSearch.massageType = 'error';
          this.alertSearch.massageText = 'Возникла ошибка. попробуйте уменьшить период. или проверьте корректность даты';
          this.alertSearch.show = true;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
