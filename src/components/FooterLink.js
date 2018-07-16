import { Link } from 'gatsby'
import styled from 'styled-components'

export default styled(Link).attrs({
  activeStyle: {
    color: '#575757',
  },
})`
  font-family: 'Open Sans';
  font-size: 16px;
  text-decoration: none;
  margin: 10px;
  color: #575757;

  &:hover {
    text-decoration: underline;
  }
`
