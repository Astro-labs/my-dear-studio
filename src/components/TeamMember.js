import styled from 'styled-components'

import BreakPoints from './BreakPoints'

export default styled.div`
  margin-bottom: 100px;
  ${BreakPoints({
    width: ['300px', '250px', ' 350px'],
  })};
`
