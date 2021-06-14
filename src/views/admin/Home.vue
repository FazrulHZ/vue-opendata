<template>
  <div>
    <h3>ADMIN</h3>
    {{ session.user_lvl }}
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  data: () => ({
    session: ''
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
  }
}
</script>
