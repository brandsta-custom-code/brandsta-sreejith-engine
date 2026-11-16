import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-11-01',
  devtools: { enabled: false },

  devServer: {
    host: '0.0.0.0',
    port: 3004
  },

  modules: ['@nuxt/fonts'],

  fonts: {
    defaults: {
      styles: ['normal'],
      subsets: ['latin'],
      preload: true,
      fallbacks: {
        'sans-serif': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      }
    },
    families: [
      {
        name: 'Lato',
        provider: 'google',
        weights: [300, 400, 700],
        styles: ['normal', 'italic'],
        global: true
      }
    ]
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()]
  },

  nitro: {
    compressPublicAssets: true
  },

  runtimeConfig: {
    wpSiteDomain: process.env.WP_SITE_DOMAIN || 'sreejithtravelweb.wordpress.com',
    wpAllowedUsername: process.env.WP_ALLOWED_USERNAME || 'sreejithtravelweb',
    resendApiKey: process.env.RESEND_API_KEY || '',
    resendFromEmail: process.env.RESEND_FROM_EMAIL || 'Digital Concierge - Sree Jith Travel - Brandsta <onboarding@resend.dev>',
    resendToEmails: process.env.RESEND_TO_EMAILS || '',
    enableLoginAlerts: process.env.ENABLE_LOGIN_ALERTS !== 'false',
    gdriveClientId: process.env.GDRIVE_CLIENT_ID || '',
    gdriveClientSecret: process.env.GDRIVE_CLIENT_SECRET || '',
    gdriveRefreshToken: process.env.GDRIVE_REFRESH_TOKEN || '',
    gdriveFolderId: process.env.GDRIVE_FOLDER_ID || '',
    public: {
      wpSiteDomain: process.env.WP_SITE_DOMAIN || 'sreejithtravelweb.wordpress.com',
      wpAllowedUsername: process.env.WP_ALLOWED_USERNAME || 'sreejithtravelweb',
      studioUrl: 'https://sreejith.brandsta.cc'
    }
  },

  routeRules: {
    '/**': {
      headers: {
        'X-Robots-Tag': 'noindex, nofollow, noarchive'
      }
    }
  },

  app: {
    baseURL: '/',
    buildAssetsDir: 'assets',
    pageTransition: { name: 'studio-fade', mode: 'out-in' },
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Digital Concierge | Sree Jith Travel - Brandsta',
      htmlAttrs: { lang: 'en' },

      meta: [
        {
          name: 'description',
          content: 'A dedicated content management dashboard for Sree Jith Travel, featuring itineraries, insights, stories and website content - Powered by Brandsta.'
        },
        // CRITICAL: Block search engine indexing on private concierge tool
        { name: 'robots', content: 'noindex, nofollow, noarchive' },
        { name: 'author', content: 'kriz - https://brandsta.in' },
        { name: 'application-name', content: 'Data - Sree Jith Travel' },

        // Local Business Geographic Coordinates (Kakkayur, Palakkad, Kerala)
        { name: 'geo.region', content: 'IN-KL' },
        { name: 'geo.placename', content: 'Kakkayur, Palakkad, Kerala' },
        { name: 'geo.position', content: '10.6566728;76.6299029' },
        { name: 'ICBM', content: '10.6566728, 76.6299029' },

        // Windows PWA & Mobile Meta Tags
        { name: 'msapplication-TileColor', content: '#030712' },
        { name: 'msapplication-TileImage', content: '/images/favicons/ms-icon-144x144.png' },
        { name: 'theme-color', content: '#030712' },
        { name: 'msapplication-config', content: '/browserconfig.xml' },

        // Apple Safari & PWA Customizations
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'apple-mobile-web-app-title', content: 'Digital Hub - Sree Jith Travel' },

        // Global Social Layout Standards (1200x630 JPG)
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_IN' },
        { property: 'og:site_name', content: 'Digital Hub - Sree Jith Travel' },
        { property: 'og:url', content: 'https://sreejith.brandsta.cc/' },
        { property: 'og:title', content: 'Digital Concierge | Sree Jith Travel - Brandsta' },
        {
          property: 'og:description',
          content: 'Designing luxury bespoke journeys bringing together meaningful experiences and authentic stories across Kerala and South India.'
        },
        { property: 'og:image', content: 'https://sreejith.brandsta.cc/images/og/home.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/jpeg' },

        // Twitter / X Layout Standards
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://sreejith.brandsta.cc/' },
        { name: 'twitter:title', content: 'Digital Concierge | Sree Jith Travel - Brandsta' },
        {
          name: 'twitter:description',  
          content: 'A dedicated content management dashboard for Sree Jith Travel, featuring itineraries, insights, stories and website content - Powered by Brandsta.'
        },
        { name: 'twitter:image', content: 'https://sreejith.brandsta.cc/images/og/home.jpg' }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Apple Touch Icons
        { rel: 'apple-touch-icon', sizes: '57x57', href: '/images/favicons/apple-icon-57x57.png' },
        { rel: 'apple-touch-icon', sizes: '60x60', href: '/images/favicons/apple-icon-60x60.png' },
        { rel: 'apple-touch-icon', sizes: '72x72', href: '/images/favicons/apple-icon-72x72.png' },
        { rel: 'apple-touch-icon', sizes: '76x76', href: '/images/favicons/apple-icon-76x76.png' },
        { rel: 'apple-touch-icon', sizes: '114x114', href: '/images/favicons/apple-icon-114x114.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/images/favicons/apple-icon-120x120.png' },
        { rel: 'apple-touch-icon', sizes: '144x144', href: '/images/favicons/apple-icon-144x144.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/images/favicons/apple-icon-152x152.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/favicons/apple-icon-180x180.png' },
        { rel: 'apple-touch-icon', sizes: '167x167', href: '/images/favicons/apple-icon.png' },
        { rel: 'apple-touch-icon', sizes: '190x190', href: '/images/favicons/apple-icon-precomposed.png' },
        // Standard Favicons
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/favicons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/favicons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/images/favicons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/images/favicons/android-icon-192x192.png' },
        // Web Manifest
        { rel: 'manifest', crossorigin: 'use-credentials', href: '/manifest.json' }
      ]
    }
  }
})