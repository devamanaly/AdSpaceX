import axios from "axios";
import Cookies from 'js-cookie';

export const PublicAxios = axios.create({
    baseURL:"http://localhost:5001/api",
    timeout:100000,
    headers:{'Content-Type':'application/json'}
})

export const Axios = axios.create({
    baseURL:"http://localhost:5001/api",
    timeout:100000,
    headers:{'Content-Type':'application/json'}})

    Axios.interceptors.request.use(
        (config) => {
          const token = Cookies.get('token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );