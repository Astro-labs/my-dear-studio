import Link from 'gatsby-link'
import styled from 'styled-components'

export default styled(Link).attrs({
  activeStyle: {
    color: props => props.color || '#7e7e7e',
  },
})`
  font-family: 'Open Sans';
  font-size: ${props => props.fontSize || '1rem'};
  text-decoration: none;
  margin: 10px;
  color: ${props => props.color || '#7e7e7e'};

  &:hover {
    text-decoration: underline;
  }

  transition: 0.25s;
`
