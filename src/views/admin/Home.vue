<template>
  <div>
    <v-card class="pa-5">
      <span class="font-weight-light">Organisasi</span>
      <h2>{{ user.org_nama }}</h2>
    </v-card>

    <v-row class="mt-10">
      <v-col class="12" md="6">
        <v-card elevation="2" to="/admin/dataset">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" color="primary">mdi-file-document-multiple-outline</v-icon>
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

      <v-col class="12" md="6">
        <v-card elevation="2" to="/admin/dataset">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" color="primary">mdi-database-outline</v-icon>
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
    </v-row>
  </div>
</template>

<script>
import Cookie from '@/helper/cookie.js'

export default {
  data: () => ({
    session: '',

    jumlahDataset: 0,
    jumlahData: 0,
    jumlahGrup: 0,

    user: {}
  }),

  async mounted() {
    this.session = await JSON.parse(Cookie.dec(Cookie.get('myCookie')))
    this.getData()
    this.getDataset()
    this.getOrganisasi()
    this.getGrup()
  },

  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'users/' + this.session.user_nama, {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
        .then(res => {
          this.user = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    getDataset() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'dataset/user/dataset', {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
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
        .get(process.env.VUE_APP_API_BASE + 'grup/user/grup', {
          headers: {
            Authorization: 'Bearer ' + this.session.token
          }
        })
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
