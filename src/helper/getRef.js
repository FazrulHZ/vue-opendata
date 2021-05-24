/* eslint-disable space-before-function-paren */

import axios from 'axios'

export default {
    Organisasi: async (token) => {
        const url = process.env.VUE_APP_API_BASE + 'organisasi'
        const response = await axios.get(url)
        return response.data.data
    }
}
