<template>
  <div>
    <v-app-bar app color="appBar">
      <v-toolbar-title>
        <v-img src="@/assets/img/logo.png" max-width="160"></v-img>
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
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  name: 'baner',

  data: () => ({
    session: ''
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
  },

  methods: {
    home() {
      this.$router.push('/').catch(() => {})
    },

    data() {
      this.$router.push('/data').catch(() => {})
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
