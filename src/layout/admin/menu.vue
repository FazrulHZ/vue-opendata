<template>
  <v-navigation-drawer v-model="drawer" app>
    <!--  -->
  </v-navigation-drawer>
</template>

<script>
import drawerState from '@/store/drawerAdmin'

export default {
  computed: {
    drawer: {
      get() {
        return drawerState.state.drawer
      },
      set(value) {
        // console.log('is drawer open: ' + value)
        drawerState.commit('toggle', value)
      }
    }
  }
}
</script>
