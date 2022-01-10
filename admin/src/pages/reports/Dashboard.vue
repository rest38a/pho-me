<template>
  <div class="row dashboard-page ">
    <div v-if="currentTime < 2397"
         class="column col-4 q-mr-md dashboard-block justify-between q-pa-xl text-center">
      <div class="row col-2">
        <div class=" plan-text col-12 ">План на месяц</div>
        <div class="col-12 row justify-between">
          <div class="col-5 plan-number-main ">
            <nobr>{{ new Intl.NumberFormat('ru-RU').format(getMonthDonesPlan) }} ₽</nobr>
          </div>
          <div class="col-5 plan-number ">
            <nobr>{{ new Intl.NumberFormat('ru-RU').format(staffBoard.monthPlan) }} ₽</nobr>
          </div>
        </div>
      </div>
      <div class="col-8 relative-position">
<!--        <div class="q-pa-md flex flex-center">-->
<!--          <q-knob-->
<!--            v-model="value"-->
<!--            show-value-->
<!--            size="90px"-->
<!--            :thickness="0.22"-->
<!--            style="color: conic-gradient( #FCD000 0deg, #CA17A8 260deg)!important;"-->
<!--            track-color="lime-3"-->
<!--            class="text-lime q-ma-md"-->
<!--          />-->
<!--        </div>-->
        <div class=" absolute-center">
        <svg focusable="false"
             viewBox="56.17977528089887 56.17977528089887 112.35955056179775 112.35955056179775"
             class="circul"
             style="transform: rotate3d(0, 0, 1, 275deg);">
          <defs>
            <linearGradient id="gradient" x1="1%" y1="17%" x2="6%" y2="100%">
              <stop offset="30%" stop-color="#CA17A8" />
              <stop offset="50%" stop-color="#FCD000" />
            </linearGradient>
          </defs>
          <circle fill="transparent" stroke="currentColor"
                  stroke-dashoffset="0"
                  stroke-width="13.359550561797752" stroke-dasharray="314"
                  cx="112.35955056179775" cy="112.35955056179775" r="50"
                  class="circle-outline"
                  style="transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"></circle>
          <circle fill="transparent" stroke="url(#gradient)"
                  :stroke-dashoffset="314.16 - (getGraficPercent * Math.PI)"
                  stroke-width="12.359550561797752" stroke-dasharray="309"
                  cx="112.35955056179775" cy="112.35955056179775" r="50"
                  class=" " stroke-linecap="round"
                  style="transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;"></circle>
        </svg>
      </div>
        <div class="absolute-center full-width">
            <div class="grafic-plan-text">План на день</div>
            <div class="grafic-plan-done">
            {{ new Intl.NumberFormat('ru-RU').format(getTodayDonesPlan) }} ₽</div>
          <div class="grafic-plan">
            из {{ new Intl.NumberFormat('ru-RU').format(getTodayPlan) }} ₽</div>
          </div>
      </div>
      <div class="row col-2">
        <div class="grafic-plan row justify-between col-12">
          <div>Кухня</div>
          <div>Бар</div>
        </div>
        <q-linear-progress :value="kitchenPercent" size="13px"
                           style="hight: 13px"
                           animation-speed="300"
                           rounded color="purple-4" track-color="yellow-14" class=""/>
        <div class="row justify-between col-12 grafic-plan-text ">
          <div>{{ getMonthFoodPercent('Фо Ми Кухня') }} %</div>
          <div>{{ getMonthFoodPercent('Фо Ми Бар') }} %</div>
        </div>
        <div class="row justify-between col-12 grafic-plan">
          <div>{{ new Intl.NumberFormat('ru-RU').format(getMonthFoodSum('Фо Ми Кухня')) }} ₽</div>
          <div>{{ new Intl.NumberFormat('ru-RU').format(getMonthFoodSum('Фо Ми Бар')) }} ₽</div>
        </div>
      </div>
    </div>
    <div  v-if="currentTime < 2397" class="column col-grow justify-between">
      <div class="row  " >
        <div class="col-3 q-mr-md dashboard-block q-pa-sm text-center">
          <div v-if="timeColor === '#ca17a8'" class="time-text">Время до обновления</div>
          <div v-else class="time-text">Ожидание обновления</div>
          <div :style="{color: `${timeColor}`}"
               class="time">{{ Math.floor(currentTime / 60) }} : {{ currentTime % 60 }}</div>
        </div>
        <div
          class="col-grow row dashboard-block q-px-md justify-between content-center items-center">
          <div class="second-piece-main-title q-mr-md">Блюд приготовлено сегодня:</div>
          <div class="row items-center">
            <div class="second-piece-under-title q-mr-sm">Кухня</div>
            <div class="second-piece-main-title-non-italic">
              {{ new Intl.NumberFormat('ru-RU').format(getCookedFood('kitchen')) }}</div>
          </div>
          <div class="row items-center">
            <div class="second-piece-under-title q-mr-sm">Бар</div>
            <div class="second-piece-main-title-non-italic">
              {{ new Intl.NumberFormat('ru-RU').format(getCookedFood('bar')) }}</div>
          </div>
        </div>
      </div>
      <div class="row  col-4">
        <div class="column col  q-mr-md dashboard-block q-pa-lg ">
          <div class="second-piece-main-title q-mb-mb">Лидер месяца</div>
          <div v-if="getLeader('month').length !== 0" class="leader-box">
          <div class="row q-mb-xs leader-list items-baseline"
               v-for="(leader, index) in getLeader('month')" :key="index">
            <div class="col-7 leader">{{index + 1}}.&nbsp;&nbsp;
              {{ (leader[0]).replace(/[0-9]/g, '') }}</div>
            <div class="col-4 leader">{{ new Intl.NumberFormat('ru-RU').format(leader[1]) }} ₽</div>
            <div v-if="index === 0" class="col-1">
              <img src="../../assets/crown.svg">
            </div>
          </div>
            </div>
          <div v-else class="q-mt-lx leader-list">В этом месяце продаж не было :(</div>
        </div>
        <div class="column col dashboard-block q-pa-lg">
          <div class="second-piece-main-title  q-mb-mb">Лидер дня</div>
          <div v-if="getLeader('day').length !== 0" class="leader-box justify-between">
          <div class="q-mb-xs row leader-list items-baseline"
               v-for="(leader, index) in getLeader('day')" :key="index">
            <div class="col-7 leader">{{index + 1}}.&nbsp;&nbsp;
              {{ (leader[0]).replace(/[0-9]/g, '') }}</div>
            <div class="col-4 leader">{{ new Intl.NumberFormat('ru-RU').format(leader[1]) }} ₽</div>
            <div v-if="index === 0" class="col-1">
              <img src="../../assets/crown.svg">
            </div>
          </div>
          </div>
          <div v-else class="q-mt-lx leader-list">За сегодняшний день продаж не было :(</div>
        </div>
      </div>
      <div class="row  col-4 ">
        <div class="column col  q-mr-md dashboard-block q-px-lg q-pt-lg ">
          <div class="second-piece-main-title q-mb-md">Старт лист</div>
          <div class="product-list-box justify-between">
            <div class="q-mb-xs row items-baseline"
                 v-for="(product, index) in staffBoard.startList" :key="index">
              <div class="col-8">{{+index}}.&nbsp;&nbsp;
                {{ getProductName(product.iikoId) }} </div>
            </div>
          </div>
        </div>
        <div class="column col dashboard-block  q-px-lg q-pt-lg">
          <div class="second-piece-main-title  q-mb-md">Стоп лист</div>
          <div class="product-list-box justify-between">
            <div class="q-mb-xs row items-baseline"
                 v-for="(product, index) in stopList" :key="index">
              <div class="col-7">{{index + 1}}.&nbsp;&nbsp;
                {{ getProductName(product.productId) }} </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row ">
        <div class="row col-12 dashboard-block justify-between text-center content-center q-pa-md">
          <div class="row col-4 items-center">
            <div class="second-piece-under-title q-mr-sm">Доставка:</div>
            <div class="second-piece-main-title-non-italic">
              {{ new Intl.NumberFormat('ru-RU').format(getDayFoodSum('DELIVERY_BY_COURIER')) }} ₽
            </div>
          </div>
          <div class="row col-4 items-center">
            <div class="second-piece-under-title q-mr-sm">Самовывоз:</div>
            <div class="second-piece-main-title-non-italic">
              {{ new Intl.NumberFormat('ru-RU').format(getDayFoodSum('DELIVERY_PICKUP')) }} ₽
            </div>
          </div>
          <div class="row col-4 items-center">
            <div class="second-piece-under-title q-mr-sm">Зал:</div>
            <div class="second-piece-main-title-non-italic">
              {{ new Intl.NumberFormat('ru-RU').format(getDayFoodSum('COMMON')) }} ₽
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column absolute-center text-center" style="color: #ca17a8"
      v-if="currentTime > 2397"><nobr>
      <q-spinner-bars color="purple" size="5em"/>
      <h3>Ожидайте... Происходит обновление данных</h3>
      <q-spinner-bars color="purple" size="5em"/>
    </nobr>
    </div>
  </div>
</template>

<script>
const moment = require('moment');

export default {
  name: 'Dashboard',
  data() {
    return {
      currentTime: 2400,
      timer: null,
      staffReport: [],
      foodReport: [],
      today: null,
      kitchenPercent: null,
      stopList: [],
      iikoProducts: [],
      timeColor: '#ca17a8',
      isLoad: false,
      staffBoard: {
        name: 'Мотивационный',
        startList: {},
        dayPlan: {},
        monthPlan: null,
      },
    };
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer();
        this.currentTime = 2400;
        this.startTimer();
      }
    },
  },
  mounted() {
    this.getToday();
    this.getProducts();
    this.getFillDashboardInfo();
    this.getStopList();
    this.getDashboardOlap();
    this.startTimer();
  },
  destroyed() {
    this.stopTimer();
  },
  methods: {
    getDashboardOlap() {
      this.$axios.get('/api/iiko/dashboard-olap')
        .then(({ data }) => {
          const foodCamelData = this.$toCamelCase(JSON.parse(data.answer.foodReport.data));
          this.foodReport.splice(0, this.foodReport.length, ...foodCamelData);
          const staffCamelData = this.$toCamelCase(JSON.parse(data.answer.staffReport.data));
          this.staffReport.splice(0, this.foodReport.length, ...staffCamelData);
        })
        .catch((e) => {
          console.log('error', e);
          this.timeColor = '#ff4f00';
          this.stopTimer();
          this.startTimer();
        });
    },
    getStopList() {
      this.$axios.get('/api/iiko/stop-list')
        .then(({ data }) => {
          if (data.answer.stopList.length > 0) {
            this.stopList = data.answer.stopList[0].items;
          }
        })
        .catch((e) => {
          console.log('error', e);
          this.timeColor = '#ff4f00';
          // this.startTimer();
        });
    },
    getFillDashboardInfo() {
      this.$axios.get('/api/dashboard/get-data?dashboardId=1')
        .then(({ data }) => {
          const dayPlan = JSON.parse(data.info[0].day_plan);
          this.staffBoard.dayPlan = dayPlan;
          const startList = JSON.parse(data.info[0].start_list);
          this.staffBoard.startList = startList;
          const monthPlan = JSON.parse(data.info[0].month_plan);
          this.staffBoard.monthPlan = monthPlan;
          this.isLoad = true;
        })
        .catch((e) => {
          console.log('error', e);
          this.timeColor = '#ff4f00';
          // this.startTimer();
        });
    },
    getProducts() {
      this.$axios.get('/api/iiko/product-name')
        .then(({ data }) => {
          const foodCamelData = this.$toCamelCase(data.iikoProducts);
          this.iikoProducts.splice(0, this.iikoProducts.length, ...foodCamelData);
        })
        .catch((e) => {
          console.log('error', e);
          this.timeColor = '#ff4f00';
        });
    },
    getToday() {
      this.today = moment(new Date())
        .format('YYYY-MM-DD');
    },
    getCookedFood(type) {
      let amount = null;
      if (type === 'kitchen') {
        amount = this.foodReport.filter((item) => item['Store.Name'] === 'Фо Ми Кухня' && item['OpenDate.Typed'].includes(this.today) === true)
          .reduce((sum, current) => sum + current.DishAmountInt, 0);
      } else {
        amount = this.foodReport.filter((item) => item['Store.Name'] === 'Фо Ми Бар' && item['OpenDate.Typed'].includes(this.today) === true)
          .reduce((sum, current) => sum + current.DishAmountInt, 0);
      }
      return amount;
    },
    getDayFoodSum(type) {
      let foodSum = null;
      if (type === 'DELIVERY_PICKUP') {
        foodSum = this.foodReport.filter((item) => item.OrderServiceType === 'DELIVERY_PICKUP' && item['OpenDate.Typed'].includes(this.today) === true)
          .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      } else if (type === 'COMMON') {
        foodSum = this.foodReport.filter((item) => item.OrderServiceType === 'COMMON' && item['OpenDate.Typed'].includes(this.today) === true)
          .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      } else {
        foodSum = this.foodReport.filter((item) => item.OrderServiceType === 'DELIVERY_BY_COURIER' && item['OpenDate.Typed'].includes(this.today) === true)
          .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      }
      return foodSum.toFixed(2);
    },
    getMonthFoodSum(type) {
      let amount = null;
      if (type === 'Фо Ми Кухня') {
        amount = this.foodReport.filter((item) => item['Store.Name'] === 'Фо Ми Кухня')
          .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      } else {
        amount = this.foodReport.filter((item) => item['Store.Name'] === 'Фо Ми Бар')
          .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      }
      return amount;
    },
    getMonthFoodPercent(type) {
      const summa = this.foodReport.reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      const sumOfType = this.getMonthFoodSum(type);
      const percent = (sumOfType * 100) / summa;
      if (type === 'Фо Ми Кухня') {
        this.kitchenPercent = percent.toFixed(0) / 100;
      }
      return percent.toFixed(2);
    },
    getLeader(type) {
      let staffList = null;
      if (type === 'month') {
        staffList = this.staffReport
          .filter((item) => item.WaiterName !== 'Пользователь для централизованной доставки')
          .reduce((acc, it) => ({
            ...acc,
            [it.WaiterName]: (+(acc[it.WaiterName] || 0) + it.DishDiscountSumInt).toFixed(2),
          }),
          {});
      } else {
        staffList = this.staffReport
          .filter((item) => item['OpenDate.Typed'].includes(this.today) === true && item.WaiterName !== 'Пользователь для централизованной доставки')
          .reduce((acc, it) => ({
            ...acc,
            [it.WaiterName]: (+(acc[it.WaiterName] || 0) + it.DishDiscountSumInt).toFixed(2),
          }),
          {});
      }
      const result = Object.entries(staffList).sort((a, b) => b[1] - a[1]).splice(0, 8);
      return result;
    },
    getProductName(id) {
      const foundProduct = this.iikoProducts.find((item) => item.iikoId === id);
      return foundProduct ? foundProduct.name : 'Такого блюда больше нет';
    },
    startTimer() {
      this.timeColor = '#ca17a8';
      this.getToday();
      this.getProducts();
      this.getFillDashboardInfo();
      this.getStopList();
      this.getDashboardOlap();
      this.timer = setInterval(() => {
        this.currentTime -= 1;
      }, 1000);
    },
    stopTimer() {
      clearTimeout(this.timer);
    },
  },
  computed: {
    getTodayDonesPlan() {
      const donesPlan = this.foodReport.filter((item) => item['OpenDate.Typed'].includes(this.today) === true)
        .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      return donesPlan.toFixed(2);
    },
    getTodayPlan() {
      const day = moment(new Date()).format('DD');
      const foundDay = this.staffBoard.dayPlan[day];
      return foundDay;
    },
    getMonthDonesPlan() {
      const donesPlan = this.foodReport
        .reduce((sum, current) => sum + current.DishDiscountSumInt, 0);
      return donesPlan.toFixed(0);
    },
    getGraficPercent() {
      const percent = (this.getTodayDonesPlan * 100) / this.getTodayPlan;
      return percent.toFixed(0) > 100 ? 100 : percent.toFixed(0);
    },
  },
};
</script>

<style scoped lang="scss">
.dashboard-page {
  background-color: #e5e5e5;
  width: 100%;
  height: 100%;
  padding: 20px 20px;
  color: #333333;
}

.dashboard-block {
  background-color: white;
  border-radius: 20px;
}

.plan-text {
  font-size: 40px;
  font-style: italic;
  font-family: lb;
}

.plan-number-main {
  font-family: ttbold;
  font-size: 26px;
  font-style: italic;
}

.plan-number {
  font-family: tr;
  font-size: 26px;
  font-style: italic;
}

.grafic-plan-text {
  font-size: 18px;
  font-family: lb;
  font-style: italic;
}

.grafic-plan-done {
  font-family: lb;
  color: #ca17a8;
  font-size: 38px;
  font-style: italic;
}

.grafic-plan {
  font-family: tr;
  font-size: 18px;
  font-style: italic;
}

.grafic {
  position: absolute;
  top: 0;
  bottom: 0;
}

.time-text {
  font-family: lcm;
  color: #ca17a8;
  font-size: 16px;
}

.time {
  font-family: ttbold;
  font-size: 28px;
  line-height: 26px;
}

.second-piece-main-title {
  font-family: lb;
  font-style: italic;
  font-size: 22px;
}

.second-piece-main-title-non-italic {
  font-family: ttbold;
  font-size: 22px;
}

.second-piece-under-title {
  font-family: tr;
  font-size: 19px;
  color: rgba(0, 0, 0, 0.5);
}

/*.diagram {*/
/*  height: 200px;*/
/*  width: 200px;*/
/*  border-radius: 50%;*/
/*  background-image: conic-gradient(#FCD000 0deg, #CA17A8 260deg);*/
/*  !*-webkit-mask-image: radial-gradient(circle at center, transparent 67%, white 68%);*!*/
/*  mask-image: radial-gradient(circle at center, transparent 57%, white 58%);*/
/*}*/

.gradient {
/*  display:block;*/
/*  width: 100px;*/
/*  height:100px;*/
/*  border-radius:50%;*/
/*  border-top:1px solid #000;*/
  background: conic-gradient(from 180deg at 50% 50%, #FCD000 0deg, #CA17A8 360deg);
/*  color: #F6F6F6;*/
/*  transform: rotate(-180deg);*/
}

.circle-outline {
  color: #F6F6F6;
}

/*.diagram {*/
/*  background: radial-gradient(circle closest-side, #333 10px,
white 11px, white 30px, green 31px);*/
/*  height: 70px;*/

/*}*/

.circul {
  width: 350px;
  height: 350px;
}

.q-circular-progress--indeterminate .q-circular-progress__svg {
  transform-origin: 50% 50%;
  -webkit-animation: q-spin 2s linear infinite;
  animation: q-spin 2s linear infinite
}

.q-circular-progress__circle {
  stroke-dasharray: 1 400;
  stroke-dashoffset: 0;
  -webkit-animation: q-circular-progress-circle 1.5s ease-in-out infinite;
  animation: q-circular-progress-circle 1.5s ease-in-out infinite;
}

@-webkit-keyframes q-circular-progress-circle {
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0
  }
  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100
  }
  to {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -300
  }
}

@keyframes q-circular-progress-circle {
  0% {
    stroke-dasharray: 1, 400;
    stroke-dashoffset: 0
  }
  50% {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -100
  }
  to {
    stroke-dasharray: 400, 400;
    stroke-dashoffset: -300
  }
}

.leader-box .leader-list:first-child {
  font-family: ttbold;
  font-size: 18px;
}
.leader-list .leader:nth-child(2) {
    color: #ABABAB;
}

.leader-list {
  font-family: lcm;
  font-size: 16px;
  font-weight: 500;
}

.product-list-box {
  font-family: lcm;
  font-size: 16px;
  font-weight: 500;
}

</style>
