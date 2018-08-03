import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 2rem;
  margin-right: 2rem;

  ${BreakPoints({
    alignItems: ['center', 'flex-start', 'flex-start'],
  })};

  @media screen and (min-width: 1600px) {
    margin-left: 20rem;
    margin-right: 20rem;
  }
`
