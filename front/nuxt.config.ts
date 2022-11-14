// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    build: {
        transpile: [
            '@fortawesome/vue-fontawesome',
            '@fortawesome/free-brands-svg-icons',
            '@fortawesome/free-solid-svg-icons'
        ]
    },
    app:{
        head: {
        charset:'utf-16',
        title:'Groupomania',
        link: [
            { rel: 'icon', type: 'image/png', href: '/favicon.png' }
        ],
        }
    },
    css: [
        '@fortawesome/fontawesome-svg-core/styles.css'
      ],
      runtimeConfig: {
        public: {
            APIURL: process.env.APIURL,
        }
      }
})
