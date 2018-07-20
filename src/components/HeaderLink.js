import Link from 'gatsby-link'
import styled from 'styled-components'

export default styled(Link).attrs({
  activeStyle: {
    color: props => props.color || '#000',
  },
})`
  font-family: 'Open Sans';
  font-size: 1rem;
  text-decoration: none;
  margin: 10px;
  color: ${props => props.color || '#000'};
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }

  transition: 0.25s;
`
