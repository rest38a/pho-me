<template>
    <div class="q-pa-md">
        <q-form
                class="q-gutter-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="category.name" label="Название"/>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-input v-model="category.sortIndex" label="Сортировка"/>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                <q-select v-model="category.cardId"
                          map-options
                          emit-value
                          :options="cardTypes" label="Тип карточки" />
                </div>
            </div>
            <q-toggle
                    label="Активен"
                    v-model="category.isActive"
                    color="amber"
            />
            <errorAlert
                    :massageText="alert.massageText"
                    :massageType="alert.massageType"
                    :show="alert.show"
            ></errorAlert>
            <div class="row">
                <div class="col-4">
                    <q-btn color="primary" @click='createCategory' label="Сохранить"/>
                </div>
                <div class="col-grow" v-if="edit"></div>
                <div class="col-4 row justify-end" v-if="edit">
                    <q-btn color="negative" @click='deletCategory(category.id)'
                           label="Удалить"/>
                </div>
            </div>
        </q-form>

    </div>
</template>

<script>
import errorAlert from '../common/ErrorAlert.vue';
import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'CategoryCreate',
  components: {
    errorAlert,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.edit) {
      this.$axios.get(`/api/category/${this.$route.params.id}`)
        .then(({ data }) => {
          this.category = keysToCamel(data.category);
        });
    }
  },
  data() {
    return {
      category: {
        id: null,
        name: null,
        sortIndex: 500,
        isActive: true,
        isDelete: false,
        cardId: 1,
      },
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
      cardTypes: [{
        label: 'Стандартная',
        id: 1,
        value: 1,
      },
      {
        label: 'Большая',
        id: 2,
        value: 2,
      }],
    };
  },
  methods: {
    createCategory() {
      this.$axios.post('/api/category', { category: this.category })
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
    deletCategory(productId) {
      this.$axios.delete(`/api/category/${productId}`)
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
