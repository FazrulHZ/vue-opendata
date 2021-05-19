<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title>Kota Gorontalo</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import drawerState from '@/store/drawerAdmin'

export default {
  data: () => ({ drawer: null }),

  methods: {
    toggleDrawer() {
      drawerState.commit('toggle', !drawerState.state.drawer)
    }
  }
}
</script>
