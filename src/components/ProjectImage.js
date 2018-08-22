import React from 'react'
import styled from 'styled-components'

const ProjectImage = styled.img`
  height: 100%;
  width: 100%;
`

export default ({ src }) => {
  const test = src.original.src.includes('svg') || src.original.src.includes('gif')

  return <ProjectImage srcSet={test ? src.original.src : src.sizes.srcSet} />
}
