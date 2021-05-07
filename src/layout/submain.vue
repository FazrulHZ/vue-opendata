<template>
  <div>
    <CAppBar />
    <v-main class="mb-10 mt-10">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import CAppBar from '@/components/appbar'
export default {
  components: {
    CAppBar
  },
  data: () => ({})
}
</script>
