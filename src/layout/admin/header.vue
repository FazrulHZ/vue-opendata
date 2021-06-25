<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawer()"></v-app-bar-nav-icon>

    <v-toolbar-title>Kota Gorontalo</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon x-large v-on="on">
          <v-avatar>
            <v-img :src="getIMG(session.user_foto)"></v-img>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar>
              <v-img :src="getIMG(session.user_foto)"></v-img>
            </v-avatar>
            <div class="my-3">
              <h4>{{ session.user_fullname }}</h4>
            </div>
            <v-divider></v-divider>
            <v-btn depressed text @click="profil()">
              Profil
            </v-btn>
            <v-divider></v-divider>
            <v-btn depressed text @click="logOut()">
              Sigin Out
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import Cookie from '@/helper/cookie.js'
import drawerState from '@/store/drawerAdmin'

export default {
  data: () => ({
    session: '',
    drawer: null
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
  },

  methods: {
    toggleDrawer() {
      drawerState.commit('toggle', !drawerState.state.drawer)
    },

    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/userGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/userGambar/default.png'
      }
    },

    logOut() {
      Cookie.delete()
      this.$router.push('/login')
    },

    profil() {
      this.$router.push('/admin/profil')
    }
  }
}
</script>
