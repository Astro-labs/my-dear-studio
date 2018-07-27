import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  justify-content: space-around;

  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
    alignItems: ['center', 'flex-start', 'flex-start'],
  })};
`
