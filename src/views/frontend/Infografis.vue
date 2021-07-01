<template>
  <div>
    <v-card outlined color="CGray">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-card>

    <div class="mt-10" v-if="infografis.length === 0">
      <v-alert outlined type="error"> Belum Ada <strong>Infografis</strong> Untuk Saat Ini </v-alert>
    </div>

    <div class="mt-10" v-else>
      <v-row>
        <v-col cols="12" md="4" v-for="item in infografis" :key="item.infografis_id">
          <v-card outlined height="400" style="overflow-y: scroll" @click="showIMG(item.infografis_foto)">
            <div>
              <v-img :src="getIMG(item.infografis_foto)"></v-img>
            </div>
          </v-card>
          <div class="mt-5">
            <h3>{{ item.infografis_nama }}</h3>
          </div>
          <div class="mt-2">
            <span class="subtitle-2 grey--text">{{ item.infografis_deskripsi }}</span>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Data',

  data: () => ({
    infografis: [],

    items: [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Infografis',
        disabled: false,
        href: '/infografis'
      }
    ]
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getIMG(value) {
      if (value) {
        return process.env.VUE_APP_API_BASE + 'upload/infografisGambar/' + value
      } else {
        return process.env.VUE_APP_API_BASE + 'upload/organisasiGambar/default.svg'
      }
    },

    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'infografis/')
        .then(res => {
          this.jumlah = res.data.count
          this.infografis = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    showIMG(value) {
      window.open(process.env.VUE_APP_API_BASE + 'upload/infografisGambar/' + value, '_blank')
    }
  }
}
</script>
