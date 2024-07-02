require('dotenv').config()
const fs = require('fs-extra');
const path = require('path');
require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`
});

module.exports = {
    target: 'server',
    ssr:'false',
    serverMiddleware: [
        { path: '/api', handler: '~/server/index.js' }
    ],
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Flone - VueJS eCommerce Template',
        titleTemplate: 'Flone | %s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
        
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/css/animation.css',
        '~/assets/scss/style.scss',
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        '~/plugins/vue-awesome-swiper.js',
        '~/plugins/vuejs-pagiante.js',
        '~/plugins/observe-visibility.js',
        '~/plugins/persistedState.client.js',
        '~/plugins/axios.js',
        { 
            src: '~/plugins/bootstrap.js', 
            mode: 'client'
        },
        {
            src: '~/plugins/vue-js-modal', 
            mode: 'client'
        },
        { 
            src: '~/plugins/notifications-client.js', 
            mode: 'client' 
        },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/style-resources',
        '@nuxtjs/axios',
    ],

    styleResources: {
        scss: [
            '~/assets/scss/_variables.scss',
        ]
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extractCSS: true,
        extend (config, ctx) {
        },
        babel: {
            compact: true
        },
    },
    hooks: {
        // Hook build:done para ejecutar al final del proceso de construcción
        'build:done'(builder) {
          console.log("Ejecutando acciones al final del build...");
    
          // Ruta del archivo que deseas copiar (por ejemplo, un archivo 'archivo-a-copiar.txt')
          const sourceDir = path.resolve(__dirname, 'server');
    
          // Ruta de destino dentro del directorio de salida de Nuxt.js
          const targetDir = path.resolve(builder.nuxt.options.build.dir, 'server');
          // Copiar el archivo al directorio de salida
          fs.copy(sourceDir, targetDir)
            .then(() => {
              console.log("¡Archivo copiado exitosamente al final del build!");
            })
            .catch(err => {
              console.error("Error al copiar el archivo:", err);
            });
        }
    },
    env: {
        API_URL: process.env.API_URL
    }
}
