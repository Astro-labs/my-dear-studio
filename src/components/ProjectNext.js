import React from 'react'
import Img from 'gatsby-image'

export default ({ src }) => <img srcSet={src.sizes.srcSet} style={{ height: '100%', width: '100%' }} />
