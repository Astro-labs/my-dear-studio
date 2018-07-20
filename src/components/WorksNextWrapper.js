import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  display: flex;
  justify-content: ${props => (props.worksTotal > 3 ? 'space-around' : 'flex-start')};

  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
    alignItems: ['center', 'flex-start', 'flex-start'],
  })};
`
