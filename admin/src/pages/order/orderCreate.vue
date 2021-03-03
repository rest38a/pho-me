<template>
    <div class="q-pa-md">
        <q-form
        >
            <h4>
                <span v-if="currentOrder.id === null">Новый заказ</span>
                <span v-else>Заказ номер {{currentOrder.id }}</span>
            </h4>
            <div class="row q-gutter-md">
                <div class="col-4">
                    <form-phone/>
                    <form-address
                            v-if="currentOrder.clientInfo.client.id !== null"
                    />
                    <div class="row q-my-xl">
                        <div class="col-4">
                            <q-btn color="primary"
                                   @click='proxySaveOrder()'
                                   label="Сохранить"/>
                        </div>
                        <div class="col-grow" v-if="edit"></div>
                        <div class="col-4 row justify-end" v-if="edit">
                            <q-btn color="negative" @click='deletCategory(category.id)'
                                   label="Удалить"/>
                        </div>

                        <div class="col-4 row justify-end" v-if="edit">
                            <q-btn color="negative" @click='sendToIiko'
                                   label="Отправить в iiko"/>
                        </div>
                        <div class="col-4 row justify-end" v-if="edit">
                            <q-btn color="negative" @click='statusFromIiko'
                                   label="Статус"/>
                        </div>
                    </div>
                </div>
                <q-separator vertical/>
                <div class="col-7">
                    <form-products/>
                    <form-payments/>
                </div>
                <div>
                    <div>Ошибка:</div>
                    <div>{{currentOrder.error}}</div>
                    <div>Запрос:</div>
                    <div>{{currentOrder.fullQuery}}</div>
                </div>
            </div>
        </q-form>
    </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';
import keysToCamel from '../../helpers/toCamelCase';
import FormPhone from '../../components/order/FormPhone';
import FormAddress from '../../components/order/FormAddress';
import FormProducts from '../../components/order/FormProducts';
import FormPayments from '../../components/order/FormPayments';

export default {
  name: 'orderCreate',
  components: {
    FormPayments,
    FormProducts,
    FormAddress,
    FormPhone,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.edit) {
      // eslint-disable-next-line
        this.$axios.get(`/api/order/${this.$route.params.id}`)
        .then(({ data }) => {
          this.fillOrder(keysToCamel(data.order));
          this.setAddress(data.order.address);
        });
    }
  },
  data() {
    return {
      allFormValid: false,
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  computed: {
    ...mapState('order', ['currentOrder']),
    ...mapGetters('order', [
      'clientFormHasError',
      'productFormHasError',
      'productFormIsEmpty',
      'toPayStill',
      'paymentFormIsDirty',
    ]),
  },
  methods: {
    ...mapMutations('order', [
      'fillOrder',
    ]),
    ...mapActions('order', [
      'saveOrder',
    ]),
    createNotify(text, colorType = 'negative') {
      this.$q.notify({
        message: text,
        color: colorType,
        position: 'bottom-left',
        multiLine: true,
        actions: [
          { label: 'Ok', color: 'black', handler: () => { /* ... */ } },
        ],
      });
    },
    sendToIiko() {
      this.$axios.post(`/api/iiko/order-send/${this.currentOrder.id}`)
        .then(() => {
          // console.log(data);
        });
    },
    statusFromIiko() {
      this.$axios.post(`/api/iiko/order/info/${this.currentOrder.id}`)
        .then(() => {
          // console.log(data);
        });
    },
    proxySaveOrder() {
      if (this.clientFormHasError) {
        this.createNotify('Вы не выбрали или не сохранили нового клиента');
      } else if (this.currentOrder.deliveryInfo.type === process.env.DELIVERY_TYPE_LIST.DELIVERY
        && this.currentOrder.clientInfo.address.id === null) {
        this.createNotify('Вы не выбрали адрес доставки');
      } else if (this.productFormIsEmpty) {
        this.createNotify('Вы не добавили ни одного блюда в заказ. Такие заказы нам не нужны');
      } else if (this.productFormHasError) {
        this.createNotify('Вы не добавили последнее блюдо в заказ. Очистите форму если не собираетесь добавлять его.');
      } else if (this.toPayStill !== 0) {
        this.createNotify('Сумма перечисленных способом оплат не достаточна чтобы перекрыть стоимость заказа');
      } else if (this.paymentFormIsDirty) {
        this.createNotify('Форма оплаты содержит не сохраненные данные. Добавить выбранный тип оплаты или очистите форму');
      } else {
        this.saveOrder();

        this.$q.notify({
          message: 'Заказ успешно сохранен!',
          color: 'warning',
          textColor: 'black',
          position: 'bottom-left',
          multiLine: true,
          actions: [
            { label: 'Ok', color: 'black', handler: () => { /* ... */ } },
            // todo сделать принудальное обновление страницы и очистку стора
            { label: 'Создать новый', color: 'black', handler: () => { /* ... */ } },
          ],
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
