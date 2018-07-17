import styled from 'styled-components'
import BreakPoints from './BreakPoints'

export default styled.div`
  background: #b93026;
  padding-top: 20px;
  ${BreakPoints({
    paddingBottom: ['100px', '150px', '200px'],
  })};
`
