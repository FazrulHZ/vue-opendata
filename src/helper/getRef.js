/* eslint-disable space-before-function-paren */

import axios from 'axios'

export default {
    Organisasi: async (token) => {
        const url = process.env.VUE_APP_API_BASE + 'organisasi'
        const response = await axios.get(url)
        return response.data.data
    },

    Grup: async (token) => {
        const url = process.env.VUE_APP_API_BASE + 'grup'
        const response = await axios.get(url)
        return response.data.data
    },

    Dataset: async (token) => {
        const url = process.env.VUE_APP_API_BASE + 'dataset'
        const response = await axios.get(url)
        return response.data.data
    }
}
