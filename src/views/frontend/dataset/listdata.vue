<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <h2>Organisasi</h2>
        <div class="mt-5">
          <datasetCard />
        </div>
      </v-col>
      <v-col cols="12" md="8">
        <div>
          <v-text-field label="Cari Dataset" append-icon="mdi-magnify" solo rounded></v-text-field>
        </div>

        <div><span class="font-weight-black">12</span> <span>Dataset ditemukan</span></div>

        <v-card to="/readmore" class="mt-5">
          <v-row no-gutters class="py-5">
            <v-col cols="2" class="my-auto text-center">
              <v-icon size="65" :color="iconColor">mdi-file-document-outline</v-icon>
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
  </div>
</template>

<script>
import datasetCard from '@/components/datasetCard'
export default {
  components: {
    datasetCard
  },
  data: () => ({})
}
</script>
