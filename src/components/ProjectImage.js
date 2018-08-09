import React from 'react'
import styled from 'styled-components'

const ProjectImage = styled.img`
  height: 100%;
  width: 100%;
`

const passThruExtensions = /\.svg$|\.gif$/g

export default ({ src }) => (
  <ProjectImage srcSet={!passThruExtensions.test(src.original.src) ? src.sizes.srcSet : src.original.src} />
)
