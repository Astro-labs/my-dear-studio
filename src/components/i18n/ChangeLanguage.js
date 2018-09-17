import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const LinkStyled = styled.a`
  display: flex;
  font-size: 1rem;
  text-decoration: none;
  color: #7e7e7e;
  &:hover {
    text-decoration: underline;
  }

  transition: 0.25s;
  text-transform: uppercase;
`

const ChangeLanguage = ({ to, location, children }) => {
  return <LinkStyled href={`/${to}${location.pathname.substring(3)}`}>{children}</LinkStyled>
}

ChangeLanguage.propTypes = {
  to: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}

export default ChangeLanguage
