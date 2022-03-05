<template>
    <div class="q-pa-md">
        <q-tabs
                v-model="tab"
                class="text-teal"
                align="left"
        >
            <q-tab name="main" label="Основное"/>
            <q-tab name="modifiers" label="Модификаторы"/>
            <q-tab name="ingredients" label="Ингридиенты"/>
            <q-tab name="Iiko" label="Iiko"/>
        </q-tabs>
        <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="main">
                <div class="text-h6">Основное</div>
                <q-form
                        class="q-gutter-md"
                        ref="myForm"
                >

                    <div class="row">
                        <div class="col-4">
                            <q-input outlined v-model="product.name" label="Название"/>
                        </div>
                        <div class="col-4">
                            <q-select outlined
                                      v-model="product.category"
                                      option-label="name"
                                      option-value="id"
                                      :rules="[ val => val
                                      || 'Категорию нужно выбрать обязательно' ]"
                                      :options="categories" label="Категория"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <uploadButton
                                    :photo="product.mainPhoto"
                                    :label="'основное фото'"
                                    v-on:upload_photo="val => this.product.mainPhoto = val"
                            ></uploadButton>
                        </div>
                        <div class="col-auto">
                            <uploadButton
                                    :photo="product.secondPhoto"
                                    :label="'дополнительное фото'"
                                    v-on:upload_photo="val => this.product.secondPhoto = val"
                            ></uploadButton>
                        </div>
                        <div class="col-auto">
                            <q-color v-model="product.bgColor" class="my-picker" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-3">
                            <q-input outlined
                                     v-model="product.numberPerson"
                                     label="Это блюдо на * человек"/>
                        </div>
                        <div class="col-3">
                            <q-input outlined v-model="product.weight" label="вес"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <q-input outlined v-model="product.basePrice" label="Базовая цена"/>
                        </div>
                        <div class="col-3">
                            <q-input outlined v-model="product.oldPrice" label="Старая цена"/>
                        </div>
                    </div>
                    <div class="row">
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <q-input outlined v-model="product.calories" label="Каллории"/>
                        </div>
                        <div class="col-3">
                            <q-input outlined v-model="product.protein" label='Белки'/>
                        </div>
                        <div class="col-3">
                            <q-input outlined v-model="product.fat" label="Жиры"/>
                        </div>
                        <div class="col-3">
                            <q-input outlined v-model="product.carbohydrates" label="Углеводы"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">
                            <q-input
                                    outlined
                                    v-model="product.description"
                                    type="textarea"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <q-input outlined v-model="product.sortIndex" label="Сортировка"/>
                        </div>
                    </div>
                    <q-toggle
                            label="Добавить в допродажу"
                            v-model="product.isUpsales"
                            color="amber"
                    />
                    <q-toggle
                            label="Активен"
                            v-model="product.isActive"
                            color="amber"
                    />
                  <q-toggle
                    label="Показывать в меню доставки?"
                    v-model="product.isDeliveryMenu"
                    color="amber"
                  />
                    <errorAlert
                            :massageText="alert.massageText"
                            :massageType="alert.massageType"
                            :show="alert.show"
                    ></errorAlert>
                    <div class="row">
                        <div class="col-4">
                            <q-btn color="primary" @click='createProduct' label="Сохранить"/>
                        </div>
                        <div class="col-grow" v-if="edit"></div>
                        <div class="col-4 row justify-end" v-if="edit">
                            <q-btn color="negative" @click='deletProduct(product.id)'
                                   label="Удалить"/>
                        </div>
                    </div>
                </q-form>
            </q-tab-panel>

            <q-tab-panel name="modifiers">
                <q-form
                        class="q-gutter-md"
                >

                    <modifiers-list
                            ruName="Основные модификаторы"
                            :products="products"
                            type="main"
                            :modifiersList="product.modifiers"
                            :addFunction="addModifier"
                            :removeFunction="removeModifier"
                    />
                    <modifiers-list
                            ruName="Модификаторы размера"
                            :products="products"
                            type="size"
                            :modifiersList="product.modifiers"
                            :addFunction="addModifier"
                            :removeFunction="removeModifier"
                    />
                    <modifiers-list
                            ruName="Добавки"
                            :products="products"
                            type="add"
                            :modifiersList="product.modifiers"
                            :addFunction="addModifier"
                            :removeFunction="removeModifier"
                    />
                    <label-list
                    name="Ярлычки"
                    :productLabels="product.labels"
                    :labels="labels"
                    :addFunction="addLabels"
                    :removeFunction="removeLabels"
                    />
                    <div>

                    </div>
                </q-form>
            </q-tab-panel>

            <q-tab-panel name="ingredients">
                <q-form
                        class="q-gutter-md"
                >
                    <div class="text-h6">Ингридиенты</div>
                    <div class="row items-center"
                         :key="ingredientItem.ingredient"
                         v-for="ingredientItem in product.ingredients">
                        <div class="col-4">
                            {{ ingredientItem.name }}
                        </div>
                        <div class="col-auto q-px-md">
                            {{ ingredientItem.isMutable ? 'изменяемый': 'не изменяемый' }}
                        </div>
                        <div class="col-3">
                            <q-btn color=""
                                   class="text-amber"
                                   cicle
                                   @click='removeIngredient(ingredientItem)' icon="delete"/>
                        </div>
                    </div>
                    <div class="row items-center">
                        <div class="col-3">
                            <q-select outlined
                                      v-model="newIngredient"
                                      option-label="name"
                                      option-value="id"
                                      :options="ingredients" label="Ингридиент"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-3">
                            <q-btn color="primary"
                                   @click='addIngredient' label="Добавить ингридиент"/>
                        </div>
                    </div>
                </q-form>
            </q-tab-panel>
            <q-tab-panel name="Iiko">
                <q-form
                        class="q-gutter-md"
                >
                    <div class="text-h6">Блюдо из iiko</div>
                    <div class="row items-center">
                        <div class="col-3">
                            <q-select outlined
                                      v-model="product.iikoProduct"
                                      emit-value
                                      map-options
                                      use-input
                                      option-label="name"
                                      @filter="filterFn"
                                      :options="iikoSearch" label="Блюдо из айки">
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                            нет резульататов
                                        </q-item-section>
                                    </q-item>
                                </template>
                                <template v-slot:append>
                                    <q-icon
                                            v-if="product.iikoProduct !== null"
                                            class="cursor-pointer"
                                            name="clear"
                                            @click.stop="product.iikoProduct = null"
                                    />
                                </template>
                            </q-select>
                        </div>
                    </div>
                </q-form>
            </q-tab-panel>
        </q-tab-panels>

    </div>
</template>

<script>
import errorAlert from '../common/ErrorAlert.vue';
import uploadButton from '../common/UploadPhotoButton';

import keysToCamel from '../../helpers/toCamelCase';
import ModifiersList from '../modifiers/ModifiersList';
import LabelList from './LabelList';

export default {
  name: 'ProductCreate',
  components: {
    LabelList,
    ModifiersList,
    errorAlert,
    uploadButton,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    // console.log('hui2');
    this.$axios.get('/api/backtreeSite')
      .then(({ data }) => {
        this.categories.splice(0, this.categories.length, ...data.categories);
      });
    this.$axios.get('/api/product')
      .then(({ data }) => {
        this.products.splice(0, this.products.length, ...data.products);

        if (this.edit) {
          // eslint-disable-next-line
            let [product] = this.products.filter((item) => {

            return item.id === +this.$route.params.id;
          });

          this.product = keysToCamel(product);

          if (this.product.isActive === 1) {
            this.product.isActive = true;
          } else {
            this.product.isActive = false;
          }
          // this.product.modifiers = this.getModifiers(this.product.modifiers);
        }
      });
    this.$axios.get('/api/ingredient')
      .then(({ data }) => {
        data = keysToCamel(data);
        this.ingredients.splice(0, this.ingredients.length, ...data.ingredients);
      });
    this.$axios.get('/api/iiko/product')
      .then(({ data }) => {
        data = keysToCamel(data);
        this.iikoProducts.splice(0, this.iikoProducts.length, ...data.iikoProducts);
      });
    this.$axios.get('/api/labels')
      .then(({ data }) => {
        data = keysToCamel(data);
        this.labels.splice(0, this.labels.length, ...data.labels);
      });
  },
  data() {
    return {
      tab: 'main',
      product: {
        isDeliveryMenu: null,
        id: null,
        name: null,
        bgColor: '#ffffff',
        categoryId: null,
        category: '',
        mainPhoto: '',
        secondPhoto: '',
        numberPerson: null,
        iikoId: '',
        basePrice: null,
        oldPrice: null,
        weight: null,
        description: '',
        calories: null,
        labels: [],
        protein: null,
        fat: null,
        carbohydrates: null,
        modifiers: [],
        ingredients: [],
        sortIndex: 500,
        isActive: true,
        isDelete: false,
      },
      labels: [],
      iikoProducts: [],
      iikoSearch: [],
      newIngredient: null,
      isMutableNewIngredient: false,
      products: [],
      categories: [],
      ingredients: [],
      alert: {
        massageText: '',
        massageType: '',
        show: false,
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
        this.iikoSearch = this.iikoProducts.filter((v) => v.name.toLowerCase()
          .indexOf(needle) > -1);
      });
    },
    addLabels(newLabel) {
      this.product.labels.push(newLabel);
    },
    removeLabels(removeItem) {
      this.product.labels = this.product.labels.filter((item) => removeItem.id !== item.id);
    },
    addModifier(newModifier) {
      this.product.modifiers.push(newModifier);
    },
    removeModifier(modifier) {
      if (this.product.id === null) {
        this.product.modifiers = this.product.modifiers.filter((item) => item.id !== modifier.id);
      } else {
        this.$axios.post(`/api/product/${this.product.id}/modifire/${modifier.product.id}/remove`,
          { product: this.product })
          .then(() => {
            // eslint-disable-next-line
              this.product.modifiers = this.product.modifiers.filter((item) => {
              return item.product.id !== modifier.product.id;
            });

            // todo сдеалть уведомление при удалении модификатора
            // на сервере
          })
          .catch(() => {
            // todo сдеалть уведомление при удалении модификатора
            // на сервере
          });
      }
    },
    addIngredient() {
      this.product.ingredients.push(this.newIngredient);
      this.newIngredient = null;
    },
    removeIngredient(ingredient) {
      if (this.product.id === null) {
        // eslint-disable-next-line
          this.product.ingredients = this.product.ingredients.filter((item) => {
          return item.id !== ingredient.id;
        });
      } else {
        this.$axios.post(`/api/product/${this.product.id}/ingredient/${ingredient.id}/remove`,
          { product: this.product })
          .then(() => {
            // eslint-disable-next-line
              this.product.ingredients = this.product.ingredients.filter((item) => {
              return item.id !== ingredient.id;
            });

            // todo сдеалть уведомление при удалении модификатора
            // на сервере
          })
          .catch(() => {
            // todo сдеалть уведомление при удалении модификатора
            // на сервере
          });
      }
    },
    createProduct() {
      this.$refs.myForm.validate().then((success) => {
        if (success) {
          this.$axios.post('/api/product', { product: this.product })
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
            .catch(({ data }) => {
              this.alert.show = true;
              this.alert.massageText = data.error;
              this.alert.massageType = 'error';
            });
        }
      });
    },
    deletProduct(productId) {
      this.$axios.delete(`/api/product/${productId}`)
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
        .catch(({ data }) => {
          this.alert.show = true;
          this.alert.massageText = data.error;
          this.alert.massageType = 'error';
        });
    },
  },
};
</script>

<style scoped>

</style>
