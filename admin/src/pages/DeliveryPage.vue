<template>
    <q-page class="">
        <div class="row">
            <div class="col-4">
                <q-select outlined
                          v-model="selectStatus"
                          option-label="name"
                          clearable
                          :options="statuses"
                          label="Статус"/>
            </div>
        </div>
        <q-tabs align="left">
            <q-route-tab
                    v-for="subMenuItem in submenus"
                    :key="subMenuItem.name"
                    :to="subMenuItem.link"
                    :label="subMenuItem.name"
            />
        </q-tabs>
        <router-view/>
        <q-table
                title="Заказы"
                :data="filtredOrders"
                :columns="columns"
                row-key="id"
                :pagination.sync="pagination"
                class=""
                virtual-scroll
                :virtual-scroll-item-size="48"
                style="height: 50%"
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
        <div class="row q-pt-md q-col-gutter-lg">

            <delivery-man-card
                    v-for="deliveryMan in activeDeliveryMen"
                    :key="deliveryMan.id"
                    :user="deliveryMan"
                    :orders="ordersNeedDelivery"
                    :routeSheets="routeSheets"
                    v-on:addorder="val => addOrderToDeliveryMan(val)"
                    v-on:removeorder="val => removeOrderToDeliveryMan(val)"
                    v-on:delete="val => removeDeliveryMan(val)"

            />
            <div>
                <q-btn @click="showAdd = true">Добавить водителя</q-btn>
            </div>
        </div>
        <q-dialog v-model="showAdd">
            <q-card>
                <q-card-section>
                    <div class="text-h6">Выберите водителя</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    <q-input
                            outlined
                            class="q-py-md"
                            v-model="deviceId"
                            label="Номер устройства"
                    />
                    <q-select outlined
                              v-model="selectDeliveryMan"
                              option-label="name"
                              :options="deliveryMen"
                              label="Статус"/>
                </q-card-section>

                <q-card-actions>
                    <q-btn flat
                           label="Добавить"
                           @click="addDeliveryMan(selectDeliveryMan)"
                           color="primary"
                    />
                    <q-btn flat label="Отмена" color="primary" v-close-popup/>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script>
// todo вынести date от quasar в прототип vue
// todo убрать локальный импорт date везде
import { date } from 'quasar';
import DeliveryManCard from '../components/delivery/DeliveryManCard';

export default {
  name: 'DeliveryPage',
  components: { DeliveryManCard },
  data() {
    return {
      qDate: date,
      pagination: {
        rowsPerPage: 20,
        // rowsNumber: xx if getting data from a server
      },
      showAdd: false,
      selectStatus: null,
      deliveryMen: [],
      selectDeliveryMan: null,
      deviceId: null,
      activeDeliveryMen: [],
      routeSheets: [],
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
          name: 'phone',
          label: 'Телефон',
          field: (row) => row.phone.phone,
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
          field: (row) => row.mainStatus.status.name,
        },
        // { name: 'edit', label: 'редактировать', field: 'edit' },
      ],
      orders: [],
      statuses: [],
      submenus: [
        // {
        //   name: 'Активные курьеры',
        //   link: '/delivery/shifts',
        // },
      ],
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
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
    ordersNeedDelivery() {
      const ordersHaveDeliveryMan = this.orders.filter((order) => order.routeSheets.length === 0);

      return ordersHaveDeliveryMan;
    },
  },
  methods: {
    // todo убрать этот метод на сторону бэка
    getAddressFromJson(address) {
      if (address !== null) {
        const addressJson = JSON.parse(address.addressJson);
        return `${addressJson.string} ${addressJson.apartment}`;
      }
      return '';
    },
    countSum(products) {
      // eslint-disable-next-line
        const summ = products.reduce((accumulator, item) => {
        return accumulator + item.product.basePrice * item.number;
      }, 0);

      return summ;
    },
    getPretyDate(deliveryDate) {
      return this.qDate.formatDate(deliveryDate, 'HH:mm DD.MM');
    },
    addDeliveryMan(deliveryMan) {
      this.$axios.post('/api/today_shift/add_delivery_man', {
        deliveryManParams: {
          user: deliveryMan,
          deviceId: this.deviceId,
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

            const deliveryMenServer = JSON.parse(data.todayShift.delivery_men_json);
            this.activeDeliveryMen = this.$toCamelCase(deliveryMenServer);
            this.routeSheets.push(this.$toCamelCase(data.routeSheet));
          }
        })
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
    removeDeliveryMan(deliveryMan) {
      this.$axios.post('/api/today_shift/remove_delivery_man', {
        deliveryMan,
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
            const deliveryMenServer = JSON.parse(data.todayShift.delivery_men_json);
            this.activeDeliveryMen = this.$toCamelCase(deliveryMenServer);
          }
        })
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
    addOrderToDeliveryMan(params) {
      const { order, routeSheet } = params;

      this.$axios.post(`/api/route_sheet/${routeSheet.id}/add_order`, {
        order,
      })
        .then(({ data }) => {
          const routeSheetServer = this.$toCamelCase(data.routeSheet);

          this.routeSheets.forEach((item, index) => {
            if (item.id === routeSheetServer.id) {
              this.routeSheets[index].orders.splice(0,
                this.routeSheets[index].orders.length, ...routeSheetServer.orders);
            }
          });
          this.orders.forEach((orderItem, index) => {
            if (orderItem.id === order.id) {
              this.orders[index].routeSheets.splice(0,
                this.orders[index].routeSheets.length, routeSheetServer);
            }
          });
        });
    },
    removeOrderToDeliveryMan(params) {
      const { order, routeSheet } = params;

      this.$axios.post(`/api/route_sheet/${routeSheet.id}/remove_order`, {
        order,
      })
        .then(({ data }) => {
          const routeSheetServer = this.$toCamelCase(data.routeSheet);

          this.routeSheets.forEach((item, index) => {
            if (item.id === routeSheetServer.id) {
              this.routeSheets[index].orders.splice(0,
                this.routeSheets[index].orders.length, ...routeSheetServer.orders);
            }
          });
          this.orders.forEach((orderItem, index) => {
            if (orderItem.id === order.id) this.orders[index].routeSheets = [];
          });
        });
    },
  },
  mounted() {
    this.$axios.get('/api/orders')
      .then(({ data }) => {
        const camelData = this.$toCamelCase(data.orders);
        this.orders.splice(0, this.orders.length, ...camelData);
      });
    this.$axios.get('/api/statuses')
      .then(({ data }) => {
        const camelData = this.$toCamelCase(data.statuses);
        this.statuses.splice(0, this.statuses.length, ...camelData);
      });
    this.$axios.get('/api/deliverymen')
      .then(({ data }) => {
        const camelData = this.$toCamelCase(data.deliveryMen);
        this.deliveryMen.splice(0, this.deliveryMen.length, ...camelData);
      });
    this.$axios.get('/api/today_shift')
      .then(({ data }) => {
        const camelData = this.$toCamelCase(data.todayShift);
        const deliveryMenServer = JSON.parse(camelData.deliveryMenJson);
        this.activeDeliveryMen = this.$toCamelCase(deliveryMenServer);
      });

    // достаем активные маршруты
    this.$axios.get('/api/active_route_shits')
      .then(({ data }) => {
        const routeSheet = this.$toCamelCase(data.routeSheet);
        this.routeSheets = routeSheet;
      });
  },
};
</script>

<style scoped>

</style>
