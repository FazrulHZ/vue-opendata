<template>
  <div>
    <h1>Grup</h1>

    {{ dec.user_fullname }}
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  name: 'Grup',

  data: () => ({
    session: {},
    dec: {},
    cookie: ''
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.get('myCookie'))
    this.dec = await JSON.parse(Cookie.dec(Cookie.get('enc')))
  }
}
</script>
