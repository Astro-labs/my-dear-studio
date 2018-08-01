import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  font-family: 'Open Sans';
  ${BreakPoints({
    marginBottom: ['30px', '150px', '200px'],
  })};
`
