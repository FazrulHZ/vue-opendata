/* eslint-disable space-before-function-paren */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from '@/helper/cookie.js'

import Main from '../layout/frontend/main.vue'
import SubMain from '../layout/frontend/submain.vue'

import Home from '../views/frontend/Home.vue'

Vue.use(VueRouter)

const routes = [
  // Front End
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:
      [
        {
          path: '/home',
          component: Home
        }
      ]
  },
  {
    path: '/data',
    name: 'SubMain',
    component: SubMain,
    children:
      [
        {
          path: '/data',
          component: () => import(
            /* webpackChunkName: "Data" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/Data.vue'
          )
        },
        {
          path: '/organisasi',
          component: () => import(
            /* webpackChunkName: "Organisasi" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/organisasi/Organisasi.vue'
          )
        },
        {
          path: '/organisasi/:slug',
          component: () => import(
            /* webpackChunkName: "Organisasi Detail" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/organisasi/orgDetail.vue'
          )
        },
        {
          path: '/grup',
          component: () => import(
            /* webpackChunkName: "Grup" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/Grup.vue'
          )
        },
        {
          path: '/listdataset/:slug',
          component: () => import(
            /* webpackChunkName: "List Dataset" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/dataset/listdata.vue'
          )
        },
        {
          path: '/readmore/:slug',
          component: () => import(
            /* webpackChunkName: "Readmore Dataset" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/dataset/readmore.vue'
          )
        }
      ]
  },

  {
    path: '/login',
    component: () => import(
      /* webpackChunkName: "Login" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../views/frontend/Login.vue'
    )
  },

  // Admin
  {
    path: '/admin',
    component: () => import(
      /* webpackChunkName: "adminMain" */
      /* webpackPrefetch: true */
      /* webpackPreload: true */
      '../layout/admin/main.vue'
    ),
    meta: {
      title: 'Admin',
      requiresAuth: true
    },
    children:
      [
        {
          path: '/admin/main',
          component: () => import(
            /* webpackChunkName: "adminHome" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Home.vue'
          )
        },
        {
          path: '/admin/organisasi',
          component: () => import(
            /* webpackChunkName: "adminOrganisasi" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Organisasi.vue'
          )
        },
        {
          path: '/admin/grup',
          component: () => import(
            /* webpackChunkName: "adminGrup" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Grup.vue'
          )
        },
        {
          path: '/admin/dataset',
          component: () => import(
            /* webpackChunkName: "adminDataset" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Dataset.vue'
          )
        },
        {
          path: '/admin/user',
          component: () => import(
            /* webpackChunkName: "adminUser" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/User.vue'
          )
        }
      ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  var myCookie = Cookie.get('token')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!myCookie) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
