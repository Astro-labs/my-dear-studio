import React from 'react'
import styled from 'styled-components'
import Img from 'gatsby-image'
import BreakPoints from './BreakPoints'

const svgExtension = /\.svg$/g

const ProjectIcon = styled(Img)`
  ${BreakPoints({
    width: ['150px', '160px', '150px'],
    height: ['150px', '160px', '150px'],
    margin: ['0', '0 100px', '0 100px'],
  })};
`

export default ({ src }) => (
  <ProjectIcon fadeIn sizes={!svgExtension.test(src.original.src) ? src.sizes : src.original} />
)
