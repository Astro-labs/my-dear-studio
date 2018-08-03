import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import BreakPoints from './BreakPoints'

const ProjectIcon = styled(Img)`
  ${BreakPoints({
    width: ['100%', '50%', '20%'],
    marginRight: ['0', '20px', '20px'],
  })};
`

export default ({ src }) => (
  <ProjectIcon
    sizes={src ? src.sizes : []}
    style={{
      height: '100%',
      width: '100%',
      minHeight: '300px',
      minWidth: '300px',
    }}
  />
)
