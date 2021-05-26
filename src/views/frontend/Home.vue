<template>
  <div>
    <div>
      <GroupData />
    </div>

    <v-row class="mt-10">
      <v-col cols="12">
        <v-card class="px-5">
          <v-card-title>
            DATASET TERBARU
          </v-card-title>
          <v-card-text v-for="item in datasets" :key="item.id">
            <v-card flat :to="'/listdataset/' + item.dataset_slug">
              <div>
                <div class="font-weight-black">
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

                <div class="my-2">
                  {{ item.dataset_deskripsi }}
                </div>
                <v-divider class="my-5"></v-divider>
              </div>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GroupData from '@/components/groupdata'

export default {
  name: 'Home',

  components: {
    GroupData
  },

  data: () => ({
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
