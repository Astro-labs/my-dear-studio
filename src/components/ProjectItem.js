import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  ${BreakPoints({
    padding: ['4px 0', '2px 4px', '2px 4px'],
  })};
`
