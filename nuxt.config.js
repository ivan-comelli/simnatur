require('dotenv').config()

export default {
    generate: {
        fallback: true
    },

    target: 'server', // default is 'server'
    server: {
        port: process.env.PORT || 3000, // Usar variable de entorno PORT, si está definida
        host: process.env.HOST || '0.0.0.0' // Usar variable de entorno HOST, si está definida
    },
    env: {
        apiUrl: process.env.API_URL
    },
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
        '~/assets/scss/style.scss',
        '~/assets/css/animation.css',
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
            compact: true,
        },
    },
    serverMiddleware: [
        '~/api/index.js'
    ],
    axios: {
        baseURL: 'http://localhost:3001', // Cambia esto a la URL de tu backend
    },
}
