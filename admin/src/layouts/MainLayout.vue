<template>
  <q-layout view="hhh lpR lFf">
    <q-header
      elevated
      class="bg-yellow-14  text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          @click="left = !left"
        />

        <q-toolbar-title>
          <img
            style="height: 25px; max-width: 150px"
            src="~assets/logotext.png"
          >
          BackOffice '{{ADMIN_API_LINK}}' test5
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left"
      overlay
      persistent
      elevated
    >
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="menuItem in rightMenu"
          :key="menuItem.ruName"
          v-ripple
          clickable
          :to="`/${menuItem.path}`"
        >
          <q-item-section>{{ menuItem.ruName || menuItem.name }}</q-item-section>
        </q-item>
        <q-expansion-item
          v-for="(menuItem) in rightMenuGroup"
          :key="menuItem.name"
          group="somegroup"
          :label="menuItem[0]"
        >
          <q-list>
            <q-item
              v-for="menu in menuItem[1]"
              :key="menu.name"
              clickable
              :to="`/${menu.path}`"
            >
              <q-item-section>{{ menu.props ? menu.props.ruName : menu.ruName }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
        <q-item
                v-ripple
                clickable
          @click="logout"
        >
          Выход
        </q-item>
        <q-item
        >
          {{ userName }}
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container @click="left = false">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import routes from '../router/routes';

export default {
  data() {
    return {
      ADMIN_API_LINK: process.env.ADMIN_API_LINK,
      left: false,
      menuList: routes[0].children,
      // menuListOld: [
      //   {
      //     name: 'Заказы',
      //     link: '/orders',
      //   },
      //   {
      //     name: 'Дашборд',
      //     link: '/dashboard',
      //   },
      //   {
      //     name: 'Настройка дашбордов',
      //     link: '/dashboards_settings',
      //   },
      //   {
      //     name: 'Подразделения',
      //     link: '/departments',
      //   },
      //   {
      //     name: 'Типы оплат',
      //     link: '/payments',
      //   },
      //   {
      //     name: 'Интерьеры',
      //     link: '/interior',
      //   },
      //   {
      //     name: 'Меню ресторана',
      //     link: '/rest-menu',
      //   },
      //   {
      //     name: 'Доставка',
      //     link: '/delivery',
      //   },
      //   {
      //     name: 'Отзывы',
      //     link: '/feedback',
      //   },
      //   {
      //     name: 'Акции',
      //     link: '/promotions',
      //   },
      //   {
      //     name: 'Промокоды',
      //     link: '/promo-code',
      //   },
      //   {
      //     name: 'Настройка сайта',
      //     link: '/setting_site',
      //   },
      //   {
      //     name: 'Настройка Меню',
      //     link: '/setting_menu',
      //     submenus: [
      //       {
      //         name: 'Создать категорию',
      //         link: '/category/create',
      //       },
      //       {
      //         name: 'Создать блюдо',
      //         link: '/category/create',
      //       },
      //       {
      //         name: 'Меню',
      //         link: '/category/create',
      //       },
      //     ],
      //   },
      //   {
      //     name: 'Пользователи',
      //     link: '/user_setting',
      //   },
      // ],
    };
  },
  computed: {
    ...mapState('auth', ['roleId', 'userName']),
    rightMenu() {
      return this.menuList.filter((item) => this.roleId <= item.right && !item.group);
    },
    rightMenuGroup() {
      let group = this.menuList.filter((item) => this.roleId <= item.right && item.group)
        .sort((a, b) => {
          const nameA = a.ruName.toLowerCase();
          const nameB = b.ruName.toLowerCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
      group = Object.entries(group.reduce((acc, item) => {
        acc[item.group] = [...(acc[item.group] || []), item];
        return acc;
      }, {}));
      return group.sort();
    },
    subMenuList() {
      const list = this.menuList.filter((item) => item.link === this.$route.name);
      return list[0].submenus;
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
  },
};
</script>
