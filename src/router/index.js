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
    path: '/dataset',
    name: 'SubMain',
    component: SubMain,
    children:
      [
        {
          path: '/dataset',
          component: () => import(
            /* webpackChunkName: "Data" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/Dataset.vue'
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
            '../views/frontend/grup/Grup.vue'
          )
        },
        {
          path: '/grup/:slug',
          component: () => import(
            /* webpackChunkName: "Grup Detail" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/grup/grupDetail.vue'
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
          path: '/dataset/:slug',
          component: () => import(
            /* webpackChunkName: "Readmore Dataset" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/dataset/readmore.vue'
          )
        },
        {
          path: '/data/:slug',
          component: () => import(
            /* webpackChunkName: "Readmore Data" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/data/readmore.vue'
          )
        },
        {
          path: '/infografis',
          component: () => import(
            /* webpackChunkName: "Infografis" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/frontend/Infografis.vue'
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
          name: 'home',
          component: () => import(
            /* webpackChunkName: "adminHome" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Home.vue'
          )
        },
        {
          path: '/admin/organisasi',
          meta: {
            superadmin: true
          },
          component: () => import(
            /* webpackChunkName: "adminOrganisasi" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Organisasi.vue'
          )
        },
        {
          path: '/admin/grup',
          meta: {
            superadmin: true
          },
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
          path: '/admin/data',
          component: () => import(
            /* webpackChunkName: "adminData" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Data.vue'
          )
        },
        {
          path: '/admin/user',
          meta: {
            superadmin: true
          },
          component: () => import(
            /* webpackChunkName: "adminUser" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/User.vue'
          )
        },
        {
          path: '/admin/profil',
          component: () => import(
            /* webpackChunkName: "adminProfil" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Profil.vue'
          )
        },
        {
          path: '/admin/infografis',
          meta: {
            superadmin: true
          },
          component: () => import(
            /* webpackChunkName: "adminInfografis" */
            /* webpackPrefetch: true */
            /* webpackPreload: true */
            '../views/admin/Infografis.vue'
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
  var myCookie = Cookie.get('myCookie')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!myCookie) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      const session = JSON.parse(Cookie.dec(Cookie.get('myCookie')))
      if (to.matched.some(record => record.meta.superadmin)) {
        if (session.user_lvl === 'superadmin') {
          next()
        } else {
          next({ name: 'home' })
        }
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
