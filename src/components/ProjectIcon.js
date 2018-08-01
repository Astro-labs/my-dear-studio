import styled from 'styled-components'
import BreakPoints from './BreakPoints'
// TODO: implement this gatsby-image lateron
// import Img from 'gatsby-image'

export default styled.img`
  ${BreakPoints({
    width: ['100%', '50%', '20%'],
    marginRight: ['0', '20px', '20px'],
  })};
`
