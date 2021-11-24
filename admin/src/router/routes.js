const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
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
            path: 'label/create',
            name: 'label_create',
            component: () => import('../components/label/LabelCreate.vue'),
          },
          {
            path: 'label/:id',
            name: 'label_edit',
            props: { edit: true },
            component: () => import('../components/label/LabelCreate.vue'),
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
      },
      {
        path: 'setting_site',
        name: 'setting_site',
        component: () => import('pages/SettingSite/SettingSite.vue'),
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/reports/Dashboard.vue'),
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
      },
      {
        path: 'feedback',
        name: 'feedback_list',
        component: () => import('pages/Feedback/FeedbackPage.vue'),
      },
      {
        path: 'departments',
        name: 'department_list',
        component: () => import('pages/Departments/DepartmentPage.vue'),
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
      },
      {
        path: 'department/create',
        name: 'department_edit',
        props: { edit: false },
        component: () => import('pages/Departments/DepartmentCreate.vue'),
      },
      {
        path: 'department/:id',
        name: 'department_edit',
        props: { edit: true },
        component: () => import('pages/Departments/DepartmentCreate.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('../pages/order/orderList.vue'),
      },
      {
        path: 'order/create',
        name: 'order_create',
        component: () => import('../pages/order/orderCreate.vue'),
      },
      {
        path: 'order/:id',
        name: 'order_edit',
        props: { edit: true },
        component: () => import('../pages/order/orderCreate.vue'),
      },
      {
        path: 'report',
        name: 'report',
        component: () => import('../pages/kitchen/ReportPage.vue'),
      },
      {
        path: 'kitchen',
        name: 'kitchen',
        component: () => import('../pages/kitchen/KitchenPage.vue'),
      },
      {
        path: 'delivery',
        name: 'delivery',
        component: () => import('../pages/DeliveryPage'),
      },
      {
        path: 'promotions/',
        name: 'promotions',
        component: () => import('../components/Promotions.vue'),
      },
      {
        path: 'promotion/create',
        name: 'promotion_create',
        component: () => import('../pages/promotion/PromotionCreate.vue'),
      },
      {
        path: 'promotion/:id',
        name: 'promotion_edit',
        props: { edit: true },
        component: () => import('../pages/promotion/PromotionCreate.vue'),
      },
      {
        path: 'interior/',
        name: 'interiors',
        component: () => import('../pages/interior/Interiors.vue'),
      },
      {
        path: 'interior/create',
        name: 'interior_create',
        component: () => import('../pages/interior/InteriorCreate.vue'),
      },
      {
        path: 'interior/:id',
        name: 'interior_edit',
        props: { edit: true },
        component: () => import('../pages/interior/InteriorCreate.vue'),
      },
      {
        path: 'rest-menu/',
        name: 'rest-menus',
        component: () => import('../pages/Restmenu/RestMenu.vue'),
      },
      {
        path: 'rest-menu/create',
        name: 'rest-menus_create',
        component: () => import('../pages/Restmenu/RestMenuCreate.vue'),
      },
      {
        path: 'rest-menu/:id',
        name: 'rest-menus_edit',
        props: { edit: true },
        component: () => import('../pages/Restmenu/RestMenuCreate.vue'),
      },
      {
        path: 'promo-code/',
        name: 'promoCode',
        component: () => import('../pages/PromoCode/PromoCodePage.vue'),
      },
      {
        path: 'promo-code/create',
        name: 'promoCode',
        component: () => import('../pages/PromoCode/PromoCodeCreatePage.vue'),
      },
      {
        path: 'promo-code/:id',
        name: 'promoCode',
        props: { edit: true },
        component: () => import('../pages/PromoCode/PromoCodeCreatePage.vue'),
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
          {
            path: 'role/:id',
            name: 'role_edit',
            props: { edit: true },
            component: () => import('../components/product/ProductCreate.vue'),
          },
          {
            path: 'role/create',
            name: 'role_create',
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
        ],
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
