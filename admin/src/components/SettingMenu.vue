<template>
    <q-page class="">
        <q-tabs align="left">
            <q-route-tab :to="subMenuItem.link"
                         :key="subMenuItem.name"
                         :label="subMenuItem.name"
                         v-for="subMenuItem in submenus"/>
        </q-tabs>
        <router-view/>
    </q-page>
</template>

<script>
export default {
  name: 'SettingMenu',
  data() {
    return {
      submenus: [
        {
          name: 'Создать категорию',
          link: '/setting_menu/category/create',
        },
        {
          name: 'Создать блюдо',
          link: '/setting_menu/product/create',
        },
        {
          name: 'Создать ингридиент',
          link: '/setting_menu/ingredient/create',
        },
        {
          name: 'Создать ярлычок',
          link: '/setting_menu/label/create',
        },
        {
          name: 'Меню',
          link: '/setting_menu/list',
        },
        {
          name: 'Iiko',
          link: '/setting_menu/iiko',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
