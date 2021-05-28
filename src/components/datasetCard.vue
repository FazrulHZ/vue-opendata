<template>
  <div>
    <div>
      <v-img :src="getIMG(dataset.org_foto)"></v-img>
    </div>

    <div class="mt-5">
      <h3>{{ dataset.org_nama }}</h3>
    </div>

    <div class="mt-3">
      <span>{{ dataset.org_ket }}</span>
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
    dataset: {}
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getIMG(value) {
      return 'http://localhost:3000/upload/organisasiGambar/' + value
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'dataset/' + this.get_slug)
        .then(res => {
          this.dataset = res.data.data
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
