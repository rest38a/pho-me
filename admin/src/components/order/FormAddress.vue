<template>
    <div>
        <div class="row q-py-md">
            <div class="col-6">
                <q-btn-group push>
                    <q-btn @click='setDeliveryType(1)'
                           :class="{'bg-amber':
                                       currentOrder.deliveryInfo.type === 1}"
                           label="Доставка"/>
                    <q-btn @click='setDeliveryType(2)'
                           :class="{'bg-amber':
                                       currentOrder.deliveryInfo.type === 2}"
                           label="Самовывоз"/>
                </q-btn-group>
            </div>
        </div>
        <div v-if="currentOrder.deliveryInfo.type === 1">
            <div class="row ">
                <div class="col-12">
                    <div>Адресс</div>
                    <q-scroll-area style="max-height: 200px; height: 200px" class="address-area">
                        <div v-for="addressItem in
                                    currentOrder.clientInfo.client.addresses"
                             :key="addressItem.id"
                        >
                            <q-radio
                                    v-if="getAddressString(addressItem) !== '' "
                                    :val="addressItem.id"
                                    :value="currentOrder.clientInfo.address.id"
                                    @input="setAddress(addressItem)"
                                    :label="getAddressString(addressItem)"
                                    color="primary"
                            />
                        </div>
                        <!--<q-scroll-observer @scroll="scrollHandler" />-->
                    </q-scroll-area>
                </div>
            </div>
            <div class="row q-col-gutter-md">
                <div class="col-6">
                    <q-select
                            outlined
                            dense
                            :value="newAddress.string"
                            @filter="updateClientAddressString"
                            @input="chooseNewAddress"
                            use-input
                            option-label="value"
                            input-debounce="0"
                            label="Адреес"
                            :options="addressHint"
                    />
                </div>
                <div class="col-2">
                    <q-input outlined
                             v-model="newAddress.apartment"
                             dense label="Квартира"/>
                </div>
                <div class="col-4">
                    <q-input outlined
                             v-model="newAddress.comment"
                             dense label="Комментарий"/>
                </div>
            </div>
            <div class="row q-my-md">
                <div class="col-4">
                    <q-btn outline
                           color="primary"
                           @click='proxySaveAddress'
                           label="Добавить адрес"/>
                </div>

            </div>
        </div>
        <div>
            <h5 class="q-mt-lg q-mb-md">Время
            </h5>
        </div>
        <div class="row q-col-gutter-md ">
            <div class="col-4">
                <q-input outlined
                         :value="currentOrder.deliveryInfo.date"
                         @input="setDate"
                         dense
                         type="date"
                         hint="Дата"/>
            </div>
            <div class="col-3">
                <q-input outlined
                         type="time"
                         :value="currentOrder.deliveryInfo.time"
                         @input="setTime"
                         dense hint="Время"/>
            </div>
            <div class="col-4">
                <q-btn outline
                       v-if='!currentOrder.deliveryInfo.isCheck'
                       @click="checkTime()"
                       color="primary"
                       label="Проверить"/>
                <q-chip v-if='currentOrder.deliveryInfo.isCheck'
                        color="amber"
                        text-color="white"
                        icon="check">
                    Проверено
                </q-chip>
            </div>
        </div>
        <div v-if="!currentOrder.deliveryInfo.isCheck && nearTime.time.length > 0">
            ближайшее свободное время
            <q-chip color="orange"
                    clickable
                    @click="setCheckDateTime([nearTime.time])"
                    text-color="white" icon="time_to_leave">
                {{ dateQ.formatDate([nearTime.time], 'HH:mm') }}
            </q-chip>

        </div>
        <div v-if="isDatePast">
            <q-chip removable
                    outline
                    v-model="errorPast"

                    color="red"
                    text-color="white"
                    icon="error">
                Внимание! Выбранная дата находится в прошлом.
            </q-chip>
        </div>
        <div v-if="isDateFar">
            <q-chip removable
                    outline
                    v-model="errorFuture"
                    color="red"
                    text-color="white" icon="error">
                Внимание! До даты доставки больше суток.
            </q-chip>
        </div>
    </div>
</template>

<script>
import { date } from 'quasar';
import {
  mapState,
  mapMutations,
  mapActions,
  mapGetters,
} from 'vuex';

export default {
  name: 'FormAddress',
  data() {
    return {
      errorPast: true,
      errorFuture: true,
      dateQ: date,
      newAddress: {
        dadata: {},
        string: null,
        apartment: null,
        comment: null,
      },
      addressHint: [],
    };
  },
  computed: {
    ...mapState('order', ['currentOrder', 'nearTime']),
    ...mapGetters('order', [
      'lastClientAddress',
      'isDatePast',
      'isDateFar',
    ]),
  },
  methods: {
    ...mapMutations('order', [
      'setDeliveryType',
      'setAddress',
      'setDate',
      'setTime',
      'setCheckDateTime',
    ]),
    ...mapActions('order', [
      'saveAddress',
      'checkTime',
      'getNearTime',
    ]),
    chooseAddress(address) {
      this.setAddress(address);
    },
    getAddressString(address) {
      const addresObj = address.object;

      if (addresObj.dadata === null || addresObj.dadata === undefined) return '';

      let { comment } = addresObj;

      if (comment === undefined) comment = '';
      else comment = `(${comment})`;

      return `${addresObj.dadata.data.city}
      ул ${addresObj.dadata.data.street}
      д. ${addresObj.dadata.data.house}
      кв ${addresObj.apartment} ${comment}`;
    },
    proxySaveAddress() {
      this.saveAddress(this.newAddress);
      this.resetNewAddress();
      setTimeout(() => this.chooseAddress(this.lastClientAddress), 500);
    },
    resetNewAddress() {
      this.newAddress = {
        string: null,
        apartment: null,
        comment: null,
      };
    },
    chooseNewAddress(value) {
      this.newAddress.string = `${value.data.city} ул ${value.data.street} ${value.data.house}`;
      this.newAddress.dadata = value;
    },
    async updateClientAddressString(value, update) {
      // this.newAddress.string = value;
      await this.$axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
        {
          query: value,
          locations: [{
            region: 'иркутская',
          }],
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Token 77cb873f936d387fdea1018197ed8e627c1c4795',
          },
        })
        .then(({ data }) => {
          update(() => {
            this.addressHint = data.suggestions;
          });
        });
    },
  },
  mounted() {
    this.getNearTime();

    if (this.currentOrder.deliveryInfo.date === null) {
      const timeD = this.dateQ(this.nearTime.time[0], 'YYYY-MM-DD');
      const dateD = this.dateQ(this.nearTime.date[0], 'HH:mm');
      this.setTime(timeD);
      this.setDate(dateD);
    }
  },
};
</script>

<style scoped>
    .address-area {
        box-shadow: 0 1px 2px #575555 inset;
    }
</style>
