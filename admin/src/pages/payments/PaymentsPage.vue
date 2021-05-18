<template >
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
</template >

<script >
export default {
  name: 'PaymentsPage',
  data() {
    return {
      submenus: [
        {
          name: 'Список типов оплат',
          link: '/payments/type/list',
        },
        {
          name: 'Список Мерчантов',
          link: '/payments/merchant/list',
        },
        {
          name: 'Создать тип оплаты',
          link: '/payments/type/create',
        },
        {
          name: 'Создать мерчанта',
          link: '/payments/merchant/create',
        },
      ],
    };
  },
};
</script >

<style scoped >

</style >
