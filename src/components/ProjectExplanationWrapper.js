import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  width: 50%;
  justify-content: center;
  align-items: center;
  ${BreakPoints({
    display: ['none', 'flex', 'flex'],
  })};
`
