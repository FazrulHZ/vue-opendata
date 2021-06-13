<template>
  <div>
    <h1>Grup</h1>

    {{ session }}
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  name: 'Grup',

  data: () => ({
    session: {}
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
  }
}
</script>
