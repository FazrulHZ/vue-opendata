<template>
  <div>
    <v-card outlined color="CGray">
      <v-breadcrumbs :items="items" large></v-breadcrumbs>
    </v-card>

    <div class="mt-10">
      <v-text-field label="Cari Dataset" append-icon="mdi-magnify" solo rounded></v-text-field>
    </div>

    <div class="mb-5"><span class="font-weight-black">1850</span> <span>Dataset ditemukan</span></div>

    <div>
      <v-card>
        <v-row no-gutters class="pa-5">
          <v-col cols="1" class="my-auto">
            <v-icon size="65" :color="iconColor">mdi-file-document-outline</v-icon>
          </v-col>
          <v-col cols="11">
            <div class="font-weight-black primary--text">
              What is Lorem Ipsum?
            </div>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </v-col>
        </v-row>
      </v-card>
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
        text: 'Data',
        disabled: false,
        href: '/data'
      }
    ]
  })
}
</script>
