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
      </div>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'baner',

  data: () => ({}),

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
    }
  }
}
</script>
