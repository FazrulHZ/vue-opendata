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

        <v-list-item :to="'/admin/main'">
          <v-list-item-icon>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/admin/data'">
          <v-list-item-icon>
            <v-icon>mdi-database-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Data</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/admin/dataset'">
          <v-list-item-icon>
            <v-icon>mdi-clipboard-file-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Dataset</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/admin/organisasi'">
          <v-list-item-icon>
            <v-icon>mdi-office-building-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Organisasi</v-list-item-title>
        </v-list-item>

        <v-list-item :to="'/admin/grup'">
          <v-list-item-icon>
            <v-icon>mdi-format-list-text</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Grup</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-if="session.user_lvl === 'superadmin'" :to="'/admin/user'">
          <v-list-item-icon>
            <v-icon>mdi-account-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>User</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Cookie from '@/helper/cookie.js'
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
  },

  data: () => ({
    session: ''
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
  }
}
</script>
