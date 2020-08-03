<template >
    <q-page id="menu" class="column">

        <div class=" text-center mt-3 col-1" v-if="menus.length > 1">
            <q-btn flat :class="{ 'pho-btn': key_menu == show_menu,
                    'pho-btn-outline': key_menu!= show_menu}"
                    @click="choose_menu(key_menu)" :key="'but'+menu_item.id"
                    v-for="(menu_item,key_menu) in menus">
                {{menu_item.name}}

            </q-btn>
        </div>
        <div class='h2 text-center pt-3 col-grow' v-else>Меню</div>
        <template  v-for="(menu_item,key_menu) in menus">
            <div class="menu_slide "
                 v-if='show_menu == key_menu' :key="'menu'+menu_item.id"
                 v-html="menu_item.code">
            </div>
        </template>

    </q-page>
</template >

<script >
const axios = require('axios').default;

export default {
  name: 'menu-list',
  data() {
    return {
      menus: [],
      show_menu: 0,
    };
  },
  mounted() {
    axios.get('http://176.112.218.115:1337/menus?public=true&_sort=sort:DESC')
      .then((response) => {
        console.log(response);
        this.menus.splice(0, this.menus.length, ...response.data);
      });
  },
  methods: {
    choose_menu(key) {
      this.show_menu = key;
    },
  },
};
</script >

<style scoped >
    .yelow{
        background:#fcd000;
    }
    @media (min-width: 600px) {
        .menu_slide{
            width: 100%;

        }
    }
    @media (max-width: 600px) {
        .menu_slide{
            width: 100%;
            height: 400px;
           margin-bottom: 30px;
        }
    }
    .h2{
        font-family:lcb;
    }
    .pho-btn {
        font-family: lcb;
        margin: 10px 10px 0px 0px;
        border-radius: 10px;
        background: #FCD000;
        border: 2px solid #FCD000;
        color: #4F4F4F;
        font-size: 14px;
    }
    .pho-btn-outline {
        margin: 10px 10px 0px 0px;
        border-radius: 10px;
        border: 2px solid #FCD000;
        color: #4F4F4F;
        font-family: lcb;
        font-size: 14px;
    }
    .pho-btn-outline:hover {
        margin: 10px 10px 0px 0px;
        border-radius: 10px;
        background: #FCD000;
        border: 2px solid #FCD000;
        color: #4F4F4F;
    }

    .pho-btn-outline:hover > div {
        color: #4F4F4F;
    }

</style >
