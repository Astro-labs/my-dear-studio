import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  ${BreakPoints({
    padding: ['4px 0', '4px', '4px'],
  })};
`
