import styled from 'styled-components'

import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  ${BreakPoints({
    flexDirection: ['column', 'column', 'row'],
    justifyContent: 'center',
    alignItems: ['center', 'center', 'flex-start'],
  })};
`
