<template>
  <div>
    <v-row>
      <v-col v-if="dekstop" cols="12" md="3" style="position: sticky; top:70px; align-self: start;">
        <h2>Grup</h2>
        <div class="mt-5">
          <grupCard />
        </div>
      </v-col>

      <v-col v-else cols="12" md="3">
        <h2>Grup</h2>
        <div class="mt-5">
          <grupCard />
        </div>
      </v-col>

      <v-col cols="12" md="1" class="text-center">
        <v-divider v-if="dekstop" vertical></v-divider>
        <v-divider v-else></v-divider>
      </v-col>

      <v-col cols="12" md="8">
        <div>
          <v-text-field label="Cari Dataset" append-icon="mdi-magnify" solo rounded></v-text-field>
        </div>

        <div>
          <span class="font-weight-black">{{ count }}</span> <span>Dataset ditemukan</span>
        </div>

        <div class="mt-2" v-if="datasets.length === 0">
          <v-alert outlined type="error"> Belum Ada <strong>Dataset</strong> Untuk <strong>Grup</strong> Ini </v-alert>
        </div>

        <v-card v-else v-for="item in datasets" :key="item.dataset_id" :to="'/dataset/' + item.dataset_slug" class="mt-5">
          <v-row no-gutters class="py-5">
            <v-col cols="2" class="my-auto text-center">
              <v-icon size="65" color="primary">mdi-file-document-outline</v-icon>
            </v-col>
            <v-col cols="10">
              <div class="font-weight-black primary--text">
                {{ item.dataset_nama }}
              </div>

              <v-row no-gutters class="my-1">
                <div class="grey--text mr-5">
                  <v-icon color="grey" small class="mr-2">mdi-clock-time-nine-outline</v-icon>
                  <span class="caption">{{ tglFormat(item.datasetCreated) }}</span>
                </div>
              </v-row>

              {{ item.dataset_deskripsi }}
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import grupCard from '@/components/frontend/grup/grupCard'

export default {
  components: {
    grupCard
  },

  data: () => ({
    dekstop: true,

    get_slug: '',

    count: 0,
    datasets: []
  }),

  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = false
    }

    this.get_slug = this.$route.params.slug
  },

  mounted() {
    this.getDataset()
  },

  methods: {
    getDataset() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'grup/dataset/' + this.get_slug)
        .then(res => {
          this.datasets = res.data.data
          this.count = res.data.count
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
