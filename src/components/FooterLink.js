import { Link } from 'gatsby'
import styled from 'styled-components'

export default styled(Link).attrs({
  activeStyle: {
    color: '#575757',
  },
})`
  font-family: 'Open Sans';
  font-size: 1rem;
  text-decoration: none;
  margin: 10px 0;
  color: #575757;

  &:hover {
    text-decoration: underline;
  }
`
