module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },

  pwa: {
    name: 'Mars Real Estate',
    themeColor: '#B71C1C',
    msTileColor: '#000000',

    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    assetsVersion: "2",

    // Very useful for situations when the app is accessed with a more complex url than 'host:port', for example 'host:port/login'
    // It redirects navigation to always show the default page and let the single page app handle navigation client side
    // It is mandatory to use this for app shortcuts to work
    workboxOptions: {
      navigateFallback: '/index.html'
    },

    manifestOptions: {
      lang: "en-EN",
      background_color: "#FAFAFA",
      categories: ["shopping", "business", "photos"],
      description: "An app that lets you see, find and purchase lands on the red planet.",
      start_url: ".",
      shortcuts: [
        {
          name: "Favorites",
          url: "/favorites",
        },
      ],
      icons: [
        {
          src: "./img/icons/mars-60x60.png",
          sizes: "60x60",
          type: "image/png"
        },
        {
          src: "./img/icons/mars-144x144.png",
          sizes: "144x144",
          type: "image/png"
        },
        {
          src: "./img/icons/mars-150x150.png",
          sizes: "150x150",
          type: "image/png"
        },
        {
          src: "./img/icons/mars-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/icons/mars-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./img/icons/mars-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/mars-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
      ],
    },

    iconPaths: {
      faviconSVG: 'img/icons/mars.svg',
      favicon32: 'img/icons/mars-60x60.png',
      favicon16: 'img/icons/mars-60x60.png',
      appleTouchIcon: 'img/icons/mars-192x192.png',
      maskIcon: 'img/icons/mars.svg',
      msTileImage: 'img/icons/mars-192x192.png',
    }

  }
}