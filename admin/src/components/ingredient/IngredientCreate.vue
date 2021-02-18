<template>
    <div class="q-pa-md">
        <h5>{{edit ? 'Редактирование': 'Содание'}} ингредиета</h5>
        <q-form
                class="q-gutter-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="ingredient.name" label="Название"/>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-input v-model="ingredient.sortIndex" label="Сортировка"/>
                </div>
            </div>
            <q-toggle
                    label="Можно убирать"
                    v-model="ingredient.isMutable"
                    color="amber"
            />
            <errorAlert
                    :massageText="alert.massageText"
                    :massageType="alert.massageType"
                    :show="alert.show"
            ></errorAlert>
            <div class="row">
                <div class="col-4">
                    <q-btn color="primary" @click='createIngredient' label="Сохранить"/>
                </div>
            </div>
        </q-form>

    </div>
</template>

<script>

import errorAlert from '../common/ErrorAlert.vue';

export default {
  name: 'IngredientCreate',
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
      ingredient: {
        id: null,
        name: null,
        sortIndex: 500,
        isMutable: true,
      },
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    createIngredient() {
      this.$axios.post('/api/ingredient', { ingredient: this.ingredient })
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
  mounted() {
    if (this.edit) {
      this.$axios.get(`/api/ingredient/${this.$route.params.id}`)
        .then(({ data }) => {
          data = this.$toCamelCase(data);
          this.ingredient = data.ingredient;
        });
    }
  },
};
</script>

<style scoped>

</style>
