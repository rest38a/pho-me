<template>
    <div>
        <input type="file" v-on:change="handleFilesUpload()" class="hidden" ref="photo_e" >
        <div class="row"  v-if="isPhoto">
            <div class="col-12">
                <q-img
                        :src="`${api_link}/uploads/${photo}`"
                        spinner-color="white"
                        style="height: 140px; max-width: 150px"
                />
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <q-btn color="primary" @click.native="uploat_photo('eq')" :label="buttoName"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UploadPhotoButton',
  props: {
    photo: String,
    label: {
      type: String,
      default: 'фото',
    },
  },
  data() {
    return {
      api_link: process.env.ADMIN_API_LINK,
      upload_photo: null,
      uploading: false,
      alert: {
        massageText: '',
        massageType: '',
        show: false,
      },
    };
  },
  methods: {
    uploat_photo() {
      this.$refs.photo_e.click();
    },
    handleFilesUpload() {
      [this.upload_photo] = this.$refs.photo_e.files;

      this.submitFile();
    },
    submitFile() {
      /*
        Initialize the form data
      */
      const formData = new FormData();
      /*
        Add the form data we need to submit
      */
      formData.append('file', this.upload_photo);

      /*
        Make the request to the POST /single-file URL
      */
      this.uploading = true;
      this.$axios.post('/api/upload_photo/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(({ data }) => {
        // console.log('SUCCESS!!');
        this.$emit('upload_photo', data.link);
      }).catch((error) => {
        console.log('FAILURE!!', error);
        alert('хуйня');
      });
    },
  },
  computed: {
    buttoName() {
      let buttonName;
      if (this.photo === null || this.photo === '') {
        buttonName = `Загрузить ${this.label}`;
      } else {
        buttonName = `Заменить  ${this.label}`;
      }

      return buttonName;
    },
    isPhoto() {
      if (this.photo === null || this.photo === '') return false;
      return true;
    },
  },
};
</script>

<style scoped>

</style>
