<template>
  <div>
    <CBaner v-if="dekstop" />

    <v-app-bar app flat color="appBar" dark v-else>
      <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-row no-gutters class="text-center subtitle-1">
          <v-img src="@/assets/img/logomini2.png" max-width="35" class="mr-2"></v-img>
          Open Data | Kota Gorontalo
        </v-row>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import CBaner from '@/components/frontend/baner'
import drawerState from '@/store/drawerMobile'

export default {
  components: {
    CBaner
  },

  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = false
    }
  },

  data: () => ({
    drawer: null,
    dekstop: true
  }),

  methods: {
    toggleDrawer() {
      drawerState.commit('toggle', !drawerState.state.drawer)
    }
  }
}
</script>
