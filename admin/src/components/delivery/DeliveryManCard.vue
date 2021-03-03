<template>
    <div class="col-4">
        <q-card flat bordered class="my-card">
            <q-card-section class="bg-grey text-white">
                <div class="row justify-between">
                    <div class="text-h6">{{user.name}}</div>
                    <div v-if="ourRouteSheet.orders.length === 0">
                        <q-btn @click="removeDeliveryMan">Удалить</q-btn>
                    </div>
                </div>
            </q-card-section>

            <q-separator inset/>

            <div>
                <q-list
                        bordered
                        separator
                >
                    <q-item
                            v-for="order in ourRouteSheet.orders"
                            :key="order.id"
                            color="amber"
                            :class="{
                                'bg-lime-13 ': order.mainStatus.statusId === 8,
                            }"
                    >
                        <q-item-section >
                            <div class="row items-center">
                                <div class="col">
                                    <div class="text-caption">
                                        {{order.id}} {{ getAddressFromJson(order.address) }}
                                    </div>
                                    <div class="text-weight-bolder ">
                                        {{ getPretyTime(order.deliveryTime) }}
                                        {{ minDost(order.deliveryTime) }}
                                    </div>
                                </div>
                                <div class="col-auto text-caption row text-center">
                                    {{order.mainStatus.status.name}}
                                </div>
                            </div>
                        </q-item-section>
                        <q-item-section side center>
                            <q-btn color="amber" v-if="order.mainStatus.statusId === 8"
                                   icon="done"/>
                            <q-btn
                                    @click="removeOrderToDeliveryMan(order)"
                                    icon="delete"/>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <q-card-section>
                <div class="row q-col-gutter-lg">
                    <div class="col">
                        <q-select outlined
                                  dense
                                  v-model="selectOrder"
                                  option-label="id"
                                  :options="orders"
                                  label="Заказ"/>
                    </div>
                    <div class="col row items-center ">
                        <q-btn @click="addOrderToDeliveryMan">добавить</q-btn>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
import { date } from 'quasar';

export default {
  props: {
    user: {
      type: Object,
    },
    orders: {
      type: Array,
    },
    routeSheets: {
      type: Array,
    },
  },
  data() {
    return {
      qDate: date,
      selectOrder: null,
    };
  },
  name: 'DeliveryManCard',
  methods: {
    getAddressFromJson(address) {
      if (address !== null) {
        const addressJson = JSON.parse(address.addressJson);
        return `${addressJson.string} ${addressJson.apartment}`;
      }
      return '';
    },
    removeDeliveryMan() {
      this.$emit('delete', this.user);
    },
    addOrderToDeliveryMan() {
      this.$emit('addorder', {
        order: this.selectOrder,
        routeSheet: this.ourRouteSheet,
      });
      this.selectOrder = null;
    },
    removeOrderToDeliveryMan(order) {
      this.$emit('removeorder', {
        order,
        routeSheet: this.ourRouteSheet,
      });
    },
    minDost(time) {
      const dateDelivery = time;
      const now = new Date();
      const diff = this.qDate.getDateDiff(dateDelivery, now, 'minutes');
      return diff;
    },
    getIsLate(order) {
      const diff = this.minDost(order.mainStatus.createdAt);
      if (order.mainStatus.statusId === 8 && diff > 0) return false;
      if (diff < 0) return true;
      return false;
    },
    getPretyTime(dateTime) {
      const dateprepare = this.qDate.extractDate(dateTime);
      const formatDate = this.qDate.formatDate(dateprepare, 'DD.MM HH:mm');

      return formatDate;
    },
  },
  computed: {
    ourRouteSheet() {
      let outList = this.routeSheets.filter((item) => item.userId === this.user.id);

      if (outList.length === 0) {
        outList.orders = [];
      } else {
        [outList] = outList;
      }

      return outList;
    },
  },
};
</script>

<style scoped>

</style>
