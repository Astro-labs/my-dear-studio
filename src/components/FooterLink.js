import styled from 'styled-components'

export default styled.a.attrs({
  target: '_blank',
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
