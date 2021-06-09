<template>
  <div>
    <CAppBar v-if="dekstop" />

    <v-app-bar app flat color="appBar" dark v-else>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-row no-gutters class="text-center subtitle-1">
          <v-img src="@/assets/img/logomini2.png" max-width="35" class="mr-2"></v-img>
          Open Data | Kota Gorontalo
        </v-row>
      </v-toolbar-title>
    </v-app-bar>

    <CMMenu v-if="mobile" />

    <v-main class="mb-10 mt-10">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import CAppBar from '@/components/frontend/appbar'
import CMMenu from '@/layout/frontend/menuMobile'
import drawerState from '@/store/drawerMobile'

export default {
  components: {
    CAppBar,
    CMMenu
  },

  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = false
      this.mobile = true
    }

    if (this.$route.path === '/') {
      this.$router.push('/home')
    }
  },

  data: () => ({
    dekstop: true,
    mobile: false
  }),

  methods: {
    toggleDrawer() {
      drawerState.commit('toggle', !drawerState.state.drawer)
    }
  }
}
</script>
