<template >
    <div class="q-pa-md">
      <router-view/>
        <div class="text-h6">Тип оплаты</div>
        <q-form
                class="q-gutter-y-md"
        >
            <div class="row q-col-gutter-md">
                <div class="col-4">
                    <q-input v-model="paymentType.name" label="Название для клиентов"/>
                </div>
                <div class="col-4">
                    <q-select outlined
                              v-model="paymentType.iikoProduct"
                              emit-value
                              map-options
                              use-input
                              option-label="name"
                              @filter="filterFn"
                              :options="iikoSearch" label="Тип оплаты из айки">
                        <template v-slot:no-option>
                            <q-item>
                                <q-item-section class="text-grey">
                                    нет резульататов
                                </q-item-section>
                            </q-item>
                        </template>
                    </q-select>
                </div>
            </div>
            <div class="row">
                <div class="col-8">
                    <q-input
                            outlined
                            v-model="paymentType.description"
                            label="Описание (внутренее)"
                            type="textarea"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-toggle
                            label="Активно на сайте"
                            v-model="paymentType.isActiveSite"
                            color="amber"
                    />
                    <q-toggle
                            label="Активно в приложении"
                            v-model="paymentType.isActiveApp"
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
export default {
  name: 'PaymentEdit',
  data() {
    return {
      paymentType: {
        name: null,
        iiko_id: null,
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
};
</script >

<style scoped >

</style >
