<template>
    <div class="q-pa-md q-gutter-sm">
        <h4 class="q-mt-md q-mb-sm">Блюда</h4>
        <q-tree
                :nodes="categories"
                node-key="label"
        >
            <template v-slot:header-generic="prop">
                <div class="row items-center">
                    <div class="q-pr-lg"
                         :class="prop.node.is_active ? '' : 'disabled-pizza'" >
                        {{ prop.node.label }}

                        <q-icon name="warning"
                                v-if="warningChech(prop.node)"
                                class="text-orange" >
                            <q-tooltip>
                                Товар не связан с продуктом в iiko
                            </q-tooltip>
                        </q-icon>
                    </div>
                    <q-btn color="primary"
                           size="xs"
                           round
                           class="q-pa-xs"
                           icon="edit"
                           @click='editProduct(prop.node.type,prop.node.id)'/>
                </div>
            </template>
        </q-tree>
        <h4 class="q-mt-md q-mb-sm">Ярлычки</h4>
        <q-tree
                :nodes="labels"
                node-key="label"
        >
            <template v-slot:header-generic="prop">
                <div class="row items-center">
                    <div class="q-pr-lg">
                        {{ prop.node.label }}
                    </div>
                    <q-btn color="primary"
                           size="xs"
                           round
                           class="q-pa-xs"
                           icon="edit"
                           @click='editProduct(prop.node.type, prop.node.id)'/>
                </div>
            </template>
        </q-tree>
        <h4 class="q-mt-md q-mb-sm">Ингридиенты</h4>
        <q-tree
                :nodes="ingredients"
                node-key="label"
        >
            <template v-slot:header-generic="prop">
                <div class="row items-center">
                    <div class="q-pr-lg">
                        {{ prop.node.label }}
                    </div>
                    <q-btn color="primary"
                           size="xs"
                           round
                           class="q-pa-xs"
                           icon="edit"
                           @click='editProduct(prop.node.type, prop.node.id)'/>
                </div>
            </template>
        </q-tree>
        <q-btn @click="updateIIkoMenu"
                label="обновить данные меню из Iiko"></q-btn>
        <q-btn @click="updateIIkoDiscount"
               label="обновить скидки из Iiko"></q-btn>
        <q-btn @click="updateIIkoPayment"
               label="обновить типы оплат из Iiko"></q-btn>
        <q-btn @click="getIikoOrders"
               label="получить заказы"></q-btn>
    </div>
</template>

<script>
export default {
  name: 'MenuList',
  mounted() {
    this.$axios.get('/api/backtreeSite')
      .then(({ data }) => {
        this.categories.splice(0, this.categories.length, ...data.categories);
        this.categories.forEach((item) => {
          item.label = item.name;
          item.type = 'category';
          item.header = 'generic';
          item.children = item.products;
          item.children.forEach((itemProduct) => {
            itemProduct.label = itemProduct.name;
            itemProduct.header = 'generic';
            itemProduct.type = 'product';
          });
        });
      });
    this.$axios.get('/api/ingredient')
      .then(({ data }) => {
        data = this.$toCamelCase(data);
        this.ingredients.splice(0, this.ingredients.length, ...data.ingredients);
        this.ingredients.forEach((item) => {
          item.label = item.name;
          item.type = 'ingredient';
          item.header = 'generic';
        });
      });

    this.$axios.get('/api/labels')
      .then(({ data }) => {
        data = this.$toCamelCase(data);
        this.labels.splice(0, this.labels.length, ...data.labels);
        this.labels.forEach((item) => {
          item.label = item.name;
          item.type = 'label';
          item.header = 'generic';
        });
      });
  },
  data() {
    return {
      categories: [],
      selected: '',
      ingredients: [],
      labels: [],
    };
  },
  methods: {
    editProduct(type, idProduct) {
      this.$router.push(`/setting_menu/${type}/${idProduct}`);
    },
    warningChech(node) {
      if (node.type === 'product' && node.iiko_id === null) return true;

      return false;
    },
    updateIIkoMenu() {
      this.$axios.get('/api/iiko/menu/update')
        .then(() => {
          // data = this.$toCamelCase(data);
          // console.log(data);
        });
    },
    updateIIkoPayment() {
      this.$axios.get('/api/iiko/payment/update')
        .then(() => {
          // data = this.$toCamelCase(data);
          // console.log(data);
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
      this.$axios.get('/api/iiko/discount/update')
        .then(() => {
          // console.log(data);
          // data = this.$toCamelCase(data);
        });
    },
  },
};
</script>

<style scoped>
    .disabled-pizza{
        color: #c7c7c7;
        text-decoration: line-through;
    }
</style>
