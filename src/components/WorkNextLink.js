import Link from 'gatsby-link'
import styled from 'styled-components'

import BreakPoints from './BreakPoints'

export default styled(Link)`
  ${BreakPoints({
    width: ['100%', '100%', '20%'],
    paddingRight: ['0', '20px', '20px'],
    paddingTop: ['20px', '0', '0'],
  })};
`
