<template>
    <div>
        <q-input
                outlined
                dense
                clearable
                unmasked-value
                ref="phone"
                @clear="resetClient"
                type="tel"
                :loading="loadingPhone"
                :value="currentOrder.clientInfo.phoneString"
                @input="searchPhone"
                @blur="blurForm"
                label="Телефон"
                mask="+7 (###) ###-##-##"
                :rules="[ val => val && val.length === 10 || 'В номере должно быть 11 цифр']"
                fill-mask
        />
        <div class="autocomplete" v-if="hintShow">
            <div class="autocomplete-item"
                 v-for="itemPhoneHint in phoneHint"
                 :key="itemPhoneHint.phone"
                 @click="choosePhone(itemPhoneHint)"
            >
                {{ itemPhoneHint.phone }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex';

export default {
  name: 'PhoneAutocompete',
  data() {
    return {
      phones: [],
      phoneHint: this.phones,
      hintShow: false,
      loadingPhone: false,
    };
  },
  mounted() {
    this.$axios.get('/api/phones')
      .then(({ data }) => {
        this.phones = this.$toCamelCase(data.phones);
      });
  },
  // Asf358355
  computed: {
    ...mapState('order', ['currentOrder']),
  },
  methods: {
    ...mapMutations('order', ['setPhone', 'setClient', 'setPhoneString', 'setAddress']),
    ...mapActions('order', ['getClient']),
    searchPhone(phoneString) {
      this.setPhoneString(phoneString);
      this.hintShow = true;
      const phoneHintAll = this.phones.filter((v) => v.phone.toLowerCase()
        .indexOf(phoneString) > -1);
      this.phoneHint = phoneHintAll.slice(0, 7);
    },
    choosePhone(phone) {
      this.hintShow = false;
      this.setPhoneString(phone.phone);
      this.getClient(phone.userId);
      this.setPhone(phone);
    },
    resetClient() {
      // todo перенести этот метод в стор. из-за него связанность растет
      this.hintShow = false;
      const client = {
        id: null,
        name: null,
        hash: '123',
      };
      this.setPhone(null);
      this.setAddress({ id: null });
      this.setClient(client);
      setTimeout(() => { this.hintShow = false; }, 10);
    },
    blurForm() {
      setTimeout(() => {
        this.showHint = false;
      }, 500);
    },
  },
};
</script>

<style scoped>
    .autocomplete {
        position: absolute;
        width: 180px;
        background: #fff;
        z-index: 100;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2),
        0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    }

    .autocomplete-item{
        padding: 10px 20px;
    }

    .autocomplete-item:hover {
        background: #d4d4d4;

    }
</style>
