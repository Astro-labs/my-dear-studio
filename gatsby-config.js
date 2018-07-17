const siteMetadata = {
  siteUrl: 'https://mydearstudio.com',
  title: 'hi',
  description: 'hi',
  image: 'jjj',
  fbAppId: 'jjj',
  twitterUser: 'hhh',
  color: '#000',
}

module.exports = {
  siteMetadata,
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/content`,
        name: 'content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 690,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'googleAnalyticsI',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: siteMetadata.color,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        description: siteMetadata.description,
        start_url: siteMetadata.url,
        background_color: siteMetadata.color,
        theme_color: siteMetadata.color,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/logos/logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-offline',
    'gatsby-plugin-netlify-cms',
  ],
}
