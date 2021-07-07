<template>
  <div>
    <v-card outlined class="pa-5">
      <v-row class="pb-5">
        <v-col v-if="dekstop" cols="12" md="3" style="position: sticky; top:70px; align-self: start;">
          <v-row no-gutters>
            <v-icon size="35" class="mr-2">mdi-office-building-outline</v-icon>
            <h2>Organisasi</h2>
          </v-row>
          <div class="mt-5">
            <orgCard />
          </div>
        </v-col>

        <v-col v-else cols="12" md="3">
          <v-row no-gutters>
            <v-icon size="35" class="mr-2">mdi-office-building-outline</v-icon>
            <h2>Organisasi</h2>
          </v-row>
          <div class="mt-5">
            <orgCard />
          </div>
        </v-col>

        <v-col cols="12" md="1" class="text-center">
          <v-divider vertical></v-divider>
        </v-col>

        <v-col cols="12" md="8">
          <div>
            <h2>Tahun {{ data.data_tahun }} - {{ data.data_nama }}</h2>
            <div class="mt-2">
              {{ data.data_ket }}
            </div>
            <div class="mt-5">
              <v-row>
                <v-col cols="12" md="3">
                  <div>
                    <h4>Grup :</h4>
                    <v-chip small color="green" text-color="white" label class="mt-1">
                      {{ data.grup_nama }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="9">
                  <div>
                    <h4>Meta Data :</h4>
                  </div>
                  <div>
                    <div>
                      <v-row>
                        <v-col cols="12" md="3">
                          <span class="subtitle-2">Dibuat</span>
                        </v-col>
                        <v-col cols="12" md="9">
                          <span class="subtitle-2">: {{ tglFormat(data.created_at) }}</span>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <v-divider class="my-3"></v-divider>
          <div class="text-right">
            <v-btn small class="mr-2" color="green" dark depressed @click="viewData">
              <v-icon class="mr-2">mdi-eye</v-icon>
              Lihat Data
            </v-btn>
            <v-btn small color="primary" depressed @click="download">
              <v-icon class="mr-2">mdi-download</v-icon>
              Unduh
            </v-btn>
          </div>

          <v-divider class="my-3"></v-divider>
          <div v-if="loading" class="mt-5">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="text-subtitle-1 text-center" cols="12">
                Mempersiapkan Data
              </v-col>
              <v-col cols="8" class="mt-n5">
                <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
              </v-col>
            </v-row>
          </div>

          <div v-else class="mt-5">
            <viewCSV :dataCSV="csvData" />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import orgCard from '@/components/frontend/data/orgCard'
import viewCSV from '@/components/frontend/data/viewCSV'
import openCSV from '@/store/viewCSV'

export default {
  components: {
    orgCard,
    viewCSV
  },

  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = false
    }
    this.get_slug = this.$route.params.slug
  },

  data: () => ({
    dekstop: true,
    loading: false,
    get_slug: '',

    data: {},
    csvData: []
  }),

  mounted() {
    this.getData()
  },

  methods: {
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
    },

    download() {
      window.location = process.env.VUE_APP_API_BASE + 'upload/data/' + this.data.data_file
    },

    viewData() {
      this.loading = true
      this.http
        .get(process.env.VUE_APP_API_BASE + 'data/papaparse/' + this.data.data_file)
        .then(res => {
          this.csvData = res.data.data
          this.loading = false
          openCSV.commit('viewCSV', true)
          console.log(openCSV.state.View)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
