<template>
  <div>
    <CHeader />
    <div v-if="mobile">
      <v-img src="@/assets/img/baner-black.jpg" class="d-flex align-center" style="margin-top: 55px;">
        <div class="white--text mx-12 my-12">
          <span class="font-weight-black">SELAMAT DATANG</span> <span>DI PORTAL</span>
          <h1>DATA TERBUKA PEMERINTAH</h1>
          <h1>KOTA GORONTALO</h1>
        </div>
        <v-row align="center" justify="center">
          <v-text-field label="Cari Data Apa?" append-icon="mdi-folder-search-outline" solo rounded class="ml-12 mr-12"></v-text-field>
        </v-row>
      </v-img>
    </div>

    <CMMenu v-if="mobile" />

    <v-main class="mb-10">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import CHeader from '@/layout/frontend/header'
import CMMenu from '@/layout/frontend/menuMobile'

export default {
  components: {
    CHeader,
    CMMenu
  },

  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.mobile = true
    }

    if (this.$route.path === '/') {
      this.$router.push('/home')
    }
  },

  data: () => ({
    mobile: false
  }),

  mounted() {
    window.onscroll = () => {
      this.changeColor()
    }
  },
  methods: {
    changeColor() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        this.bg = 'white'
      } else {
        this.bg = 'transparent'
      }
    }
  }
}
</script>
