<template>
  <div class="h-100">
    <Main />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from '../components/main.vue';

export default {
  name: 'home',
  components: {
    Main,
  },
};
</script>
<style scoped >
  body{
    height: 100%;
  }
</style>
