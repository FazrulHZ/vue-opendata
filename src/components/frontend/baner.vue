<template>
  <div>
    <v-app-bar app flat :color="bg" :height="appH">
      <v-toolbar-title v-if="topHeader">
        <v-img src="@/assets/img/logo.png" :width="mxW" class="mt-10 ml-10"></v-img>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <v-img src="@/assets/img/logo.png" :width="mxW"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="my-auto">
        <v-btn text dark @click="home()">
          Home
        </v-btn>

        <v-btn text dark @click="data()">
          Data
        </v-btn>

        <v-btn text dark @click="organisasi()">
          Organisasi
        </v-btn>

        <v-btn text dark @click="grup()">
          Grup
        </v-btn>

        <v-btn v-if="session.session_ok" text dark @click="dashboard()">
          Dashboard
        </v-btn>

        <v-btn v-else text dark @click="login()">
          <v-icon small class="mr-2">mdi-lock</v-icon>
          Login
        </v-btn>
      </div>
    </v-app-bar>

    <div>
      <v-img src="@/assets/img/baner-black.jpg" class="ma-0 pa-0 d-flex align-center">
        <div class="white--text mx-12 my-12">
          <span class="font-weight-black">SELAMAT DATANG</span> <span>DI PORTAL</span>
          <h1>DATA TERBUKA PEMERINTAH</h1>
          <h1>KOTA GORONTALO</h1>
        </div>
        <v-row align="center" justify="center">
          <v-text-field label="Cari Data Apa?" append-icon="mdi-folder-search-outline" solo rounded class="ml-12 mr-12"></v-text-field>
        </v-row>
        <!-- <v-text-field label="Append" append-icon="mdi-map-marker" solo></v-text-field> -->
      </v-img>
    </div>
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  name: 'baner',

  data: () => ({
    session: '',
    topHeader: true,
    bg: 'transparent',
    dekstop: true,
    mxW: 250,
    appH: 90
  }),

  created() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = false
    }
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
  },

  methods: {
    handleScroll(event) {
      // Any code to be executed when the window is scrolled
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        this.topHeader = false
        this.bg = 'appBar'
        this.mxW = 150
        this.appH = 65
      } else {
        this.topHeader = true
        this.bg = 'transparent'
        this.mxW = 250
        this.appH = 90
      }
    },

    home() {
      this.$router.push('/').catch(() => {})
    },

    data() {
      this.$router.push('/dataset').catch(() => {})
    },

    organisasi() {
      this.$router.push('/organisasi').catch(() => {})
    },

    grup() {
      this.$router.push('/grup').catch(() => {})
    },

    login() {
      this.$router.push('/login').catch(() => {})
    },

    dashboard() {
      this.$router.push('/admin').catch(() => {})
    }
  }
}
</script>
