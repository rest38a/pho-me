<template>
    <q-banner inline-actions class="text-white" :class='styleAllert' v-show="show">
        {{ massageText }}
        <template v-slot:action>
            <q-btn flat color="white" @click='close' label="Ок"/>
        </template>
    </q-banner>
</template>

<script>
export default {
  name: 'ErrorAlert',
  props:
      {
        massageText: String,
        massageType: String,
        show: Boolean,
      },
  computed: {
    styleAllert() {
      let style;

      if (this.massageType === 'error') {
        style = 'bg-red-13';
      } else {
        style = 'bg-green';
      }

      return style;
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

</style>
