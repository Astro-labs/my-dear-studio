import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  ${BreakPoints({
    alignItems: ['center', 'flex-start', 'flex-start'],
  })};

  /* Unfortunately necessary */
  div {
    width: 100%;
  }
`
