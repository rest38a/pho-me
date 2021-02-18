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
  name: 'UserSettingPage',
  data() {
    return {
      submenus: [
        {
          name: 'Пользователи',
          link: '/user_setting/user/list',
        },
        {
          name: 'Создать пользователя',
          link: '/user_setting/user/create',
        },
        {
          name: 'Роли',
          link: '/user_setting/role/list',
        },
        {
          name: 'Создать роль',
          link: '/user_setting/role/create',
        },
      ],
    };
  },
};
</script>

<style scoped>

</style>
