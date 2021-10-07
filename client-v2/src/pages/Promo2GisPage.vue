<template>
  <div class="color-side background row justify-center items-center" id="menu-page">
    <div class="image-box">
      <img v-if="isLoadImage"
        src="../assets/image/actionCard/sertificate2Gis.jpg"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Promo2GisPage',
  data() {
    return {
      refererUrl: '',
      isLoadImage: false,
    };
  },
  mounted() {
    this.refererUrl = document.referrer;
    if (!this.refererUrl.includes('2gis')) {
      window.location = '';
    } else {
      this.isLoadImage = true;
    }
  },
};
</script>

<style scoped lang='scss'>
.color-side {
  background: linear-gradient(45deg, rgba(213, 115, 216, 1) 0%, rgba(248, 210, 3, 1) 40%,
    rgba(106, 186, 97, 1) 80%, rgba(0, 155, 212, 1) 100%);
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.image {
}
</style>
