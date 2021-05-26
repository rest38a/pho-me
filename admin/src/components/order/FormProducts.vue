<template>
    <div>
        <div class="row">
            <div>
                <h5 class="q-mt-none">Состав</h5>
            </div>
        </div>
        <div class="row q-col-gutter-md text-caption text-center text-grey">
            <div class="col-3">блюдо</div>
            <div class="col">модификаторы</div>
            <div class="col-1">кол-во</div>
            <div class="col-1">цена</div>
            <div class="col">скидка</div>
            <div class="col">коммент.</div>
            <div class="col"></div>
        </div>
        <div class="row text-center q-col-gutter-lg items-center"
             v-for="(productItem, index) in currentOrder.products" :key="index">
            <div class="col-3">
                {{productItem.product.name}}
            </div>
            <div class="col">
                <span v-if="productItem.modifiers.main.product !== undefined">
                    {{ productItem.modifiers.main.product.name }}
                </span>
              <span v-if="productItem.modifiers.size.product !== undefined">
                    {{ productItem.modifiers.size.product.name }}
                </span>
            </div>
            <div class="col-1">
                {{productItem.number}}
            </div>
            <div class="col-1">
                <span v-if="productItem.product !== null">
                    <span v-if="productItem.discount.rub > 0">
                        <span class="old-price">
                            {{ getFinalPrice(productItem) }}
                        </span><br>
                        <span class="">
                            {{ getFinalPrice(productItem) - productItem.discount.rub  }}
                        </span>
                    </span>
                    <span v-else>{{ getFinalPrice(productItem) }}</span>
                </span>
            </div>
            <div class="col">
                {{productItem.discount.string}}
            </div>
            <div class="col">
                {{productItem.comment}}
            </div>
            <div class="col">
                <q-btn color="white"
                       text-color="black"
                       @click='removeProductAction(productItem)'
                       label="Х"/>
            </div>
        </div>
        <div class="row q-col-gutter-lg items-start text-center">
            <div class="col-3">
                <q-select outlined
                          dense
                          clearable
                          @clear="resetNewProduct"
                          :value="newProduct.product"
                          @input="chooseProduct"
                          :options="activeProduct"
                          error-message="Вы не выбрали блюдо"
                          :error="!isValidProduct"
                          option-label="name"
                          label="Блюдо"/>
            </div>
            <div class="col">
                <q-select outlined
                          dense
                          :value="newProduct.modifiers.main"
                          @input="setModifier"
                          :option-label="(item) => getName(item)"
                          option-value="product"
                          v-if="mainModifiers.length > 0"
                          :options="mainModifiers"
                          error-message="Вы не выбрали модификатор"
                          :error="!isValidModifiers"
                          label="Модификаторы"/>
            </div>
            <div class="col-1">
                <q-input outlined
                         dense
                         :value="newProduct.number"
                         @input="setNumber"
                         mask="###"
                         error-message="Укажите кол-во"
                         :error="!isValidNumber"
                         label=""/>
            </div>
            <div class="col-1 text-center">
                            <span v-if="newProduct.product !== null">
                                <span v-if="newProduct.discount.rub > 0">
                                    <span class="old-price">
                                        {{ newProduct.product.basePrice }}
                                    </span><br>
                                    <span class="">
                                        {{ newProduct.product.basePrice - newProduct.discount.rub }}
                                    </span>
                                </span>
                                <span v-else>{{ newProduct.product.basePrice }}</span>
                            </span>
            </div>
            <div class="col">
                <q-input outlined
                         dense
                         :value="newProduct.discount.string"
                         @input="prepairDiscount"
                         :error="!isValidDiscount"
                         error-message="Cлишком большая скидка"
                         label="руб/%"/>
            </div>
            <div class="col">
                <q-input outlined
                         dense
                         v-model="newProduct.comment"
                         label="коммент"/>
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row q-my-md">
            <q-btn outline
                   color="primary"
                   @click='proxyAddProduct'
                   label="добавить блюдо"/>
        </div>
    </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
} from 'vuex';

export default {
  name: 'FormProducts',
  mounted() {
    this.$axios.get('/api/product')
      .then(({ data }) => {
        this.products = this.$toCamelCase(data.products);
      });
  },
  data() {
    return {
      products: [],
      isValidModifiers: true,
      isValidProduct: true,
      isValidNumber: true,
      isValidDiscount: true,
      newProduct: {
        product: null,
        number: 1,
        discount: {
          string: null,
          rub: 0,
          quantity: null,
          type: 'rub',
        },
        modifiers: {
          main: { product: {} },
          size: { product: {} },
          add: [],
        },
        comment: null,
        hash: (new Date()).getTime(),
      },
    };
  },
  computed: {
    ...mapState('order', ['currentOrder']),
    ...mapGetters('order', [
      'toPayStill',
    ]),
    activeProduct() {
      return this.products.filter((item) => item.isActive === 1);
    },
    mainModifiers() {
      if (this.newProduct.product?.modifiers === undefined) return [];
      return this.newProduct.product?.modifiers?.filter((item) => {
        if (item.type === undefined) return true;
        if (item.type === 'main') return true;
        return false;
      });
    },
    sizeModifiers() {
      if (this.newProduct.product?.modifiers === undefined) return [];
      return this.newProduct.product?.modifiers?.filter((item) => {
        if (item.type === 'size') return true;
        return false;
      });
    },
    addModifiers() {
      if (this.newProduct.product?.modifiers === undefined) return [];
      return this.newProduct.product?.modifiers?.filter((item) => {
        if (item.type === 'add') return true;
        return false;
      });
    },
    finalPrice() {
      let preparePrice = this.newProduct.product.basePrice;

      if (this.newProduct.modifiers.main.addPrice !== undefined) {
        preparePrice += +this.userModifiers.main.addPrice;
      }
      if (this.newProduct.modifiers.size.addPrice !== undefined) {
        preparePrice += +this.userModifiers.size.addPrice;
      }
      for (let i = 0; i < this.newProduct.modifiers.add.length; i += 1) {
        preparePrice += this.newProduct.modifiers.add[i].product.basePrice;
      }

      return preparePrice;
    },
  },
  watch: {
    newProduct: {
      handler(val) {
        if (val.product === null) {
          this.setIsNewProductClean(true);
        } else {
          this.setIsNewProductClean(false);
        }
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations('order', [
      'addProduct',
      'setNewPaymentSum',
      'setIsNewProductClean',
    ]),
    ...mapActions('order', ['removeProductAction']),
    getName(modifierItem) {
      if (modifierItem.product?.name !== undefined) return modifierItem.product.name;
      return '';
    },
    getFinalPrice(productItem) {
      let finalPrice = productItem.product.basePrice;

      if (productItem.modifiers
        && productItem.modifiers.main
        && productItem.modifiers.main.addPrice) {
        finalPrice += +productItem.modifiers.main.addPrice;
      }

      if (productItem.modifiers
        && productItem.modifiers.size
        && productItem.modifiers.size.addPrice) {
        finalPrice += +productItem.modifiers.size.addPrice;
      }

      if (productItem.modifiers
        && productItem.modifiers.add
        && productItem.modifiers.add.length > 0) {
        for (let i = 0; i < productItem.modifiers.add.length; i += 1) {
          const priceStep = productItem.modifiers.add[i].product.basePrice;
          finalPrice += +priceStep;
        }
      }

      return finalPrice;
    },
    async chooseProduct(product) {
      this.isValidProduct = true;
      const productCopy = { ...product };
      this.resetModifiers();
      this.newProduct.product = productCopy;
    },
    resetModifiers() {
      this.newProduct.modifiers = {
        main: { product: {} },
        size: { product: {} },
        add: [],
      };
    },
    setModifier(modifier, type = 'main') {
      if (type !== 'add') {
        this.newProduct.modifiers[type] = modifier;
      } else {
        let needIndex = null;
        this.newProduct.modifiers.add.forEach((item, index) => {
          if (item.product.id === modifier.product.id) needIndex = index;
        });

        if (needIndex === null) {
          this.newProduct.modifiers.add.push(modifier);
        } else {
          this.newProduct.modifiers.add.splice(needIndex, 1);
        }
      }
    },
    // chooseModifier(value) {
    //   this.newProduct.modifiers = value;
    //   this.isValidModifiers = true;
    // },
    checkValidModifiers() {
      if (this.newProduct.product.modifiers.length > 0 && this.newProduct.modifiers === null) {
        this.isValidModifiers = false;
        return false;
      }
      this.isValidModifiers = true;
      return true;
    },
    checkValidProduct() {
      if (this.newProduct.product === null) {
        this.isValidProduct = false;
        return false;
      }
      this.isValidProduct = true;
      return true;
    },
    checkValidNumber() {
      const { number } = this.newProduct;
      if (number === null || number === 0 || number === '' || number === '0') {
        this.isValidNumber = false;
      } else {
        this.isValidNumber = true;
      }

      return this.isValidNumber;
    },
    checkValidDiscount() {
      const productPrice = this.newProduct.product.basePrice;
      if (this.newProduct.discount.rub > productPrice) {
        this.isValidDiscount = false;
        return false;
      }
      this.isValidDiscount = true;
      return true;
    },
    setNumber(number) {
      this.newProduct.number = number;
      this.checkValidNumber();
    },
    proxyAddProduct() {
      // todo очень разные способы добавления блюда в заказ на фронте и тут.
      // todo надо привести к единному формату по возможности
      if (this.checkValidProduct() && this.checkValidModifiers() && this.checkValidNumber()) {
        this.addProduct(this.newProduct);
        this.setNewPaymentSum(this.toPayStill);
        this.resetNewProduct();
      }
    },
    resetNewProduct() {
      this.newProduct = {
        product: null,
        number: 1,
        discount: {
          string: null,
          quantity: null,
          type: 'rub',
        },
        modifiers: {},
        comment: null,
        hash: (new Date()).getTime(),
      };
    },
    prepairDiscount(discountString) {
      if (discountString.indexOf('%') === -1) {
        this.newProduct.discount = {
          string: discountString,
          rub: +discountString,
          quantity: +discountString,
          type: 'rub',
        };
      } else {
        const quantity = discountString.replace(/\D/, '');
        const productPrice = this.newProduct.product.basePrice;
        const discountSum = Math.floor((productPrice / 100) * quantity);
        this.newProduct.discount = {
          string: discountString,
          rub: discountSum,
          quantity: +quantity,
          type: 'percent',
        };
      }
      this.checkValidDiscount();
    },
  },
};
</script>

<style scoped>
    .old-price {
        text-decoration: line-through;
        color: #828282;
        font-size: 12px;
    }
</style>
