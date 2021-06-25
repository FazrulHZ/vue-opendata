<template>
  <div>
    <div>
      <v-img :src="getIMG(grup.grup_foto)"></v-img>
    </div>

    <div class="mt-5">
      <h3>{{ grup.grup_nama }}</h3>
    </div>

    <div class="mt-3">
      <span>{{ grup.grup_deskripsi }}</span>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.get_slug = this.$route.params.slug
  },

  data: () => ({
    get_slug: '',
    grup: {}
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/grupGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/grupGambar/default.jpg'
      }
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'grup/' + this.get_slug)
        .then(res => {
          this.grup = res.data.data
          console.log(this.grup)
        })
        .catch(err => {
          console.log(err)
        })
    },

    tglFormat(tgl) {
      const date = new Date(tgl)
      const dateTimeFormat = new Intl.DateTimeFormat('id', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      })
      const formatted = dateTimeFormat.formatToParts(date)
      return formatted[0].value + ' ' + formatted[2].value + ' ' + formatted[4].value
    }
  }
}
</script>
