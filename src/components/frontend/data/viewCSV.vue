<template>
  <div>
    {{ dataCSV.meta }}
    <v-data-table :headers="headers" :items="dataCSV.data" :items-per-page="10" :mobile-breakpoint="0" class="elevation-1"></v-data-table>

    <v-btn class="mt-3" color="primary" @click="add()">ADD</v-btn>
  </div>
</template>

<script>
/* eslint-disable no-undef */
export default {
  props: ['dataCSV'],

  data: () => ({
    search: '',
    kolom: 0,
    headers: []
  }),

  mounted() {
    this.kolom = this.headers.length
  },

  methods: {
    add() {
      this.dataCSV.meta.fields.forEach((value, index) => {
        // this.headers.push(value)
        this.headers.push({ text: value, value: value })
        // console.log(value)
        // console.log(index)
      })
    }
  }
}
</script>
