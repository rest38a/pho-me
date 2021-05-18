<template>
  <q-page class="main-container">
    <div class="row items-center q-col-gutter-lg">
      <div class="col-auto row">
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="startId" label="первый id"> </q-input>
        </div>
        <div class="q-pa-md" style="max-width: 300px">
          <q-input filled v-model="endId" label="последний id"> </q-input>
        </div>

        <!--                <q-toggle-->
        <!--                        label="Только сегодня"-->
        <!--                        v-model="onlyToday"-->
        <!--                        color="amber"-->
        <!--                />-->
      </div>
      <div class="col-auto">
        <q-btn color="primary" @click="getOrders(dateStart, dateFinish)">
          <div>обновить</div>
          <div>
            <q-spinner color="white" class="q-ml-md" v-if="loading" />
          </div>
        </q-btn>
      </div>
    </div>
    <q-table
      class="my-sticky-virtscroll-table"
      row-key="index"
      title="Заказы"
      :data="orders"
      :columns="columns"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-btn
          color="primary"
          icon-right="archive"
          label="Export to excel"
          no-caps
          @click="downXls"
        />
      </template>
      <template v-slot:body-cells-composition="props">
        <q-td :props="props">
          <div class="my-table-details">
            {{ getConsist(props.row) }}
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { json2excel } from 'js2excel';
import { date } from 'quasar';

const axios = require('axios').default;
const moment = require('moment');

export default {
  name: 'ReportPage',
  data() {
    return {
      qDate: date,
      dateStart: '10.07.2020',
      dateFinish: '10.07.2020',
      startId: 1,
      endId: 1000000,
      loading: false,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 2,
        rowsPerPage: 20,
        // rowsNumber: xx if getting data from a server
      },
      orders: [],
      orderExport: [],
      columns: [
        {
          name: 'dateCreate',
          label: 'Дата создания',
          field: (row) => this.formatDate(row.created_at),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'dateDelivery',
          label: 'Дата и время доставки',
          field: (row) => this.getTime(row),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'isNearTime',
          label: 'ближайщее',
          field: (row) => (row.can_early ? 'да' : 'нет'),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'phone',
          label: 'Телефон',
          field: (row) => row.phone,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'name',
          label: 'Имя',
          field: (row) => row.client_name,
          format: (val) => `${val}`,
        },
        {
          name: 'address',
          label: 'Адрес',
          field: (row) => row.address,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'total',
          label: 'Итого',
          field: (row) => row.sum_order,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'composition',
          label: 'Состав',
          align: 'left',
          field: (row) => this.getConsist(row),
          sortable: true,
        },
        {
          name: 'personNumber',
          label: 'Кол-во персон',
          align: 'left',
          field: (row) => this.getNumPerson(row),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'promocode',
          label: 'Промокод',
          align: 'left',
          field: (row) => this.getPromocode(row),
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'comment',
          label: 'Комментарий',
          field: (row) => this.getComment(row),
          sortable: true,
        },
      ],
    };
  },
  methods: {
    downXls() {
      // this will be export a excel and the file's name is user-info-data.xlsx
      // the default file's name is excel.xlsx

      const exportList = this.orders.map((item) => {
        const row = {
          'Дата создания': this.formatDate(item.created_at),
          'Дата и время доставки': this.getTime(item),
          ближайщее: item.can_early ? 'да' : 'нет',
          Телефон: item.phone,
          Имя: item.address,
          Итого: item.sum_order,
          Состав: this.getConsist(item),
          'Кол-во персон': this.getNumPerson(item),
          Промокод: this.getPromocode(item),
          Комментарий: this.getComment(item),
        };

        return row;
      });

      try {
        json2excel({
          data: exportList,
          name: 'user-info-data',
          formateDate: 'yyyy/mm/dd',
        });
      } catch (e) {
        console.error('export error');
      }

      // for webpack 3: dynamic import
      // import(/* webpackChunkName: "js2excel" */ 'js2excel').then(({ json2excel }) => {
      //   json2excel({
      //     data,
      //     name: 'test',
      //     formateDate: 'dd/mm/yyyy',
      //   });
      // }).catch((e) => {
      //
      // });
    },
    getOrders() {
      // YYYY-MM-DD
      // const start = moment(this.dateStart, 'DD.MM.YYYY').toDate();
      // const dateStartReq = `${this.qDate.formatDate(start, 'YYYY-MM-DD')} 00:00:00`;

      axios
        .get(
          `${process.env.CLIENT_API_LINK}/orders?id_gte=${this.startId}&id_lte=${this.endId}&_limit=999`,
        ).then(({ data }) => {
          this.orders = [...data];
        });
    },
    parseString(order) {
      if (order.id < 2357) {
        const arrayPrepare = order.comment.split('РїСЂРѕРґСѓРєС‚С‹');
        let products = [];
        if (arrayPrepare[1] !== undefined) {
          products = JSON.parse(arrayPrepare[1].substring(2));
        }
        let comment = '';
        if (arrayPrepare[0] !== undefined) {
          comment = arrayPrepare[0].split(':')[1].substring(1);
        }
        return {
          comment,
          products,
        };
      }
      return JSON.parse(order.comment);
    },
    getTime() {
      return '';
    },
    getConsist(order) {
      const { products } = this.parseString(order);
      let stringProduct = '';
      for (let i = 0; i < products.length; i += 1) {
        stringProduct += `${products[i].name} ${products[i].count},\n`;
      }

      return stringProduct;
    },
    getNumPerson() {},
    getPromocode() {
      return '';
    },
    getComment(order) {
      const { comment } = this.parseString(order);

      // eslint-disable-next-line
      if (comment === 'null ' || comment === null) {
        return '';
      }

      return comment;
    },
    formatDate(dateStr) {
      return moment(new Date(dateStr)).format('DD.MM.YYYY hh:mm'); // November 26th 2020, 2:51:15 pm
    },
  },
  mounted() {
    const today = new Date();
    const yesterday = this.qDate.addToDate(today, { hours: -24 });
    this.dateStart = this.qDate.formatDate(yesterday, 'DD.MM.YYYY');
    this.dateFinish = this.qDate.formatDate(today, 'DD.MM.YYYY');
    this.getOrders();
  },
};
</script>

<style scoped>
.my-table-details {
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
.q-table--no-wrap td {
  white-space: pre-wrap;
}
</style>
