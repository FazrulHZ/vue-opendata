<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-card elevation="2" to="/data">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-file-document-multiple-outline</v-icon>
            </div>
            <div>
              <div>
                <h1>{{ jumlahDataset }}</h1>
              </div>
              <div>
                Dataset
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="2" to="/data">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-database-outline</v-icon>
            </div>
            <div>
              <div>
                <h1>{{ jumlahData }}</h1>
              </div>
              <div>
                File Data
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="2" to="/organisasi">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-office-building-outline</v-icon>
            </div>
            <div>
              <div>
                <h1>{{ jumlahOrganisasi }}</h1>
              </div>
              <div>
                Organisasi
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="2" to="/grup">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-format-list-text</v-icon>
            </div>
            <div>
              <div>
                <h1>{{ jumlahGrup }}</h1>
              </div>
              <div>
                Grup
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    iconColor: 'primary',

    jumlahDataset: 0,
    jumlahData: 0,
    jumlahOrganisasi: 0,
    jumlahGrup: 0
  }),

  mounted() {
    this.getDataset()
    this.getOrganisasi()
    this.getGrup()
  },

  methods: {
    getDataset() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'dataset/')
        .then(res => {
          this.jumlahDataset = res.data.count
        })
        .catch(err => {
          console.log(err)
        })
    },
    getOrganisasi() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'organisasi/')
        .then(res => {
          this.jumlahOrganisasi = res.data.count
        })
        .catch(err => {
          console.log(err)
        })
    },
    getGrup() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'grup/')
        .then(res => {
          this.jumlahGrup = res.data.count
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
