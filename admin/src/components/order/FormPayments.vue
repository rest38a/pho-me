<template>
    <div>
        <div class="row">
            <div>
                <h5 class="q-mt-sm q-mb-sm">Оплата</h5>
            </div>
        </div>
        <div class="row">
            <div class="col-9">
                <div class="row q-col-gutter-lg">
                    <div class="col-3">Тип</div>
                    <div class="col-3">Сумма</div>
                    <div class="col-3">Оплачено</div>
                </div>
                <div class="row q-col-gutter-lg"
                     v-for="paymentItem in currentOrder.payments"
                     :key="paymentItem.id"
                >
                    <div class="col-3">
                        {{ paymentItem.type.name }}
                    </div>
                    <div class="col-3">
                        {{ paymentItem.sum }}
                    </div>
                    <div class="col-auto">
                        <q-toggle
                                v-model="paymentItem.isPay"
                                color="amber"
                        />
                    </div>
                    <div class="col-auto">
                        <q-btn color="white"
                               text-color="black"
                               @click='removePaymentAction(paymentItem)' label="Х"/>
                    </div>
                </div>
                <div class="row q-col-gutter-lg">
                    <div class="col-3">
                        <q-select outlined
                                  dense
                                  ref="payment"
                                  v-model="type"
                                  :rules="[ val => !!val || 'Обязательное поле' ]"
                                  option-label="name"
                                  :options="paymentTypes" label="тип оплаты"/>
                    </div>
                    <div class="col-3">
                        <q-input outlined
                                 ref="paymentSum"
                                 :rules="[ val => !!val || 'Не может быть пустым' ]"
                                 mask="#########"
                                 option-label="name"
                                 v-model="sum" dense label="руб/%"/>
                    </div>
                    <div class="col-3">
                        <q-toggle
                                v-model="isPay"
                                color="amber"
                        />
                    </div>
                </div>
                <div class="row q-my-md">
                    <q-btn color="primary"
                           outline
                           @click='proxyAddPayment'
                           label="добавить тип оплаты"/>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="col-6">Общая сумма</div>
                    <div class="col-6"> {{ totalSum }}</div>
                </div>
                <div class="row">
                    <div class="col-6">Итого скидка</div>
                    <div class="col-6"> {{ totalDiscount }}</div>
                </div>
                <div class="row">
                    <div class="col-6">Итого к оплате</div>
                    <div class="col-6"> {{ totalSum - totalDiscount }}</div>
                </div>
                <div class="row" v-if="toPayStill !== 0">
                    <div class="col-6">разница</div>
                    <div class="col-6">
                        {{ toPayStill }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'FormPayments',
  data() {
    return {
      formHasError: false,
      paymentTypes: [
        {
          id: 1,
          name: 'Наличные',
        },
        {
          id: 2,
          name: 'Карта при получении',
        },
        {
          id: 3,
          name: 'Скидка',
        },
      ],
    };
  },
  computed: {
    ...mapState('order', ['currentOrder', 'newPayment']),
    ...mapGetters('order', [
      'totalDiscount',
      'totalSum',
      'totalToPay',
      'toPayStill',
    ]),
    type: {
      get() {
        return this.newPayment.type;
      },
      set(type) {
        this.setNewPaymentType(type);
      },
    },
    sum: {
      get() {
        return this.newPayment.sum;
      },
      set(sum) {
        this.setNewPaymentSum(sum);
      },
    },
    isPay: {
      get() {
        return this.newPayment.isPay;
      },
      set(isPay) {
        this.setNewPaymentIsPay(isPay);
      },
    },

  },
  methods: {
    ...mapMutations('order', [
      'addPayment',
      'fillOrder',
      'setNewPaymentType',
      'setNewPaymentSum',
      'setNewPaymentIsPay',
      'resetNewPayment',
    ]),
    ...mapActions('order', [
      'createClient',
      'saveOrder',
      'removePaymentAction',
    ]),
    proxyAddPayment() {
      this.$refs.payment.validate();
      this.$refs.paymentSum.validate();

      if (this.$refs.payment.hasError || this.$refs.paymentSum.hasError) {
        this.formHasError = true;
      } else {
        const copyNewPayment = { ...this.newPayment };
        this.resetNewPayment();
        this.addPayment(copyNewPayment);
        this.setNewPaymentSum(this.toPayStill);
      }
      setTimeout(() => this.$refs.payment.resetValidation(), 10);
    },

  },
};
</script>

<style scoped>

</style>
