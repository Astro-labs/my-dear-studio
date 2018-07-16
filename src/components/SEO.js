import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'

const SEO = props => (
  <Helmet title={props.title}>
    {/* General tags */}
    <meta name="description" content={props.description} />
    <meta name="image" content={props.image} />

    {/* OpenGraph tags */}
    <meta property="og:url" content={window.location.href} />
    <meta property="og:title" content={props.title} />
    <meta property="og:description" content={props.description} />
    <meta property="og:image" content={props.image} />
    <meta property="fb:app_id" content={props.fbAppId} />

    {/* Twitter Card tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={props.twitterUser} />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.description} />
    <meta name="twitter:image" content={props.image} />
  </Helmet>
)

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  fbAppId: PropTypes.string,
  twitterUser: PropTypes.string,
}

export default SEO
