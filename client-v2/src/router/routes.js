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
      {
        path: '/main/',
        name: 'main',
        component: () => import('../components/main.vue'),
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
      {
        path: 'sobaka',
        name: 'feedback-mobile2',
        component: () => import('../views/SobakaView.vue'),
      },
      {
        path: 'kewrwen3234532834dhrsjkwejrwejkrn',
        name: 'report',
        component: () => import('pages/ReportPage.vue'),
      },
      { path: 'delivery', component: () => import('pages/OrderPage.vue') },
      {
        path: '/Contacts',
        name: 'ContactPage',
        component: () => import('pages/ContactsPage.vue'),
      },
      {
        path: '/Menu',
        name: 'MenuPage',
        component: () => import('pages/MenuPage.vue'),
        // props: { default: true, sidebar: false },
      },
      {
        path: '/Actions',
        name: 'ActionPage',
        component: () => import('pages/ActionPage.vue'),
      },
      {
        path: '/Interiors',
        name: 'InteriorPage',
        component: () => import('pages/InteriorPage.vue'),
      },
      {
        path: 'main',
        name: '',
        component: () => import('components/main.vue'),
      },
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
