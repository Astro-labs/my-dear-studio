const siteMetadata = {
  siteUrl: 'https://mydearstudio.com',
  title: 'My Dear Studio',
  description: 'Boutique brasileira de Branding em Barcelona e Berlim. Criamos marcas feitas para um mundo como nós, que não acredita em fronteiras para a criatividade.',
  image: '/assets/logo_mydear_red.svg',
  fbAppId: '',
  twitterUser: '',
  color: '#000',
}

module.exports = {
  siteMetadata,
  mapping: {
    'MarkdownRemark.fields.team': `MarkdownRemark`,
    'MarkdownRemark.fields.projects': `MarkdownRemark`,
    'MarkdownRemark.fields.featuredImage': 'ImageSharp',
    'MarkdownRemark.fields.featuredOnProjectImage': 'ImageSharp',
    'MarkdownRemark.fields.images.image': 'ImageSharp',
  },
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
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/assets`,
        name: 'assets',
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-remark-copy-linked-files`,
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 2600,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
        {
          resolve: "gatsby-remark-embed-video",
          options: {
            width: 800,
            ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
            height: 400, // Optional: Overrides optional.ratio
            related: false, // Optional: Will remove related videos from the end of an embedded YouTube video.
            noIframeBorder: true // Optional: Disable insertion of <style> border: 0
          }
        },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-autolink-headers',
          `gatsby-remark-smartypants`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-118569586-1',
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: siteMetadata.color,
      },
    },
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
    'gatsby-plugin-netlify', // make sure to put last in the array
  ]
}
