import Link from 'gatsby-link'
import styled from 'styled-components'

import BreakPoints from './BreakPoints'

export default styled(Link)`
  width: 100%;

  ${BreakPoints({
    paddingRight: ['0', '20px', '20px'],
    paddingTop: ['20px', '0', '0'],
  })};
`
