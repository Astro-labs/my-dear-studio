import React from 'react'
import styled from 'styled-components'
import BreakPoints from './BreakPoints'

const ProjectImage = styled.img`
  height: 100%;
  width: 100%;
`

const svgExtension = /\.svg$/g

export default ({ src }) => (
  <ProjectImage srcSet={!svgExtension.test(src.original.src) ? src.sizes.srcSet : src.original.src} />
)
