import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../layout/frontend/main.vue'
import SubMain from '../layout/frontend/submain.vue'

import Home from '../views/frontend/Home.vue'
import Data from '../views/frontend/Data.vue'
import Organisasi from '../views/frontend/Organisasi.vue'
import Grup from '../views/frontend/Grup.vue'

import listDataset from '../views/frontend/dataset/listdata.vue'
import readmoreDataset from '../views/frontend/dataset/readmore.vue'

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
          path: '/',
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
          component: Data
        },
        {
          path: '/organisasi',
          component: Organisasi
        },
        {
          path: '/grup',
          component: Grup
        },
        {
          path: '/listdataset',
          component: listDataset
        },
        {
          path: '/readmore',
          component: readmoreDataset
        }
      ]
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
      title: 'Admin'
      // requiresAuth: true
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

export default router
