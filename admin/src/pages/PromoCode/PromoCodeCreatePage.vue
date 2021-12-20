<template>
  <div class="q-pa-md">
    <router-view/>
    <h5>Создание промокода</h5>
    <q-form
      class="q-gutter-lg"
    >
      <div class="row q-gutter-md">
        <div class="col-4">
          <q-input outlined
                   v-model="promoCode.value"
                   label="Промокод"/>
        </div>
        <div class="col-4">
          <q-select outlined
                    v-model="promoCode.product"
                    option-label="name"
                    option-value="id"
                    :options="products" label="Продукт"/>
        </div>
      </div>
      <div class="row q-gutter-md">
        <div class="col-2">
          <q-input v-model="promoCode.limit" label="Максимальное колличество"/>
        </div>
        <div class="col-2">
          <q-input v-model="promoCode.discount" label="Скидка в %"/>
        </div>
        <div class="col-4">
          <q-input v-model="promoCode.minSum" label="Мин Сумма заказа для активации"/>
        </div>
      </div>
      <div class="row q-gutter-md">
        <div class="col-3">
          <q-input outlined
                   label="Дата окончания(включительно)"
                   v-model="promoCode.dateFinish"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy"
                               transition-show="scale"
                               transition-hide="scale">
                  <q-date v-model="promoCode.dateFinish"
                          mask="DD.MM.YYYY"
                          @input="() => $refs.qDateProxy.hide()"/>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <div class="row q-gutter-md">
        <div class="col-3">
          <div>Время начала</div>
          <q-input outlined
                   type="time"
                   v-model="promoCode.timeStart"
          />
        </div>
        <div class="col-3">
          <div>Время окончания</div>
          <q-input outlined
                   type="time"
                   v-model="promoCode.timeFinish"
          />
        </div>
      </div>
      <q-toggle
        label="Активен"
        v-model="promoCode.isActive"
        color="amber"
      />
      <errorAlert
        :massageText="alert.massageText"
        :massageType="alert.massageType"
        :show="alert.show"
      ></errorAlert>
      <div class="row">
        <div class="col-4">
          <q-btn color="primary" @click='createPromocode' label="Сохранить"/>
        </div>
        <div class="col-grow" v-if="edit"></div>
        <div class="col-4 row justify-end" v-if="edit">
          <q-btn color="negative" @click='deletePromocode(promoCode.id)'
                 label="Удалить"/>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import errorAlert from '../../components/common/ErrorAlert.vue';

export default {
  name: 'PromoCodeCreatePage',
  components: {
    errorAlert,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      promoCode: {
        id: null,
        value: null,
        limit: 0,
        product: null,
        discount: 100,
        minSum: 500,
        dateFinish: null,
        timeStart: null,
        timeFinish: null,
        isActive: true,
        isDelete: false,
        description: null,
      },
      products: [],
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    createPromocode() {
      if (this.promoCode.id !== null) {
        this.$axios.put('/api/promocode', { promoCode: this.promoCode })
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
          .catch((error) => {
            console.log(error);
            this.alert.show = true;
            this.alert.massageText = 'Возникли проблемы при сохранении';
            this.alert.massageType = 'error';
          });
      } else {
        this.$axios.post('/api/promocode', { promoCode: this.promoCode })
          .then(({ data }) => {
            if (data.error !== undefined) {
              this.alert.show = true;
              this.alert.massageText = data.error;
              this.alert.massageType = 'error';
            } else {
              this.promoCode.id = data.promoCode.id;
              this.alert.show = true;
              this.alert.massageText = data.massage;
              this.alert.massageType = 'success';
            }
          })
          .catch((error) => {
            console.log(error);
            this.alert.show = true;
            this.alert.massageText = 'Возникли проблемы при сохранении';
            this.alert.massageType = 'error';
          });
      }
    },
    deletePromocode() {
      this.$axios.post('/api/promocode/delete', { promoCode: this.promoCode })
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
        .catch((error) => {
          console.log(error);
          this.alert.show = true;
          this.alert.massageText = 'Возникли проблемы при удалении';
          this.alert.massageType = 'error';
        });
    },
  },
  mounted() {
    if (this.edit) {
      this.$axios.get(`/api/promocode/${this.$route.params.id}`)
        .then(({ data }) => {
          this.promoCode = this.$toCamelCase(data.promoCode);
        });
    }
    this.$axios.get('/api/product')
      .then(({ data }) => {
        this.products.splice(0, this.products.length, ...data.products);
      });
  },
};
</script>

<style scoped>

</style>
