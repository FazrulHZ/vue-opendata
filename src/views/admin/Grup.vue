<template>
  <div>
    <div>
      <v-card outlined class="py-3 px-5 mb-5 elevation-2">
        <v-row no-gutters>
          <h3 class="my-auto">Daftar Grup</h3>
          <v-spacer></v-spacer>
          <CModalAdd />
        </v-row>
      </v-card>
    </div>

    <div>
      <v-alert v-model="alertBerhasil" type="success" dense dismissible>
        {{ alertMassage }}
      </v-alert>
      <v-alert v-model="alertGagal" type="error" dense dismissible>
        {{ alertMassage }}
      </v-alert>
    </div>

    <v-data-table :headers="headers" :items="grups" item-key="name" class="elevation-1">
      <template v-slot:top>
        <CModalView />
        <CModalEdit />
        <CModalDelete />
      </template>
      <template v-slot:[`item.nomor`]="{ item }">
        {{
          grups
            .map(function(x) {
              return x.org_id
            })
            .indexOf(item.org_id) + 1
        }}
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon small class="mr-1" @click="viewItem(item)">
          mdi-archive
        </v-icon>
        <v-icon small class="mr-1" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import CModalAdd from '@/components/grup/modalAdd'
import CModalEdit from '@/components/grup/modalEdit'
import CModalDelete from '@/components/grup/modalDelete'
import CModalView from '@/components/grup/modalView'

import modalView from '@/store/grup/modalView'
import modalEdit from '@/store/grup/modalEdit'
import modalHapus from '@/store/grup/modalHapus'
import refreshView from '@/store/grup/viewGrup'

export default {
  components: {
    CModalAdd,
    CModalEdit,
    CModalDelete,
    CModalView
  },

  computed: {
    refresh: {
      get() {
        return refreshView.state.Refresh
      }
    },
    alertMassage: {
      get() {
        return refreshView.state.alertMassage
      }
    },
    success: {
      get() {
        return refreshView.state.success
      },
      set(value) {
        refreshView.commit('alert', value)
      }
    },
    alertBerhasil: {
      get() {
        return refreshView.state.alertBerhasil
      },
      set(value) {
        refreshView.commit('berhasilAlert', value)
      }
    },
    alertGagal: {
      get() {
        return refreshView.state.alertGagal
      },
      set(value) {
        refreshView.commit('gagalAlert', value)
      }
    }
  },

  watch: {
    refresh() {
      this.getData()
      setTimeout(() => {
        this.alertGagal = false
        this.alertBerhasil = false
      }, 5000)
    }
  },

  data: () => ({
    grups: [],
    grup: {},

    viewIndex: '',
    editedIndex: '',
    dleteIndex: '',

    headers: [
      { text: 'Nomor', value: 'nomor', width: '100px', align: 'center', sortable: false },
      { text: 'Nama Grup', align: 'start', value: 'grup_nama' },
      { text: 'Deskripsi Grup', align: 'start', value: 'grup_deskripsi' },
      { text: 'Action', value: 'action', width: '100px' }
    ]
  }),

  mounted() {
    this.getData()
  },

  methods: {
    getData() {
      this.http
        .get(process.env.VUE_APP_API_BASE + 'grup')
        .then(res => {
          refreshView.commit('refreshData', false)
          this.grups = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },

    viewItem(item) {
      this.viewIndex = this.grups.indexOf(item)
      this.grup = Object.assign({}, item)
      modalView.commit('toggleModal', true)
      modalView.commit('viewModal', Object.assign({}, item))
    },

    editItem(item) {
      this.editedIndex = this.grups.indexOf(item)
      this.grup = Object.assign({}, item)
      modalEdit.commit('toggleModal', true)
      modalEdit.commit('viewModal', Object.assign({}, item))
    },

    deleteItem(item) {
      this.dleteIndex = this.grups.indexOf(item)
      this.grup = Object.assign({}, item)
      modalHapus.commit('toggleModal', true)
      modalHapus.commit('viewModal', Object.assign({}, item))
    }
  }
}
</script>
