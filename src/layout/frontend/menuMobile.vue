<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list dense>
      <v-list-item-group active-class="primary--text text--accent-4">
        <v-list-item class="py-2">
          <v-list-item-icon>
            <v-img src="@/assets/img/logomini.png" max-width="26"></v-img>
          </v-list-item-icon>
          <v-list-item-title>
            <h2 class="primary--text">
              OPEN DATA
            </h2>
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="'/home'">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/data'">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-file-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Data</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/organisasi'">
          <v-list-item-icon>
            <v-icon>mdi-office-building-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Organisasi</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/grup'">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Grup</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item :to="'/login'">
          <v-list-item-icon>
            <v-icon>mdi-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Login</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import drawerState from '@/store/drawerMobile'

export default {
  computed: {
    drawer: {
      get() {
        return drawerState.state.drawer
      },
      set(value) {
        drawerState.commit('toggle', value)
      }
    }
  }
}
</script>
