<template>
    <div>
        <div>
            <h5 class="q-mt-none">Информация по заказу</h5>
        </div>
        <div class="row q-col-gutter-md text-caption text-center text-grey">
            <div class="col-4">телефон</div>
        </div>
        <div class="row items-start q-col-gutter-md">
            <div class="col-5 ">
                <phone-autocompete ref="phone"/>
            </div>
            <div class="col-5">
                <q-input outlined
                         ref="name"
                         :value="currentOrder.clientInfo.client.name"
                         @input="setClientName"
                         :rules="[ val => val && val.length > 0 ||
                                     'Имя не должно быть пустым']"
                         dense
                         label="Имя"/>
            </div>
            <div>
                <q-btn outline
                       v-if="currentOrder.clientInfo.client.id === null"
                       color="primary"
                       @click='proxyCreateClient'
                       icon="save"
                />
            </div>
        </div>
        <error-alert
                :massageText="allertClientAdd.massageText"
                :massageType="allertClientAdd.massageType"
                :show="allertClientAdd.show"
                v-on:close="allertClientAdd.show = false"
        ></error-alert>
    </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import PhoneAutocompete from '../common/PhoneAutocompete';

export default {
  name: 'FormPhone',
  components: {
    PhoneAutocompete,
  },
  computed: {
    ...mapState('order', ['currentOrder']),
  },
  data() {
    return {
      formPhoneHasError: false,
      allertClientAdd: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    ...mapMutations('order', [
      'setClientName',
    ]),
    ...mapActions('order', [
      'createClient',
    ]),
    proxyCreateClient() {
      this.$refs.phone.$refs.phone.validate();
      this.$refs.name.validate();

      if (this.$refs.phone.hasError || this.$refs.name.hasError) {
        this.formPhoneHasError = true;
      } else {
        const wasAdd = this.createClient();

        if (wasAdd) {
          this.allertClientAdd.show = true;
          this.allertClientAdd.massageText = 'Клиент успешно добавлен';
          this.allertClientAdd.massageType = 'success';
        } else {
          this.allertClientAdd.show = true;
          this.allertClientAdd.massageText = 'Возникли проблемы с созданием клиента';
          this.allertClientAdd.massageType = 'error';
        }
      }
    },
  },
};
</script>

<style scoped>

</style>
