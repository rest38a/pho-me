<template >
    <div id="akcii">
        <q-carousel
                v-model="slide"
                swipeable
                animated
                control-color="yellow"
                prev-icon="arrow_left"
                next-icon="arrow_right"
                arrows
                width="1024"
                height="480"
                class="q-pb-xl"
        >
            <q-carousel-slide
                    :name="slide_item.id"
                    :img-src="'http://176.112.218.115:1337'+slide_item.image.url"
                              :key="slide_item.id" v-for="slide_item in slides"
                              class="column no-wrap flex-center">
                <div class="q-mt-md text-center">
                    {{ slide_item.slidetext }}
                </div>
            </q-carousel-slide>
        </q-carousel>
    </div>
</template >

<script >
const axios = require('axios').default;

export default {
  name: 'slider',
  data() {
    return {
      slide: 1,
      slides: [],
      sliding: null,
    };
  },
  mounted() {
    axios.get('http://176.112.218.115:1337/sliders?public=true&_sort=sort:DESC')
      .then((response) => {
        console.log(response);
        this.slides.splice(0, this.slides.length, ...response.data);
      });
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script >

<style scoped >

</style >
