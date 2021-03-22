<template>
    <div class="q-pa-md">
        <h5>Создание фотографии интерьера</h5>
        <q-form
                class="q-gutter-md"
        >
            <div class="row">
                <div class="col-4">
                    <q-input v-model="photo.name" label="Название"/>
                </div>
            </div>
            <div class="row">
                <div class="col-auto">
                    <uploadButton
                            :photo="photo.photo"
                            :label="'фото'"
                            v-on:upload_photo="val => this.photo.photo = val"
                    ></uploadButton>
                </div>
<!--                <div class="col-auto">-->
<!--                    <uploadButton-->
<!--                            :photo="photo.preview"-->
<!--                            :label="'превью'"-->
<!--                            v-on:upload_photo="val => this.photo.preview = val"-->
<!--                    ></uploadButton>-->
<!--                </div>-->
            </div>
            <div class="row">
                <div class="col-6">
                    <q-input
                            outlined
                            v-model="photo.shortText"
                            label="Комментарий"
                            type="textarea"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-4">
                    <q-input v-model="photo.sortIndex" label="Сортировка"/>
                </div>
            </div>
            <q-toggle
                    label="Активен"
                    v-model="photo.isActive"
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
                    <q-btn color="negative" @click='deletePromotion(photo.id)'
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
  name: 'InteriorCreate',
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
      this.$axios.get(`/api/photo/${this.$route.params.id}`)
        .then(({ data }) => {
          this.photo = keysToCamel(data.photo);
        });
    }
  },
  data() {
    return {
      photo: {
        id: null,
        name: null,
        photo: null,
        shortText: null,
        type: 'interior',
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
      this.$axios.post('/api/photo', { photo: this.photo })
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
      this.$axios.delete(`/api/photo/${productId}`)
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
