<template >
    <div id="akcii">
        <b-carousel
                id="carousel-1"
                v-model="slide"
                :interval="5000"
                controls
                indicators
                background="#ababab"

                style="text-shadow: 1px 1px 2px #333;"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd"
        >
            <b-carousel-slide  text="" :key="slide_item.id" v-for="slide_item in slides">
                <template v-slot:img>
                    <img
                            class="d-block img-fluid w-100"
                            width="1024"
                            height="480"
                            :src="'http://176.112.218.115:1337'+slide_item.image.url"
                            alt="image slot"
                    >
                </template>
                <h1 class="d-md-block d-none">{{ slide_item.head }}</h1>
                <p class="d-md-block d-none">
                    {{ slide_item.slidetext }}
                </p>
            </b-carousel-slide>
        </b-carousel>
    </div>
</template >

<script >
    const axios = require('axios').default;
    export default {
        name: "slider",
        data() {
            return {
                slide: 0,
                slides:[],
                sliding: null
            }
        },
        mounted() {
            axios.get('http://176.112.218.115:1337/sliders?public=true&_sort=sort:DESC')
                .then( (response)=> {
                    console.log(response)
                    this.slides.splice(0, this.slides.length, ...response.data);
                })
        },
        methods: {
            onSlideStart() {
                this.sliding = true
            },
            onSlideEnd() {
                this.sliding = false
            }
        }
    }
</script >

<style scoped >

</style >
