<template>
      <div class="side-container row ">
         <div class="photo-box col-4">
              <img src="..\assets\image\SideMenu.png" class="photo">
          </div>
          <div class="side-menu col-grow">
             <img src="..\assets\icon\logo.png" class="logo">
              <ul class="title column">
                  <li class="title">МЕНЮ</li>
                  <li class="title">АКЦИИ</li>
                  <li class="title">ИНТЕРЬЕР</li>
                  <li class="title">КОНТАКТЫ</li>
                  <li class="title">ВАКАНСИИ</li>
              </ul>
              <div class="vertical-line col"></div>
          </div>
      </div>
</template>

<script>
export default {
  name: 'SideMenu',
};
</script>

  <style scoped>
  .side-container {
      position: fixed;
      height: 100vh;
      overflow: hidden;
      left: 0;
      right: 0;
  }

  .photo-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
}

.photo{
  display: block;
  height: 100%;
  width: auto;
}

.side-menu {
  background: #f8c200;
  padding: 50px 100px 50px 131px;
  overflow-y: auto;
  height: 100vh;
}

.side-title {
  padding: 57px 0;
}

.title {
  font-family: lb;
  font-size: 90px;
  line-height: 120px;
  color: #fff;
  font-style: italic;
  list-style-type: none;
  cursor: pointer;
  padding: 0 0 25px 0;
}
.vertical-line {
  width: 100px;
  background-color: #f8c200;
}

.right-navigate {
  cursor: pointer;
}

.icon-img {
  margin-top: 39px;
  cursor: pointer;
}

.logo {
  cursor: pointer;
}

.close-img {
}

::-webkit-scrollbar {
background: transparent;
  }

@media (max-width: 1280px) {
  .title {
    font-size: 60px;
    line-height: 60px;
  }
}

@media (max-width: 991px) {
  .title {
    font-size: 50px;
    line-height: 50px;
  }
}

@media (max-width: 713px) {
  .title {
    font-size: 40px;
    line-height: 40px;
  }
}

@media (max-width: 580px) {
  .title {
    font-size: 30px;
    line-height: 30px;
  }
}
</style >
