<template >
    <div>
        <div class='black_blk'>
            <div class='container h-100'>
                <div class='row justify-content-center justify-content-md-center h-100'>

                    <div class='col-md-4 col-12 text-md-left text-center row flex-column justify-content-center pt-md-0 pt-3'>
                        <div class='zag11720 left'>
                            АДРЕС
                        </div>
                        <div class='zag1720 left'>
                            г. Иркутск, ул. 3 июля, 25<br>
                            ТРК «Модный Квартал», 2 этаж
                        </div>
                    </div>
                    <div class='col-md-4 col-12 text-center row flex-column justify-content-center pt-md-0 pt-3'>
                        <div class='zag11720'>
                            РЕЖИМ РАБОТЫ
                        </div>
                        <div class='zag1720'>
                            {{wtime[0].days}}<br> {{wtime[0].hours}}
                        </div>
                    </div>
                    <div class='d-md-flex d-none col-md-4 text-md-left text-center flex-column justify-content-center '>
                        <div class=''>
                            <div class='instd'><a href='https://www.instagram.com/pho_me_/'></a></div>
                            <div class='faced '><a href='https://www.facebook.com/phome.irk/'></a></div>
                        </div>
                    </div>
                    <div class='d-md-none text-md-left text-center row flex-column justify-content-center py-3'>
                        <div class='d-flex '>
                            <div class='instd'><a href='https://www.instagram.com/pho_me_/'></a></div>
                            <div class='faced '><a href='https://www.facebook.com/phome.irk/'></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template >

<script >
    const axios = require('axios').default;
    export default {
        name: "my-footer",
        data() {
            return {
                wtime: [{days:'ПН-ВС',
                    hours:'с 12:00 до 22:00',
                }],
            }
        },
        mounted() {
            axios.get('http://176.112.218.115:1337/worktimes')
                .then( (response)=> {
                    console.log(response)
                    this.wtime.splice(0, this.wtime.length, ...response.data);
                })
        },
    }
</script >

<style scoped >

    @media (min-width: 780px) {
        .black_blk{
            width:100%;
            height:130px;
            background:#000;
            font-family:lcb;
            color:#fff;
        }
    }
    @media (max-width: 780px) {
        .black_blk{
            width:100%;

            background:#000;
            font-family:lcb;
            color:#fff;
        }
    }
    .instd{
        width:41px;
        height:41px;
        background:#fff;
        background-image:url(../assets/image/in.png);
        background-repeat:no-repeat;

        border-radius:30px;
        float:right;
        margin:10px;
        cursor:pointer;

    }
    .faced{
        width:41px;
        height:41px;
        background:#fff;
        background-image:url(../assets/image/fb.png);
        background-repeat:no-repeat;
        border-radius:30px;
        float:right;
        margin:10px;
        cursor:pointer;
    }
</style >