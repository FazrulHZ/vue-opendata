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
            <h2>{{ dataset.dataset_nama }}</h2>
            <div class="mt-2">
              {{ dataset.dataset_deskripsi }}
            </div>
            <div class="mt-5">
              <v-row>
                <v-col cols="12" md="3">
                  <div>
                    <h4>Grup :</h4>
                    <v-chip small color="green" text-color="white" label class="mt-2">
                      {{ dataset.grup_nama }}
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
                          <span class="subtitle-2">Sumber Data</span>
                        </v-col>
                        <v-col cols="12" md="9">
                          <span class="subtitle-2">: {{ dataset.dataset_sumber }}</span>
                        </v-col>
                      </v-row>
                    </div>
                    <div>
                      <v-row>
                        <v-col cols="12" md="3">
                          <span class="subtitle-2">Cakupan Data</span>
                        </v-col>
                        <v-col cols="12" md="9">
                          <span class="subtitle-2">: {{ dataset.dataset_cakupan }}</span>
                        </v-col>
                      </v-row>
                    </div>
                    <div>
                      <v-row>
                        <v-col cols="12" md="3">
                          <span class="subtitle-2">Dibuat</span>
                        </v-col>
                        <v-col cols="12" md="9">
                          <span class="subtitle-2">: {{ tglFormat(dataset.created_at) }}</span>
                        </v-col>
                      </v-row>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
          <v-divider class="my-5"></v-divider>
          <div>
            <h2>Data Dan Sumber Data :</h2>
          </div>

          <v-card to="/readmore" class="mt-5">
            <v-row no-gutters class="py-5">
              <v-col cols="2" class="my-auto text-center">
                <v-icon size="65">mdi-file-document-outline</v-icon>
              </v-col>
              <v-col cols="10">
                <div class="font-weight-black primary--text">
                  What is Lorem Ipsum?
                </div>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import orgCard from '@/components/frontend/dataset/orgCard'
export default {
  components: {
    orgCard
  },

  created() {
    if (this.$vuetify.breakpoint.name === 'xs' || this.$vuetify.breakpoint.name === 'sm') {
      this.dekstop = false
    }
    this.get_slug = this.$route.params.slug
  },

  data: () => ({
    dekstop: true,
    get_slug: '',
    dataset: {}
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getIMG(value) {
      if (value) {
        return 'http://localhost:3000/upload/organisasiGambar/' + value
      } else {
        return 'http://localhost:3000/upload/organisasiGambar/default.svg'
      }
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
