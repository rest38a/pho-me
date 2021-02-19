<template>
    <div class="left-navigate row  justify-start items-center content-center">
     <div class="full-width column wrap justify-center items-center content-center ">
      <div class="ellipse">
        <img src="../../assets/image/EllipseOpen.png">
      </div>
      <div class="ellipse">
        <img src="../../assets/image/EllipseClose.png">
      </div>
      <div class="ellipse">
        <img src="../../assets/image/EllipseClose.png">
      </div>
      <div class="ellipse">
        <img src="../../assets/image/EllipseClose.png">
      </div>
      <div class="ellipse">
        <img src="../../assets/image/EllipseClose.png">
      </div>
  </div>
  </div>
</template>

<script >
export default {
  name: 'leftNavigate',
};
</script >

<style scoped>
.left-navigate {
 position: fixed;
  top: 0;
  height: 100vh;
  width: 95px;
  margin: 0;

    }

.ellipse {
  margin: 36px;
  cursor: pointer;
}
</style>
