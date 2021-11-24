<template>
  <q-page class="">
    <q-tabs align="left">
      <q-route-tab
        v-for="subMenuItem in submenus"
        :key="subMenuItem.name"
        :to="subMenuItem.link"
        :label="subMenuItem.name"
      />
    </q-tabs>
    <router-view />
  </q-page>
</template>

<script>
export default {
  name: 'DashboardSettings',
  data() {
    return {
      submenus: [
        {
          name: 'Мотивационный',
          link: '/dashboards_settings/motivation',
        },
        // {
        //   name: 'По доппродажам',
        //   link: '/reporting/additionalSale',
        // },
      ],
    };
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
