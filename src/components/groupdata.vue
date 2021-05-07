<template>
  <div>
    <v-row>
      <v-col cols="12" md="3">
        <v-card elevation="2">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-file-document-multiple-outline</v-icon>
            </div>
            <div>
              <div>
                <h1>900</h1>
              </div>
              <div>
                Dataset
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="2">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-database-outline</v-icon>
            </div>
            <div>
              <div>
                <h1>7891</h1>
              </div>
              <div>
                File Data
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="2">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-office-building-outline</v-icon>
            </div>
            <div>
              <div>
                <h1>35</h1>
              </div>
              <div>
                Organisasi
              </div>
            </div>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="2">
          <v-row no-gutters class="pa-3">
            <div class="mr-3 my-auto">
              <v-icon size="65" :color="iconColor">mdi-format-list-text</v-icon>
            </div>
            <div>
              <div>
                <h1>27</h1>
              </div>
              <div>
                Topik
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
    iconColor: 'primary'
  })
}
</script>
