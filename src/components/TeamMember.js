import styled from 'styled-components'

import BreakPoints from './BreakPoints'

export default styled.div`
  ${BreakPoints({
    width: ['290px', '250px', ' 350px'],
    marginBottom: ['50px', '100px', '100px'],
  })};
`
