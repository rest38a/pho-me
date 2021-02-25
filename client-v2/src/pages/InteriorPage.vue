<template>
  <div class="interior-side">
    <div class="container">
      <div class="full-width row justify-start items-baseline">
        <h1 class="title">ИНТЕРЬЕР</h1>
      </div>
      <div class="row justify-between q-col-gutter-md">
<!--      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-1.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-2.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-3.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-4.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-5.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-6.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-7.png"/>
      </div>
      <div class="img-wrapper">
        <img class="image" src="..\assets\image\interiorCard\interior-card-mini-8.png"/>
      </div>-->
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg2.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg3.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg4.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg5.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg6.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg7.jpg"/>
      </div>
      <div class="img-wrapper col">
        <img class="image" src="..\assets\image\interiorCard\testimg8.jpg"/>
      </div>
    </div>
  </div>
  </div>
</template >

<script >
export default {
  name: 'InteriorPage',
};
</script >

<style scoped >
.interior-side {
  background: radial-gradient(#02babc, #215f64);
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.title {
  margin: 112px 0 79px;
}

.image {
  cursor: pointer;
}

.img-wrapper {
  height: 100vh;
  overflow: hidden;
}

.img-wrapper:hover {
  width: 100%;
  position: absolute;
  animation: img-animation 0.4s;
}

@keyframes img-animation{
  from {opacity: 0;}
  50% {opacity: 0.75;}
  to {opacity: 1;}
}

</style>
