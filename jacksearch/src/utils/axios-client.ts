//src/utils/axios-client.ts
import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://api.invixinvitation.com",
    // baseURL: "http://127.0.0.1:8082",
    withCredentials: true, // penting biar cookie ikut terkirim
});

export default axiosClient;
