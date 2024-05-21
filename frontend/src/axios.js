import axios from "axios"
import router from "./router"

import { useSessionStore } from "./store/useSessionStore";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(config => {
    const session = useSessionStore();
    config.headers.Authorization = `Bearer ${session.user.token}`
    return config;
})

axiosClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        sessionStorage.removeItem('TOKEN')
        router.push({ name: 'login' })
    }
    throw error;
})

export default axiosClient;
