export default function ({ $axios }) {
    $axios.onRequest(config => {
      if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.common['Authorization'] = `Bearer ${token}`;
        }
      }
      return config;
    });
  }