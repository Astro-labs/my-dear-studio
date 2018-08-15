import styled from 'styled-components'

import BreakPoints from './BreakPoints'

export default styled.div`
  width: 100%;
  ${BreakPoints({
    marginBottom: ['50px', '100px', '100px'],
  })};
`
