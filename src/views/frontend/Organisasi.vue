<template>
  <div>
    <v-card outlined color="CGray">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-card>

    <div class="mt-10">
      <v-text-field label="Cari Organisasi" append-icon="mdi-magnify" solo rounded></v-text-field>
    </div>

    <div class="mb-5"><span class="font-weight-black">50</span> <span>Organisasi ditemukan</span></div>

    <div>
      <v-row>
        <v-col cols="12" md="3">
          <v-card class="pa-4">
            <v-row no-gutters>
              <v-col cols="3" class="my-auto">
                <v-icon size="50" color="primary">mdi-office-building-outline</v-icon>
              </v-col>
              <v-col cols="9">
                <span>Badan Kepegawaian Daerah</span>
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                <v-divider class="mb-3"></v-divider>
                <span class="font-weight-black">12 Dataset</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="pa-4">
            <v-row no-gutters>
              <v-col cols="3" class="my-auto">
                <v-icon size="50" color="primary">mdi-office-building-outline</v-icon>
              </v-col>
              <v-col cols="9">
                <span>Badan Kepegawaian Daerah</span>
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                <v-divider class="mb-3"></v-divider>
                <span class="font-weight-black">12 Dataset</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="pa-4">
            <v-row no-gutters>
              <v-col cols="3" class="my-auto">
                <v-icon size="50" color="primary">mdi-office-building-outline</v-icon>
              </v-col>
              <v-col cols="9">
                <span>Badan Kepegawaian Daerah</span>
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                <v-divider class="mb-3"></v-divider>
                <span class="font-weight-black">12 Dataset</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12" md="3">
          <v-card class="pa-4">
            <v-row no-gutters>
              <v-col cols="3" class="my-auto">
                <v-icon size="50" color="primary">mdi-office-building-outline</v-icon>
              </v-col>
              <v-col cols="9">
                <span>Badan Kepegawaian Daerah</span>
              </v-col>
              <v-col cols="12" class="text-center mt-3">
                <v-divider class="mb-3"></v-divider>
                <span class="font-weight-black">12 Dataset</span>
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
    ]
  })
}
</script>
