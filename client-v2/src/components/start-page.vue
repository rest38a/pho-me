<template >
    <div class="yelow_side2 container-fluid q-pt-lg" >
        <div class="column justify-between full-height mobile-hide" >
            <div class='column justify-center col-10' >
                <div class='row justify-center' >
                    <div class="row items-center justify-center" >
                        <div >
                            <img src='../assets/image/babkabig.png' >
                        </div >
                        <div >
                            <img src='../assets/image/logotextw.png'
                                 class='align-self-center q-pl-xl' >
                        </div >
                    </div >
                </div >
                <div class='soon2 ' >
                    Asian food & drinks<br >
                    ТРК Модный Квартал
                </div >
            </div >
            <div class='row justify-between q-pb-md' >
                <div class='tag' >
                    #ПЕРЕХОДИНАФО
                </div >
                <div class='scr' >
                    <div id='mouse' >
                        <div id='wheel' ></div >
                        <div class='scroll' >
                        </div >
                        <div class='scroll2' ></div >
                        <div class='scroll3' ></div >
                    </div >
                    <div id='text' >SCROLL</div >
                </div >
                <a href='https://www.instagram.com/pho_me_/' >
                    <div class='insta' >
                        <img src='../assets/image/insim.png' >
                        pho_me_
                    </div >
                </a >
            </div >
        </div >

        <div class="desktop-hide column justify-center full-height" >

            <div class='column justify-center items-center' >
                <div class="text-center" >
                    <img src='../assets/image/babkabig.png' class='w-50  q-pb-lg' >
                </div >
                <div class="w-75">
                    <img src='../assets/image/logotextw.png' class='img-fluid' >
                </div >
            </div >
            <div class='tag text-center pt-4' >
                #ПЕРЕХОДИНАФО
            </div >
        </div >
    </div >
</template >

<script >
export default {
  name: 'start-page',
};
</script >

<style scoped >
    .img-fluid {
        max-width: 100%;
        height: auto;
    }

    @font-face {
        font-family: gl;
        src: url(../assets/font/GothaProLig.otf);
    }

    @font-face {
        font-family: gtb;
        src: url(../assets/font/gtb.ttf);
    }

    @font-face {
        font-family: ttdb;
        src: url(../assets/font/ttdb.ttf);
    }

    @font-face {
        font-family: ttm;
        src: url(../assets/font/ttm.ttf);
    }

    @media (min-width: 600px) {
        .yelow_side2 {
            background-image: url(../assets/image/backd.jpg);
            background-repeat: no-repeat;
            background-position: center;
            height: 100vh;
        }
    }

    @media (max-width: 600px) {
        .yelow_side2 {
            background-image: url(../assets/image/backd.jpg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            height: 75vh;
        }
    }

    .soon2 {
        text-align: center;
        color: #b32ba9;
        font-family: gtb;
        font-size: 40px;
    }

    .tag {
        float: left;
        color: #fff;
        font-family: ttdb;
        font-size: 30px;
    }

    #mouse {
        margin-top: -40px;
        margin-left: auto;
        margin-right: auto;
        width: 1.5em;
        height: 2.5em;
        background-color: rgba(255, 255, 255, 0);
        border-radius: 100px;
        border: 2px solid white;
    }

    #wheel {
        margin-top: 1.5em;
        margin-left: auto;
        margin-right: auto;
        width: 0.4em;
        height: 0.4em;
        background-color: white;
        border-radius: 50%;
    }

    .scroll2 {
        opacity: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0px;
        height: 0px;
        border-left: 0.35em solid transparent;
        border-right: 0.35em solid transparent;
        border-top: 0.4em solid white;
        -webkit-animation: down2 1s infinite;
        animation: down2 1s infinite;
    }

    .scroll3 {
        opacity: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0px;
        height: 0px;
        border-left: 0.35em solid transparent;
        border-right: 0.35em solid transparent;
        border-top: 0.4em solid white;
        -webkit-animation: down 1s infinite;
        animation: down 1s infinite;
    }

    .scroll {
        opacity: 0;
        margin-left: auto;
        margin-right: auto;
        width: 0px;
        height: 0px;
        border-left: 0.35em solid transparent;
        border-right: 0.35em solid transparent;
        border-top: 0.4em solid white;
        -webkit-animation: down3 1s infinite;
        animation: down3 1s infinite;
    }

    @-webkit-keyframes down {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(2.3em);
        }
    }

    @-webkit-keyframes down2 {
        40% {
            opacity: 0;
        }
        100% {
            opacity: 0.5;
            transform: translateY(2.3em);
        }
    }

    @-webkit-keyframes down3 {
        60% {
            opacity: 0;
        }
        100% {
            opacity: 0.2;
            transform: translateY(2.3em);
        }
    }

    @keyframes down {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: translateY(2.3em);
        }
    }

    @keyframes down2 {
        40% {
            opacity: 0;
        }
        100% {
            opacity: 0.5;
            transform: translateY(2.3em);
        }
    }

    @keyframes down3 {
        60% {
            opacity: 0;
        }
        100% {
            opacity: 0.2;
            transform: translateY(2.3em);
        }
    }

    #text {
        font-family: "lcm";
        font-size: 1em;
        text-align: center;
        margin-top: 0.5em;
        color: white;
    }

    .insta {
        float: right;
        font-family: ttm;
        font-size: 25px;
        background: #ad1da3;
        padding: 5px 30px;
        border-radius: 25px;
        color: #fcd000;
        cursor: pointer;
    }

    .w-50 {
        width: 50% !important;
    }

    .w-75 {
        width: 75% !important;
    }
</style >
