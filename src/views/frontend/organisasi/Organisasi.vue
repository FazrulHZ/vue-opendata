<template>
  <div>
    <v-card outlined color="CGray">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-card>

    <div class="mt-10">
      <v-text-field label="Cari Organisasi" append-icon="mdi-magnify" solo rounded></v-text-field>
    </div>

    <div class="mb-5">
      <span class="font-weight-black">{{ jumlah }}</span> <span>Organisasi ditemukan</span>
    </div>

    <div>
      <v-row>
        <v-col cols="12" md="3" v-for="item in organisasis" :key="item.id">
          <v-card class="pa-4" :to="'/organisasi/' + item.org_slug">
            <v-row no-gutters>
              <v-col cols="3" class="my-auto">
                <v-icon size="50" color="primary">mdi-office-building-outline</v-icon>
              </v-col>
              <v-col cols="9">
                <span class="subtitle-2">{{ item.org_nama }}</span>
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                <v-divider class="mb-3"></v-divider>
                <span class="font-weight-black">{{ item.totalDataset }} Dataset</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Data',

  data: () => ({
    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Organisasi',
        disabled: false,
        href: '/organisasi'
      }
    ],

    jumlah: 0,
    organisasis: []
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'dataset/organisasi')
        .then(res => {
          this.jumlah = res.data.count
          this.organisasis = res.data.data
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
