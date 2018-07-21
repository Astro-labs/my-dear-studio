import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const SEO = props => (
  <Helmet title={props.seoTitle}>
    {/* General tags */}
    <meta name="description" content={props.seoDescription} />
    <meta name="image" content={props.seoImage} />

    {/* OpenGraph tags */}
    <meta property="og:url" content="url-to-be-defined" />
    <meta property="og:title" content={props.seoTitle} />
    <meta property="og:description" content={props.seoDescription} />
    <meta property="og:image" content={props.seoImage} />
    <meta property="fb:app_id" content={props.fbAppId} />

    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={props.twitterUser} />
    <meta name="twitter:title" content={props.seoTitle} />
    <meta name="twitter:description" content={props.seoDescription} />
    <meta name="twitter:image" content={props.seoImage} />
  </Helmet>
)

SEO.propTypes = {
  seoTitle: PropTypes.string,
  seoDescription: PropTypes.string,
  seoImage: PropTypes.string,
  fbAppId: PropTypes.string,
  twitterUser: PropTypes.string,
}

export default SEO
