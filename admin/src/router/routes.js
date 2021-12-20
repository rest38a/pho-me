const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'orders',
        name: 'orders',
        component: () => import('pages/order/orderList.vue'),
        children: [
          {
            path: 'create',
            name: 'order_create',
            component: () => import('pages/order/orderCreate.vue'),
          },
          {
            path: ':id',
            name: 'order_edit',
            props: { edit: true },
            component: () => import('pages/order/orderCreate.vue'),
          },
        ],
        showInMenu: true,
        ruName: 'Заказы',
        right: 1,
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/reports/Dashboard.vue'),
        group: 'Дашборд',
        showInMenu: true,
        ruName: 'Дашборды',
        right: 2,
      },
      {
        path: 'dashboards_settings',
        name: 'dashboards_settings',
        component: () => import('pages/reports/DashboardSettings.vue'),
        children: [
          {
            path: 'motivation',
            name: 'motivation',
            component: () => import('components/dashboards/StaffBoard.vue'),
          },
        ],
        group: 'Дашборд',
        showInMenu: true,
        ruName: 'Настройки Дашбордов',
        right: 2,
      },
      {
        path: 'departments',
        name: 'department_list',
        component: () => import('pages/Departments/DepartmentPage.vue'),
        children: [
          {
            path: 'create',
            name: 'department_edit',
            props: { edit: false },
            component: () => import('pages/Departments/DepartmentCreate.vue'),
          },
          {
            path: ':id',
            name: 'department_edit',
            props: { edit: true },
            component: () => import('pages/Departments/DepartmentCreate.vue'),
          },
        ],
        showInMenu: true,
        ruName: 'Подразделения',
        right: 1,
        group: 'Администрирование',
      },
      {
        path: 'feedback',
        name: 'feedback_list',
        component: () => import('pages/Feedback/FeedbackPage.vue'),
        children: [
          {
            path: ':id',
            name: 'feedback_edit',
            showInMenu: true,
            props: { edit: true },
            component: () => import('pages/Feedback/FeedbackEditPage.vue'),
          },
        ],
        showInMenu: true,
        ruName: 'Отзывы',
        right: 1,
        group: 'Маркетинг',
      },
      {
        path: 'payments',
        name: 'payments',
        component: () => import('pages/payments/PaymentsPage.vue'),
        children: [
          {
            path: 'type/list',
            name: 'payments_list',
            component: () => import('../pages/payments/PaymentList.vue'),
          },
          {
            path: 'merchant/list',
            name: 'merchant_list',
            component: () => import('../pages/payments/MerchantList.vue'),
          },
          {
            path: 'type/:id',
            name: 'payment_edit',
            props: { edit: true },
            component: () => import('../pages/payments/PaymentEdit.vue'),
          },
          {
            path: 'type/create',
            name: 'payment_create',
            component: () => import('../pages/payments/PaymentEdit.vue'),
          },
          {
            path: 'merchant/:id',
            name: 'merchant_edit',
            props: { edit: true },
            component: () => import('../pages/payments/MerchantEdit.vue'),
          },
          {
            path: 'merchant/create',
            name: 'merchant_create',
            component: () => import('../pages/payments/MerchantEdit.vue'),
          },
        ],
        group: 'Маркетинг',
        showInMenu: true,
        ruName: 'Типы оплат',
        right: 1,
      },
      {
        path: 'interior/',
        name: 'interiors',
        component: () => import('../pages/interior/Interiors.vue'),
        children: [
          {
            path: 'create',
            name: 'interior_create',
            component: () => import('../pages/interior/InteriorCreate.vue'),
            right: 1,
          },
          {
            path: ':id',
            name: 'interior_edit',
            props: { edit: true },
            component: () => import('../pages/interior/InteriorCreate.vue'),
            right: 1,
          },
        ],
        right: 1,
        showInMenu: true,
        ruName: 'Интерьеры',
        group: 'Маркетинг',
      },
      {
        path: 'rest-menu/',
        name: 'rest-menus',
        component: () => import('../pages/Restmenu/RestMenu.vue'),
        children: [
          {
            path: 'create',
            name: 'rest-menus_create',
            component: () => import('../pages/Restmenu/RestMenuCreate.vue'),
            right: 1,
          },
          {
            path: ':id',
            name: 'rest-menus_edit',
            props: { edit: true },
            component: () => import('../pages/Restmenu/RestMenuCreate.vue'),
            right: 1,
          },
        ],
        right: 1,
        showInMenu: true,
        ruName: 'Меню ресторана',
        group: 'Маркетинг',
      },
      {
        path: 'promotions',
        name: 'promotions',
        component: () => import('../components/Promotions.vue'),
        children: [
          {
            path: 'create',
            name: 'promotion_create',
            component: () => import('../pages/promotion/PromotionCreate.vue'),
          },
          {
            path: ':id',
            name: 'promotion_edit',
            props: { edit: true },
            component: () => import('../pages/promotion/PromotionCreate.vue'),
          },
        ],
        showInMenu: true,
        ruName: 'Акции',
        right: 1,
        group: 'Маркетинг',
      },
      {
        path: 'promo-code/',
        name: 'promoCodes',
        component: () => import('../pages/PromoCode/PromoCodePage.vue'),
        children: [
          {
            path: 'create',
            name: 'promoCode_create',
            component: () => import('../pages/PromoCode/PromoCodeCreatePage.vue'),
          },
          {
            path: ':id',
            name: 'promoCode_edit',
            props: { edit: true },
            component: () => import('../pages/PromoCode/PromoCodeCreatePage.vue'),
          },
        ],
        showInMenu: true,
        ruName: 'Промокоды',
        right: 1,
        group: 'Маркетинг',
      },
      {
        path: 'setting_site',
        name: 'setting_site',
        component: () => import('pages/SettingSite/SettingSite.vue'),
        children: [
          // {
          //   path: 'main',
          //   name: 'main_settings',
          //   component: () => import('../pages/SettingSite/MainSettingsList.vue'),
          // },
        ],
        right: 1,
        ruName: 'Настройка компании',
        showInMenu: true,
        group: 'Администрирование',
      },
      // {
      //   path: 'report',
      //   name: 'report',
      //   component: () => import('../pages/kitchen/ReportPage.vue'),
      // ruName: 'Отчёт',
      // showInMenu: false,
      //   right: 1,
      // },
      // {
      //   path: 'kitchen',
      //   name: 'kitchen',
      //   component: () => import('../pages/kitchen/KitchenPage.vue'),
      // ruName: 'Кухонный экран',
      // showInMenu: false,
      //   right: 1,
      // },
      // {
      //   path: 'delivery',
      //   name: 'delivery',
      // showInMenu: false,
      // ruName: 'Доставка',
      //   component: () => import('../pages/DeliveryPage'),
      //   right: 1,
      // },
      {
        path: 'setting_menu',
        name: 'setting_menu',
        component: () => import('components/SettingMenu.vue'),
        children: [
          {
            path: 'category/create',
            name: 'category_create',
            component: () => import('../components/category/CategoryCreate.vue'),
          },
          {
            path: 'category/:id',
            name: 'category_edit',
            props: { edit: true },
            component: () => import('../components/category/CategoryCreate.vue'),
          },
          {
            path: 'product/create',
            name: 'product_create',
            component: () => import('../components/product/ProductCreate.vue'),
          },
          {
            path: 'product/:id',
            name: 'product_edit',
            props: { edit: true },
            component: () => import('../components/product/ProductCreate.vue'),
          },
          {
            path: 'ingredient/create',
            name: 'ingredient_create',
            component: () => import('../components/ingredient/IngredientCreate.vue'),
          },
          {
            path: 'ingredient/:id',
            name: 'ingredient_edit',
            props: { edit: true },
            component: () => import('../components/ingredient/IngredientCreate.vue'),
          },
          {
            path: 'list',
            name: 'menu_list',
            component: () => import('../components/MenuList.vue'),
          },
          {
            path: 'iiko',
            name: 'iiko_list',
            component: () => import('../components/MenuIiko.vue'),
          },
        ],
        ruName: 'Настройка меню',
        right: 1,
        showInMenu: true,
      },
      {
        path: 'user_setting',
        name: 'user_setting',
        component: () => import('../pages/user/UserSettingPage.vue'),
        children: [
          {
            path: 'user/list',
            name: 'user_list',
            component: () => import('../pages/user/UserList.vue'),
          },
          {
            path: 'user/edit/:id',
            name: 'user_edit',
            props: { edit: true },
            component: () => import('../pages/user/UserEdit'),
          },
          {
            path: 'user/create',
            name: 'user_create',
            component: () => import('../pages/user/UserEdit'),
          },
          {
            path: 'role/list',
            name: 'role_list',
            component: () => import('../pages/Role/RoleList.vue'),
          },
          // {
          //   path: 'role/:id',
          //   name: 'role_edit',
          //   props: { edit: true },
          //   component: () => import('../pages/menu/product/ProductCreate.vue'),
          // },
          // {
          //   path: 'role/create',
          //   name: 'role_create',
          //   component: () => import('../pages/menu/ingredient/IngredientCreate.vue'),
          // },
          // {
          //   path: 'ingredient/:id',
          //   name: 'ingredient_edit',
          //   props: { edit: true },
          //   component: () => import('../pages/menu/ingredient/IngredientCreate.vue'),
          // },
          // {
          //   path: 'list',
          //   name: 'menu_list',
          //   component: () => import('../pages/menu/MenuList.vue'),
          // },
        ],
        showInMenu: true,
        ruName: 'Пользователи',
        right: 1,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/LoginPage.vue'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
