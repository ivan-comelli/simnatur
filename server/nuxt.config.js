module.exports = {
  ssr: true, // o false si prefieres un SPA
  target: 'server', // asegúrate de que el target esté configurado para el servidor
  build: {
    dir: 'dist/api'
    // Configuración de build específica del servidor
  },
  modules: [
    // Módulos específicos del servidor
  ],
  plugins: [
    // Plugins específicos del servidor
  ],
  // Otras configuraciones específicas del servidor
}