import type { RouteRecordRaw } from 'vue-router';
import type { RouteMeta } from './types';

/**
 * Top-level routes. Keep this file declarative — feature-level pages
 * should be registered via lazy import below.
 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { layout: 'default' } satisfies RouteMeta,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Home', order: 0 } satisfies RouteMeta,
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/Settings.vue'),
        meta: { title: 'Settings', order: 100 } satisfies RouteMeta,
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: { title: 'About', order: 200 } satisfies RouteMeta,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Not Found', layout: 'blank' } satisfies RouteMeta,
  },
];
