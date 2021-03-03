<template>
    <div class="q-pa-md">
        <h5>Создание акции</h5>
        <q-form
                class="q-gutter-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="promotion.name" label="Название"/>
                </div>
            </div>
            <div class="row">
                <div class="col-auto">
                    <uploadButton
                            :photo="promotion.image"
                            :label="'фото для слайдера'"
                            v-on:upload_photo="val => this.promotion.image = val"
                    ></uploadButton>
                </div>
                <div class="col-auto">
                    <uploadButton
                            :photo="promotion.preview"
                            :label="'превью'"
                            v-on:upload_photo="val => this.promotion.preview = val"
                    ></uploadButton>
                </div>
            </div>
            <div class="row">
                <div class="col-6">
                    <q-input
                            outlined
                            v-model="promotion.shortText"
                            label="Короткое описание"
                            type="textarea"
                    />
                </div>
                <div class="col-6">
                    <q-input
                            outlined
                            label="Длинное описание"
                            v-model="promotion.longText"
                            type="textarea"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-3">
                    <q-input outlined v-model="promotion.startTime"
                             label="Начало акции">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy"
                                               transition-show="scale"
                                               transition-hide="scale">
                                    <q-date v-model="promotion.startTime"
                                            mask="DD.MM.YYYY"
                                            @input="() => $refs.qDateProxy.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="col-3">
                    <q-input outlined
                             label="Конец акции"
                             v-model="promotion.finishTime"
                    >
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy ref="qDateProxy"
                                               transition-show="scale"
                                               transition-hide="scale">
                                    <q-date v-model="promotion.finishTime"
                                            mask="DD.MM.YYYY"
                                            @input="() => $refs.qDateProxy.hide()" />
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-input v-model="promotion.sortIndex" label="Сортировка"/>
                </div>
            </div>
            <q-toggle
                    label="Активен"
                    v-model="promotion.isActive"
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
                    <q-btn color="negative" @click='deletePromotion(promotion.id)'
                           label="Удалить"/>
                </div>
            </div>
        </q-form>
    </div>
</template>

<script>
import errorAlert from '../../components/common/ErrorAlert.vue';
import uploadButton from '../../components/common/UploadPhotoButton';
import keysToCamel from '../../helpers/toCamelCase';

export default {
  name: 'PromotionCreate',
  components: {
    errorAlert,
    uploadButton,
  },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.edit) {
      this.$axios.get(`/api/promotion/${this.$route.params.id}`)
        .then(({ data }) => {
          this.promotion = keysToCamel(data.promotion);
        });
    }
  },
  data() {
    return {
      promotion: {
        id: null,
        name: null,
        preview: null,
        image: null,
        shortText: null,
        longText: null,
        startTime: null,
        finishTime: null,
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
      this.$axios.post('/api/promotion', { promotion: this.promotion })
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
      this.$axios.delete(`/api/promotion/${productId}`)
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
