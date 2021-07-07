<template>
  <div>
    <v-data-table :headers="headers" :items="dataCSV.data" :items-per-page="10" :mobile-breakpoint="0" class="elevation-1"></v-data-table>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import openCSV from '@/store/viewCSV'

export default {
  props: ['dataCSV'],

  computed: {
    refresh: {
      get() {
        return openCSV.state.view
      }
    }
  },

  watch: {
    refresh() {
      this.openCSV()
    }
  },

  data: () => ({
    search: '',
    kolom: 0,
    headers: []
  }),

  mounted() {
    this.kolom = this.headers.length
  },

  methods: {
    async openCSV() {
      await this.dataCSV.meta.fields.forEach((value, index) => {
        // this.headers.push(value)
        this.headers.push({ text: value, value: value, sortable: false, width: '300' })
        // console.log(value)
        // console.log(index)
      })
      openCSV.commit('viewCSV', false)
    }
  }
}
</script>
