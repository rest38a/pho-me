<template>
  <div class="bottom-navigate row justify-center items-center content-center">
    <div class="arrow-icon">
      <img src="../../assets/icon/Vector.png" />
    </div>
    <div class="title">Листай вниз</div>
    <div class="arrow-icon">
      <img src="../../assets/icon/Vector.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomNavigation',
};
</script >

<style scoped>
.bottom-navigate {
  position: absolute;
  left: 0;
  bottom: 37px;
  width: 100%;
}

.title {
  margin: 0 19px;
  font-family: lcm;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: #FFFFFF;
}

@media only screen and (max-width: 1023px) {
  .bottom-navigate {
    display: none;
    }
}
</style>
