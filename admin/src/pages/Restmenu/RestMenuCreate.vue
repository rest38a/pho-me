<template>
    <div class="q-pa-md">
        <h5>Создание меню ресторана</h5>
        <q-form
                class="q-gutter-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="restMenu.name" label="Название"/>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-input
                            outlined
                            v-model="restMenu.code"
                            label="Код"
                            type="textarea"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-input v-model="restMenu.sortIndex" label="Сортировка"/>
                </div>
            </div>
            <q-toggle
                    label="Активен"
                    v-model="restMenu.isActive"
                    color="amber"
            />
            <errorAlert
                    :massageText="alert.massageText"
                    :massageType="alert.massageType"
                    :show="alert.show"
            ></errorAlert>
            <div class="row">
                <div class="col-4">
                    <q-btn color="primary" @click='createPromotion' label="Сохранить"/>
                </div>
                <div class="col-grow" v-if="edit"></div>
                <div class="col-4 row justify-end" v-if="edit">
                    <q-btn color="negative" @click='deletePromotion(restMenu.id)'
                           label="Удалить"/>
                </div>
            </div>
        </q-form>
    </div>
</template>

<script>
import errorAlert from '../../components/common/ErrorAlert.vue';
import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'RestMenuCreate',
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
      this.$axios.get(`/api/rest-menu/${this.$route.params.id}`)
        .then(({ data }) => {
          this.restMenu = keysToCamel(data.restMenu);
        });
    }
  },
  data() {
    return {
      restMenu: {
        id: null,
        name: null,
        comment: null,
        code: null,
        sortIndex: 500,
        isActive: true,
        isDelete: false,
      },
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    createPromotion() {
      this.$axios.post('/api/rest-menu', { restMenu: this.restMenu })
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
    deletePromotion(productId) {
      this.$axios.delete(`/api/rest-menu/${productId}`)
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
