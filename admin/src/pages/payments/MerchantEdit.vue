<template >
    <div class="q-pa-md">
        <div class="text-h6">Мерчант</div>
    <q-form
            class="q-gutter-y-md"
    >
        <div class="row q-col-gutter-md">
            <div class="col-4">
                <q-input v-model="merchant.name" label="Название для клиентов"/>
            </div>
        </div>
        <div class="row q-col-gutter-md">
            <div class="col-4">
                <q-input v-model="merchant.user_name" label="Имя пользователя"/>
            </div>

            <div class="col-4">
                <q-input v-model="merchant.pass"
                         label="Пароль"
                         :type="hidePass ? 'password' : 'text'" hint="Password with toggle">
                    <template v-slot:append>
                        <q-icon
                                :name="hidePass ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="hidePass = !hidePass"
                        />
                    </template>
                </q-input>
            </div>
        </div>
        <div class="row">
            <div class="col-8">
                <q-input
                        outlined
                        v-model="merchant.description"
                        label="Описание (внутренее)"
                        type="textarea"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <q-toggle
                        label="Активно на сайте"
                        v-model="merchant.isActiveSite"
                        color="amber"
                />
                <q-toggle
                        label="Активно в приложении"
                        v-model="merchant.isActiveApp"
                        color="amber"
                />
            </div>
        </div>
        <errorAlert
                :massageText="alert.massageText"
                :massageType="alert.massageType"
                :show="alert.show"
        ></errorAlert>
        <div class="row">
            <div class="col-4">
                <q-btn color="primary" @click='createEntity' label="Сохранить"/>
            </div>
            <div class="col-grow" v-if="edit"></div>
            <div class="col-4 row justify-end" v-if="edit">
                <q-btn color="negative" @click='deletEntity(product.id)'
                       label="Удалить"/>
            </div>
        </div>
    </q-form>
    </div>
</template >

<script >
import errorAlert from '../../components/common/ErrorAlert.vue';

export default {
  name: 'MerchantEdit',
  comments: {
    errorAlert,
  },
  data() {
    return {
      hidePass: true,
      merchant: {
        name: null,
        user_name: null,
        pass: null,
        description: null,
        isActiveSite: false,
        isActiveApp: false,
      },
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    createEntity() {
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
    },
    deletEntity(entityId) {
      this.$axios.delete(`/api/product/${entityId}`)
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
</script >

<style scoped >

</style >
