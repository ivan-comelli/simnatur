const fs = require('fs-extra');
const dotenv = require('dotenv');

// Define los posibles entornos y sus archivos .env correspondientes
const envFiles = {
    development: '.env.development',
    production: '.env.production',
    test: '.env.test'
  };
  
  // Obtén el entorno actual, o usa 'development' por defecto
  const env = process.env.NODE_ENV || 'development';
  
  // Obtén el archivo .env correspondiente
  const envFile = envFiles[env];
  
  // Verifica si el archivo .env existe y cárgalo
  if (fs.existsSync(envFile)) {
    dotenv.config({ path: envFile });
  } else {
    console.warn(`Archivo de configuración ${envFile} no encontrado, asegurate de que el archivo exista.`);
  }

module.exports = {
    target: 'server',
    ssr:'false',
    serverMiddleware: [
        { path: '/api', handler: '~/server/index.js' }
    ],
    render: {
        static: {
          setHeaders(res, path) {
            console.log(`Configurando headers para la URL: ${path}`);
            res.setHeader('Cache-Control', 'no-cache');
          }
        }
    },

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Simnatur - Primera Calidad de Productos Naturales',
        titleTemplate: 'Simnatur | %s',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        ],
        script: [
            {
              src: 'https://sdk.mercadopago.com/js/v2',
              body: false  // Cargar el script al final del body
            }
          ]
        
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
        //{ 
        //    src: '~/plugins/register-sw.js',
        //    mode: 'client' 
        //}
    ],//

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
        }
    },
    env: {
        API_URL: process.env.API_URL,

    }
}
