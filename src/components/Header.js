import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  background: transparent;
  transition: 0.35s;
  ${BreakPoints({
    padding: ['15px 0', '25px 0', '25px 0'],
  })};
  z-index: 2;
`
