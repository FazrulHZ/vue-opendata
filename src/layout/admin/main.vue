<template>
  <v-app id="inspire">
    <Menu />

    <Header />

    <v-main style="background: #EEEEEE;">
      <div class="ma-10">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/layout/admin/header'
import Menu from '@/layout/admin/menu'

export default {
  components: {
    Header,
    Menu
  },

  data: () => ({ drawer: null }),

  mounted() {
    this.$router.push('/admin/main')
  }
}
</script>
