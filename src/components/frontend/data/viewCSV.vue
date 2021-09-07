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
        return openCSV.state.View
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
    headers: []
  }),

  mounted() {
    this.openCSV()
  },

  methods: {
    async openCSV() {
      await this.dataCSV.meta.fields.forEach((value, index) => {
        this.headers.push({ text: value, value: value, sortable: false, width: '300' })
      })
      openCSV.commit('viewCSV', false)
    }
  }
}
</script>
