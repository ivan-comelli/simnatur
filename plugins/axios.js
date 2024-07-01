// plugins/axios.js

import axios from 'axios';

const createInstance = () => {
  const baseURL = process.env.API_URL; // Obtén la URL base desde la variable de entorno API_URL
  console.log(baseURL)

  const instance = axios.create({
    baseURL
  });

  instance.interceptors.request.use(
    config => {
      if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return instance;
};

export default function ({ $axios }) {
  $axios.setBaseURL(process.env.API_URL); // Configura la base URL globalmente

  const instance = createInstance();

  // Configura interceptores u otras configuraciones de Axios aquí si es necesario

  return instance;
}
