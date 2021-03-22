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
          BackOffice '{{ADMIN_API_LINK}}'
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="left"
      side="left"
      overlay
      elevated
    >
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="menuItem in menuList"
          :key="menuItem.name"
          v-ripple
          clickable
          :to="menuItem.link"
        >
          <q-item-section>{{ menuItem.name }}</q-item-section>
        </q-item>
        <q-item
                v-ripple
                clickable
          @click="logout"
        >
          Выход
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      ADMIN_API_LINK: process.env.ADMIN_API_LINK,
      left: false,
      menuList: [
        {
          name: 'Заказы',
          link: '/orders',
        },
        {
          name: 'Подразделения',
          link: '/departments',
        },
        {
          name: 'Типы оплат',
          link: '/payments',
        },
        {
          name: 'Интерьеры',
          link: '/interior',
        },
        {
          name: 'Меню ресторана',
          link: '/rest-menu',
        },
        {
          name: 'Доставка',
          link: '/delivery',
        },
        {
          name: 'Отзывы',
          link: '/feedback',
        },
        {
          name: 'Акции',
          link: '/promotions',
        },
        {
          name: 'Промокоды',
          link: '/promo-code',
        },
        {
          name: 'Настройка сайта',
          link: '/setting_site',
        },
        {
          name: 'Настройка Меню',
          link: '/setting_menu',
          submenus: [
            {
              name: 'Создать категорию',
              link: '/category/create',
            },
            {
              name: 'Создать блюдо',
              link: '/category/create',
            },
            {
              name: 'Меню',
              link: '/category/create',
            },
          ],
        },
        {
          name: 'Пользователи',
          link: '/user_setting',
        },
      ],
    };
  },
  computed: {
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
