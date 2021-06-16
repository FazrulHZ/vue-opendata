<template>
  <div>
    <v-card outlined color="CGray">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-card>

    <div class="mt-10">
      <v-text-field v-model="cariDataset" label="Cari Dataset" append-icon="mdi-magnify" solo rounded v-on:keyup.enter="cariData"></v-text-field>
    </div>

    <div class="mb-5">
      <span class="font-weight-black">{{ count }}</span> <span>Dataset ditemukan</span>
    </div>

    <div v-if="cariLoading">
      <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
    </div>

    <div v-else>
      <v-card v-for="item in datasets" :key="item.id" :to="'/dataset/' + item.dataset_slug" class="mb-10">
        <v-row no-gutters class="pa-5">
          <v-col cols="2" md="1" class="my-auto">
            <v-icon size="65">mdi-file-document-outline</v-icon>
          </v-col>
          <v-col cols="10" md="11">
            <div class="font-weight-black primary--text">
              {{ item.dataset_nama }}
            </div>

            <v-row no-gutters class="my-1">
              <div class="grey--text mr-5">
                <v-icon color="grey" small class="mr-2">mdi-clock-time-nine-outline</v-icon>
                <span class="caption">{{ tglFormat(item.created_at) }}</span>
              </div>

              <div class="grey--text">
                <v-icon color="grey" small class="mr-2">mdi-office-building-outline</v-icon>
                <span class="caption">{{ item.org_nama }}</span>
              </div>
            </v-row>

            <div>
              {{ item.dataset_deskripsi }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Data',

  data: () => ({
    cariLoading: false,

    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Data',
        disabled: false,
        href: '/dataset'
      }
    ],

    cariDataset: '',

    count: 0,
    datasets: []
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'dataset')
        .then(res => {
          this.datasets = res.data.data
          this.count = res.data.count
        })
        .catch(err => {
          console.log(err)
        })
    },

    cariData() {
      this.cariLoading = true
      const data = { dataset_nama: this.cariDataset }
      this.http
        .post(process.env.VUE_APP_API_BASE + 'dataset/cari', data)
        .then(res => {
          this.datasets = res.data.data
          this.count = res.data.count
          this.cariLoading = false
        })
        .catch(err => {
          console.log(err)
          this.cariLoading = false
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
