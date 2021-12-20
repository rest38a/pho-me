<template>
    <q-page class="">
      <router-view/>
        <q-table
                title="Подразделения"
                :data="departments"
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
                           @click="editFeedback(props.row.id)"/>
                </q-td>
            </template>
        </q-table>
        <q-btn color="primary" class='fixed-bottom-right q-ma-md' label="Добавить"
               @click="createItem"/>
    </q-page>
</template>

<script>
import { date } from 'quasar';
import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'DepartmentPage',
  mounted() {
    this.getOrders();
    this.$axios.get('/api/departments')
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
          label: 'ID',
          align: 'left',
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: 'name',
          label: 'Название',
          align: 'center',
          field: 'name',
        },
        {
          name: 'isActive',
          align: 'center',
          label: 'Работает',
          field: (row) => (row.isActive === 0 ? ' нет' : 'да'),
        },
        {
          name: 'edit',
          align: 'center',
          label: 'редактировать',
          field: 'edit',
        },
      ],
      departments: [],
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
    editFeedback(feedbackId) {
      this.$router.push(`/department/${feedbackId}`);
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
    createItem() {
      this.$router.push('/department/create');
    },
    getOrders() {
      this.isLoading = true;
      this.$axios.get('/api/departments/')
        .then(({ data }) => {
          const camelData = keysToCamel(data.departments);
          this.departments.splice(0, this.departments.length, ...camelData);
          this.alertSearch.massageType = 'success';
          this.alertSearch.massageText = 'Отзывы успешно подгружены';
          this.alertSearch.show = true;
          this.isLoading = false;
        }).catch(() => {
          this.alertSearch.massageType = 'error';
          this.alertSearch.massageText = 'Возникла ошибка. Попробуйте уменьшить период. или проверьте корректность даты';
          this.alertSearch.show = true;
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>

</style>
