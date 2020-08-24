const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/Home.vue'),
      },
      // {
      //   path: 'order',
      //   name: 'home',
      //   component: () => import('../views/Home.vue'),
      // },
      // {
      //   path: 'feedback2',
      //   name: 'feedback',
      //   component: () => import('../views/feedback.vue'),
      // },
      {
        path: 'feedback',
        name: 'feedback-mobile',
        component: () => import('../views/FeedbackMobile.vue'),
      },
      { path: 'delivery', component: () => import('pages/OrderPage.vue') },
    ],

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
