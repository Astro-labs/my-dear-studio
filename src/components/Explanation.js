import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BreakPoints from './BreakPoints'

const ExplanationWrapper = styled.div`
  ${BreakPoints({
    padding: ['0 50px', '60px 80px', '150px 100px'],
    marginTop: '58px',
  })};
`
const ExplanationDescription = styled.p`
  color: #7e7e7e;
  font-size: 1.3rem;
  margin: 0 0 35px 0;
`

const Explanation = ({ html, ...props }) => (
  <ExplanationWrapper {...props}>
    <ExplanationDescription dangerouslySetInnerHTML={{ __html: html }} />
  </ExplanationWrapper>
)

Explanation.propTypes = {
  html: PropTypes.string.isRequired,
}

export default Explanation
