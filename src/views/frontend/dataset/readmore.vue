<template>
  <div>
    <v-card outlined class="pa-5">
      <v-row class="pb-5">
        <v-col cols="12" md="3">
          <v-row no-gutters>
            <v-icon size="35" :color="iconColor" class="mr-2">mdi-office-building-outline</v-icon>
            <h2>Organisasi</h2>
          </v-row>
          <div class="mt-5">
            <datasetCard />
          </div>
        </v-col>
        <v-col cols="12" md="1" class="text-center">
          <v-divider vertical></v-divider>
        </v-col>
        <v-col cols="12" md="8">
          <div>
            <h2>Data Jumlah Penduduk Berdasarkan Agama Per Kelurahan</h2>
            <div class="mt-2">
              Data ini Berisi Mengenai Data Jumlah Penduduk Berdasarkan Agama Per Kelurahan Penjelasan Variabel ini berisi Mengenai 1. tahun : Tahun 2. provinsi : Provinsi 3. kabupaten_kota : Kabupaten Kota 4. kecamatan : Kecamatan 5. kelurahan :
              Kelurahan 6. agama : Agama 7. jumlah : Jumlah
            </div>
            <div class="mt-5">
              <v-row>
                <v-col cols="12" md="6">
                  <div>
                    <h4>Topik :</h4>
                    <v-chip small color="green" text-color="white" label class="mt-2">
                      Green Chip
                    </v-chip>
                  </div>
                  <div class="mt-5">
                    <h4>Tag :</h4>
                    <v-chip small color="green" text-color="white" label class="mt-2">
                      Green Chip
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                  <div>
                    <h4>Meta Data :</h4>
                  </div>
                  <div>
                    <ul>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>6</li>
                      <li>7</li>
                      <li>8</li>
                      <li>9</li>
                      <li>10</li>
                    </ul>
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
    </v-card>
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
