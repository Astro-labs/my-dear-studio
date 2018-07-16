import { Link } from 'gatsby'
import styled from 'styled-components'

export default styled(Link).attrs({
  activeStyle: {
    color: '#d7b947',
  },
})`
  font-family: 'Open Sans';
  font-size: 16px;
  text-decoration: none;
  margin: 10px;
  color: #d7b947;
  font-weight: 700;

  &:hover {
    text-decoration: underline;
  }
`
