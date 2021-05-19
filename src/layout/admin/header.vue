<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title>Application</v-toolbar-title>
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
