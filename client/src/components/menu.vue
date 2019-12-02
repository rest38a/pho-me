<template >
    <div class="container-fluid p-0 mx-0 fix">
        <b-navbar toggleable="lg" type="" variant="warning" class="py-0 my-0">
            <div class="container p-0">
            <b-navbar-brand href="#" class="py-md-0 my-0 py-2"><img src='../assets/image/logotext.png' class='textlogo_menu'></b-navbar-brand >

            <b-navbar-toggle target="nav-collapse"  class="burger">
                <MdMenuIcon w="35px" h="40px" rootClass='burger'/>
            </b-navbar-toggle >

            <b-collapse id="nav-collapse" is-nav >

                <b-navbar-nav class="ml-auto">


                    <b-nav-item text="Lang" right class="py-0">
                        <div class="menu_1_d" v-scroll-to="'#menu'">Меню</div>

                    </b-nav-item>
                    <b-nav-item text="Lang" right class="py-0">
                        <div class="menu_1_d" v-scroll-to="'#akcii'">Акции</div>
                    </b-nav-item>
                    <b-nav-item text="Lang" right class="py-0">
                        <div class="menu_1_d" v-scroll-to="'#feedback'">Отзывы</div>
                    </b-nav-item>
                    <b-nav-item text="Lang" right href='https://docs.google.com/forms/d/e/1FAIpQLScnm6GvACc-ItmaoGqxc8f2rZ5uJvWoCQPZl0xBuHp0STHa0w/viewform' class="py-0">
                       <div class="menu_1_d" >
                                Вакансии
                        </div>

                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse >
            </div>
        </b-navbar >

    </div >
</template >

<script >
    import MdMenuIcon from 'vue-ionicons/dist/md-menu.vue'
    export default {
        name: "my-menu",
        data(){
            return{
              scroll_p:0
            }
        },
        components: {
            MdMenuIcon
        },
        methods:{

        }
    }
</script >

<style scoped >
    @font-face{
        font-family:lcb;
        src: url(../assets/font/lcb.ttf);
    }
    @font-face{
        font-family:lcm;
        src: url(../assets/font/lcm.ttf);
    }
    @font-face{
        font-family:lcr;
        src: url(../assets/font/lcr.ttf);
    }
    .textlogo_menu{
        height:35px;
    }
    .menu_1_d{
        font-family:lcm;
        text-align: center;
        color:#000000;
        font-size: 1.4rem;
        width:110px;
        margin:5px auto;
        padding:3px 0;
    }
    .menu_1_d:hover{
        background:#ad1da3;
        color:#ffffff;
        margin:5px auto;
        width:110px;
        padding:3px 0;
        border-radius:20px;
    }
    a {
        color:#000000;
    }
    .fix{
        position: relative;
        position: fixed;

        top:0;
        z-index: 1000000000000000;
    }
    .burger{
        fill:#ad1da3;
        color: #ad1da3;
        padding-right: 0px;
    }
</style >