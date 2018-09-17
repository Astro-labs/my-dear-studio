import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const IsCurrentLanguage = ({ language, location, children }) => (
  <Fragment>{location.includes(language) ? children : null}</Fragment>
)

IsCurrentLanguage.propTypes = {
  language: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  children: PropTypes.node.isRequired,
}

export default IsCurrentLanguage
