import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
  })};
  div {
    line-height: 0;
    padding: 4px;
    width: 100%;
  }
`
