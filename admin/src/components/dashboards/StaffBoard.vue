<template>
<q-form class="row q-pa-xl">
  <div class="col-3 q-mb-md">{{ getMonthInfo.month.toLocaleUpperCase() }}
  <div class="">
    <div class="col-5 row" v-for="day in 31" :key="day">
      <div  v-if="getMonthInfo.endDay >= day" class="row items-center q-mt-md">
      <div class="q-mr-md col-2">{{ day }}.</div>
        <q-input outlined
                 type="number"
                 class="col-9"
                 v-model="staffBoard.dayPlan[`${day}`]"
                 lazy-rules
                 :rules="[ val => !!val  || 'Заполните план на день']"
                 dense
                 label="План на день, руб"/>
      </div>
    </div>
  </div>
  </div>
  <h4 class="col-3 q-mt-none">План на месяц
    <div>{{ new Intl.NumberFormat('ru-RU').format(monthPlan) }} ₽</div>
    <q-btn push color="primary" class="q-mt-xl"
           type="submit"
           @click="savePlan" label="Сохранить все данные"></q-btn>
    <h6 style="color: red" v-if="error === ''">* Внесите все планы на день</h6>
  </h4>
  <div class="col-3 q-mb-md">Старт лист
    <div class="">
      <div class="col-5 row" v-for="(current, index) in 7" :key="`${index}${current + 40}`">
        <div  class="row items-center col-12 q-mt-md">
          <div class="q-mr-md row col-1">{{ current }}.</div>
          <q-select outlined
                    class="col-10"
                    dense
                    use-input
                    @filter="filterFn"
                    clearable
                    v-model="staffBoard.startList[`${current}`]"
                    :options="filterProduct"
                    option-label="name"
                    label="Что продаём?"/>
        </div>
      </div>
    </div>
  </div>
  <div class="col-3 q-mb-md">Стоп-лист
    <div class="">
      <div class="col-5 row" v-for="(current, index) in 7" :key="`${index}${current + 40}`">
        <div  class="row items-center col-12 q-mt-md">
          <div class="q-mr-md row col-1">{{ current }}.</div>
          <q-select outlined
                    class="col-10"
                    dense
                    use-input
                    @filter="filterFn"
                    clearable
                    v-model="staffBoard.stopList[`${current}`]"
                    :options="filterProduct"
                    option-label="name"
                    label="Что не продаём?"/>
        </div>
      </div>
    </div>
  </div>
</q-form>
</template>

<script>
const moment = require('moment');

export default {
  name: 'StaffBoard',
  data() {
    return {
      error: '',
      iikoProducts: [],
      filterProduct: null,
      staffBoard: {
        name: 'Мотивационный',
        startList: {},
        stopList: {},
        dayPlan: {},
        monthPlan: null,
      },
    };
  },
  methods: {
    filterFn(val, update, abort) {
      if (val.length < 2) {
        abort();
        return;
      }
      update(() => {
        const needle = val.toLowerCase();
        this.filterProduct = this.iikoProducts.filter((v) => {
          if (!v.name) return false;

          return v.name.toLowerCase()
            .replace(/ё/g, 'е')
            .indexOf(needle) > -1;
        });
      });
    },
    savePlan() {
      this.staffBoard.monthPlan = this.monthPlan;
      if (this.staffBoard.dayPlan) {
        this.$axios.put('/api/dashboard/set-data', { dashboardInfo: this.staffBoard })
          .then(({ data }) => {
            console.log(data);
          })
          .catch((e) => {
            console.log('error', e);
          });
      } else {
        this.error = 'Вы не до конца заполнили план на день';
      }
    },
  },
  computed: {
    monthPlan() {
      let sum = 0;
      for (let i = 0; i < 31; i += 1) {
        sum += +this.staffBoard.dayPlan[i + 1] || 0;
      }
      return sum;
    },
    getMonthInfo() {
      const date = new Date();
      const month = moment(date.getMonth() + 1, 'MM').locale('ru').format('MMMM');
      const endOfMonth = moment().endOf('month').format('DD');
      const monthInfo = {
        month,
        endDay: endOfMonth,
      };
      return monthInfo;
    },
  },
  mounted() {
    this.$axios.get('/api/dashboard/get-data?dashboardId=1')
      .then(({ data }) => {
        const dayPlan = JSON.parse(data.info[0].day_plan);
        this.staffBoard.dayPlan = dayPlan;
        const startList = JSON.parse(data.info[0].start_list);
        this.staffBoard.startList = startList;
        const stopList = JSON.parse(data.info[0].stop_list);
        this.staffBoard.stopList = stopList;
      })
      .catch((e) => {
        console.log('error', e);
      });
    this.$axios.get('/api/iiko/product-name')
      .then(({ data }) => {
        const foodCamelData = this.$toCamelCase(data.iikoProducts);
        this.iikoProducts.splice(0, this.iikoProducts.length, ...foodCamelData);
      })
      .catch((e) => {
        console.log('error', e);
      });
  },
};
</script>

<style scoped>

</style>
