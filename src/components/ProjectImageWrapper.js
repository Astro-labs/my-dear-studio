import Link from 'gatsby-link'
import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled(Link)`
  width: 50%;
  ${BreakPoints({
    width: ['100%', '50%', '50%'],
    padding: ['0 !important', '0', '0'],
  })};
`
