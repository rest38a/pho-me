<template >
    <div class="q-pa-md q-gutter-sm">
        <h4 class="q-mt-md q-mb-sm">Блюда из IIko</h4>
        <div class="text-caption text-weight-thin">
           Дата обновления {{getDateUpdate(iikoCategories)}}
        </div>
        <q-tree
                :nodes="iikoCategories"
                node-key="label"
        >
            <template v-slot:header-generic="prop">
                <div class="row items-center">
                    <div class="q-pr-lg"
                         :class="prop.node.is_active ? '' : 'disabled-pizza'" >
                        {{ prop.node.label }}
                    </div>
<!--                    <q-btn color="primary"-->
<!--                           size="xs"-->
<!--                           round-->
<!--                           class="q-pa-xs"-->
<!--                           icon="edit"-->
<!--                           @click='editProduct(prop.node.type,prop.node.id)'/>-->
                </div>
            </template>
        </q-tree>

        <h4 class="q-mt-md q-mb-sm">Типы оплат из IIko</h4>
        <div class="text-caption text-weight-thin">
            Дата обновления {{getDateUpdate(iikoPayments)}}
        </div>
        <q-tree
                :nodes="iikoPayments"
                node-key="label"
        >
            <template v-slot:header-generic="prop">
                <div class="row items-center">
                    <div class="q-pr-lg"
                         :class="prop.node.is_active ? '' : 'disabled-pizza'" >
                        {{ prop.node.label }}
                    </div>
                </div>
            </template>
        </q-tree>
        <h4 class="q-mt-md q-mb-sm">Скидки из IIko</h4>
        <div class="text-caption text-weight-thin">
            Дата обновления {{getDateUpdate(iikoDiscounts)}}
        </div>
        <q-tree
                :nodes="iikoDiscounts"
                node-key="label"
        >
            <template v-slot:header-generic="prop">
                <div class="row items-center">
                    <div class="q-pr-lg"
                         :class="prop.node.is_active ? '' : 'disabled-pizza'" >
                        {{ prop.node.label }}
                    </div>
                </div>
            </template>
        </q-tree>
        <errorAlert
                v-on:close="alert.show = false"
                :massageText="alert.massageText"
                :massageType="alert.massageType"
                :show="alert.show"
        ></errorAlert>
        <q-btn @click="updateIIkoMenu"
               :loading="isProductLoading"
               label="обновить данные меню из Iiko"></q-btn>
        <q-btn @click="updateIIkoDiscount"
               :loading="isDiscountLoading"
               label="обновить скидки из Iiko"></q-btn>
        <q-btn @click="updateIIkoPayment"
               :loading="isPaymentsLoading"
               label="обновить типы оплат из Iiko"></q-btn>
<!--        <q-btn @click="updateIIkoDepartments"-->
<!--               label="обновить подразделения из Iiko"></q-btn>-->
<!--        <q-btn @click="getIikoOrders"-->
<!--               label="получить заказы"></q-btn>-->
<!--        <q-btn @click="checkIntegrety"-->
<!--               label="Проверить целостность данных"></q-btn>-->
    </div>
</template >

<script >
import errorAlert from './common/ErrorAlert.vue';

export default {
  name: 'MenuIiko',
  components: {
    errorAlert,
  },
  data() {
    return {
      iikoProducts: [],
      iikoCategories: [],
      iikoPayments: [],
      iikoDiscounts: [],
      iikoDepartments: [],
      isProductLoading: false,
      isPaymentsLoading: false,
      isDiscountLoading: false,
      isDepartmentLoading: false,
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    getDateUpdate(entiities) {
      if (entiities.length > 0) {
        return entiities[0].created_at.toString().substr(0, 10);
      }
      return '';
    },
    getChildren(iikoId) {
      return this.iikoProducts.filter((item) => item.parentGroup === iikoId);
    },
    updateIIkoMenu() {
      this.isProductLoading = true;
      this.alert.show = false;
      this.$axios.get('/api/iiko/menu/update')
        .then(({ data }) => {
          if (data.error === undefined) {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';

            this.iikoCategories = [...data.iikoCategory];
            this.iikoProducts = [...data.iikoProducts];

            this.iikoProducts.forEach((item) => {
              item.label = item.name;
              item.header = 'generic';
            });

            this.iikoCategories.forEach((item) => {
              item.label = item.name;
              item.header = 'generic';
              item.children = this.getChildren(item.iiko_id);
            });
          } else {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          }
          this.isProductLoading = false;
          // data = this.$toCamelCase(data);
          // console.log(data);
        }).catch((error) => {
          this.isProductLoading = false;
          this.alert.show = true;
          this.alert.massageText = error.toString();
          this.alert.massageType = 'error';
        });
    },
    updateIIkoPayment() {
      this.isPaymentsLoading = true;
      this.alert.show = false;
      this.$axios.get('/api/iiko/payment/update')
        .then(({ data }) => {
          if (data.error === undefined) {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';

            this.iikoPayments = [...data.answer];

            this.iikoPayments.forEach((item) => {
              item.label = item.name;
              item.header = 'generic';
            });
          } else {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          }
          this.isPaymentsLoading = false;
        })
        .catch((error) => {
          this.isPaymentsLoading = false;
          this.alert.show = true;
          this.alert.massageText = error.toString();
          this.alert.massageType = 'error';
        });
    },
    getIikoOrders() {
      this.$axios.get('/api/iiko/orders')
        .then(() => {
          // console.log(data);
          // data = this.$toCamelCase(data);
        });
    },
    updateIIkoDiscount() {
      this.isDiscountLoading = true;
      this.alert.show = false;

      this.$axios.get('/api/iiko/discount/update')
        .then(({ data }) => {
          if (data.error === undefined) {
            this.alert.show = true;
            this.alert.massageText = data.massage;
            this.alert.massageType = 'success';

            this.iikoDiscounts = [...data.answer];
            this.iikoDiscounts.forEach((item) => {
              item.label = item.name;
              item.header = 'generic';
            });
          } else {
            this.alert.show = true;
            this.alert.massageText = data.error;
            this.alert.massageType = 'error';
          }
          this.isDiscountLoading = false;
        })
        .catch((error) => {
          this.isDiscountLoading = false;
          this.alert.show = true;
          this.alert.massageText = error.toString();
          this.alert.massageType = 'error';
        });
    },
    updateIIkoDepartments() {
      this.$axios.get('/api/iiko/departments')
        .then(() => {
          // console.log(data);
          // data = this.$toCamelCase(data);
        });
    },
    checkIntegrety() {
      console.log('мяу');
    },
    editProduct(aa) {
      console.log(aa);
    },
  },
  mounted() {
    this.$axios.get('/api/iiko/data')
      .then(({ data }) => {
        this.iikoCategories = [...data.iikoCategory];
        this.iikoProducts = [...data.iikoProducts];
        this.iikoDiscounts = [...data.iikoDiscount];

        this.iikoPayments = [...data.iikoPayments];

        this.iikoPayments.forEach((item) => {
          item.label = item.name;
          item.header = 'generic';
        });

        this.iikoDiscounts.forEach((item) => {
          item.label = item.name;
          item.header = 'generic';
        });

        this.iikoProducts.forEach((item) => {
          item.label = item.name;
          item.header = 'generic';
        });

        this.iikoCategories.forEach((item) => {
          item.label = item.name;
          item.header = 'generic';
          item.children = this.getChildren(item.iiko_id);
        });
      });
  },
};
</script >

<style scoped >

</style >
