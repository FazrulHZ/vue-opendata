<template>
  <div>
    <div>
      <GroupData />
    </div>

    <v-row class="mt-10">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Dataset Terbaru
          </v-card-title>
          <v-card-text>
            <v-card flat to="/listdataset">
              <div>
                <div class="font-weight-black">
                  What is Lorem Ipsum?
                </div>
                <div class="my-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
                <v-divider></v-divider>
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

  data: () => ({})
}
</script>
