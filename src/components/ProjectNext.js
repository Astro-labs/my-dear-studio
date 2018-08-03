import React from 'react'
import styled from 'styled-components'
import BreakPoints from './BreakPoints'

const svgExtension = /\.svg$/g

const ProjectNext = styled.img`
  object-fit: cover;

  ${BreakPoints({
    width: ['200px', '150px', '280px'],
    height: ['200px', '150px', '280px'],
  })};
`

export default ({ src }) => (
  <ProjectNext
    srcSet={!svgExtension.test(src.original.src) ? src.sizes.srcSet : src.original.src}
    sizes={src.sizes.sizes}
  />
)
