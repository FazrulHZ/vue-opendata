<template>
  <div>
    <CHeader />
    <v-main class="mb-10">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import CHeader from '@/layout/frontend/header'
export default {
  components: {
    CHeader
  },
  data: () => ({}),

  mounted() {
    window.onscroll = () => {
      this.changeColor()
    }
  },
  methods: {
    changeColor() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        this.bg = 'white'
      } else {
        this.bg = 'transparent'
      }
    }
  }
}
</script>
