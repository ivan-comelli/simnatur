// plugins/axios.js
export default function ({ $axios, redirect }) {
  // Configura la URL base (opcional)
  $axios.defaults.baseURL = process.env.API_URL || 'http://localhost:3000';

  // Intercepta la solicitud y añade el token de autorización
  $axios.onRequest(async (config) => {
    try {
      if(process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
    }
    return config;
  });

  // Manejo global de errores (opcional)
  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {

    }
    return Promise.reject(error);
  });
}
