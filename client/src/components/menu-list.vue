<template >
    <div class="" id="menu">
        <div class="container text-center mt-3" v-if="menus.length > 1">
            <button class="btn px-5 rounded-pill mt-3 m-3" :class="{ 'btn-primary': key_menu==show_menu, 'btn-outline-primary': key_menu!=show_menu}"
                    @click="choose_menu(key_menu)" :key="'but'+menu_item.id" v-for="(menu_item,key_menu) in menus">
                {{menu_item.name}}

            </button>
        </div>
        <div class='h2 text-center pt-3' v-else>Меню</div>
        <template  v-for="(menu_item,key_menu) in menus">
            <div class="menu_slide d-flex flex-column flex-fill pt-lg-4" v-if='show_menu == key_menu' :key="'menu'+menu_item.id" v-html="menu_item.code">

            </div>
        </template>
    </div>
</template >

<script >
    const axios = require('axios').default;
    export default {
        name: "menu-list",
        data() {
            return {
                menus: [],
                show_menu:0
            }
        },
        mounted() {
            axios.get('http://176.112.218.115:1337/menus?public=true&_sort=sort:DESC')
                .then( (response)=> {
                    console.log(response)
                    this.menus.splice(0, this.menus.length, ...response.data);
                })
        },
        methods:{
            choose_menu(key){
                this.show_menu = key
            }
        }
    }
</script >

<style scoped >
    .yelow{
        background:#fcd000;
    }
    @media (min-width: 600px) {
        .menu_slide{
            width: 100%;
            height: 500px;

        }
    }
    @media (max-width: 600px) {
        .menu_slide{
            width: 100%;
            height: 200px;
           margin-bottom: 30px;
        }
    }
    .h2{
        font-family:lcb;
    }

</style >