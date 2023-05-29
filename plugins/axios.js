import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = process.server ? `http://localhost:3000/xkbapp/fundapi/article/api` : `/xkbapp/fundapi/article/api`
    axios.defaults.headers = {
      "siteId":35,
    }

    return {
        provide: { 
            axios: axios
        },
    }
})