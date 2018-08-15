import styled from 'styled-components'
import Grid from '../components/Grid'

import BreakPoints from './BreakPoints'

export default styled(Grid)`
  padding-bottom: 30px;
  ${BreakPoints({
    width: ['100%', '33%', '33%'],
  })};
`
