import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  ${BreakPoints({
    paddingTop: ['0', '50px', '50px'],
  })};
`
