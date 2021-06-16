<template>
  <div>
    <div>
      <v-img :src="getIMG(data.org_foto)"></v-img>
    </div>
    {{ data.org_foto }}

    <div class="mt-5">
      <h3>{{ data.org_nama }}</h3>
    </div>

    <div class="mt-3">
      <span>{{ data.org_ket }}</span>
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
    data: {}
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/default.svg'
      }
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'data/' + this.get_slug)
        .then(res => {
          this.data = res.data.data
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
