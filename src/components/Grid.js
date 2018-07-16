import styled from 'styled-components'

export default styled.div`
  display: flex;
  justify-content: ${props => props.justifyContent || 'center'};
  align-items: ${props => props.alignItems || 'center'};
  flex-direction: ${props => props.direction || 'row'};
`
