<template>
    <div class="q-pa-md">
        <q-form
                class="q-gutter-y-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="label.name" label="Название"/>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-input v-model="label.sortIndex" label="Сортировка"/>
                </div>
            </div>
            <div class="row q-gutter-x-md">
                <div class="col-2">
                    <div>
                        Цвет фона
                    </div>
                        <q-color v-model="label.bgColor" class="my-picker" />
                </div>
                <div class="col-2">
                    <div>
                        Цвет текста
                    </div>
                    <q-color v-model="label.textColor" class="my-picker" />
                </div>
                <div class="col-2">
                    <div
                            class="body-label"
                            :style="`background-color:${label.bgColor}`">
                        <span class="text-label"
                                :style="`color:${label.textColor}`">{{label.name}}</span>
                    </div>
                </div>
            </div>
            <q-toggle
                    label="Активен"
                    v-model="label.isActive"
                    color="amber"
            />
            <errorAlert
                    :massageText="alert.massageText"
                    :massageType="alert.massageType"
                    :show="alert.show"
            ></errorAlert>
            <div class="row">
                <div class="col-4">
                    <q-btn color="primary" @click='createItem' label="Сохранить"/>
                </div>
                <div class="col-grow" v-if="edit"></div>
                <div class="col-4 row justify-end" v-if="edit">
                    <q-btn color="negative" @click='deletItem(label.id)'
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
      this.$axios.get(`/api/label/${this.$route.params.id}`)
        .then(({ data }) => {
          this.label = keysToCamel(data.label);
          this.label.isActive = this.label.isActive === 1;
        });
    }
  },
  data() {
    return {
      label: {
        id: null,
        name: 'пример',
        sortIndex: 500,
        isActive: true,
        isDelete: false,
        bgColor: '#f5f500',
        textColor: '#000',
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
    createItem() {
      this.$axios.post('/api/label', { label: this.label })
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
      this.$axios.delete(`/api/label/${productId}`)
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
    .body-label{
        display: inline;
        padding: 3px 10px;
    }
    .text-label{
        font-weight: 800;
        text-transform: uppercase;
    }
</style>
