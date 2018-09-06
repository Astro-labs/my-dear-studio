import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { flow, shuffle, slice } from 'lodash/fp'

import BreakPoints from './BreakPoints'

const NextProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: 2rem;
  margin-right: 2rem;

  ${BreakPoints({
    alignItems: ['center', 'flex-start', 'flex-start'],
  })};
`

const NextProjectsContainer = styled.div`
  display: flex;
  justify-content: ${props => (props.projectsTotal > 3 ? 'space-around' : 'flex-start')};

  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
  })};
`

const NextProjectTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  padding-left: 5px;
`

const ProjectNextLink = styled(Link)`
  width: 100%;

  ${BreakPoints({
    paddingRight: ['0', '20px', '20px'],
    paddingTop: ['20px', '0', '0'],
  })};
`

const NextProjectImage = styled.img`
  ${BreakPoints({
    width: ['200px', '150px', '280px'],
  })};
`

const NextProjects = ({ projects }) => (
  <NextProjectsWrapper>
    <NextProjectTitle>More Projects</NextProjectTitle>
    <NextProjectsContainer>
      {flow(
        shuffle,
        slice(0, 3),
      )(projects.edges).map(({ node: { frontmatter: { slug }, fields: { featuredOnProjectImage } } }) => {
        return featuredOnProjectImage ? (
          <ProjectNextLink to={`/project/${slug}`}>
            <NextProjectImage src={featuredOnProjectImage.original.src} key={featuredOnProjectImage.id} />
          </ProjectNextLink>
        ) : null
      })}
    </NextProjectsContainer>
  </NextProjectsWrapper>
)

NextProjects.propTypes = {
  projects: PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          frontmatter: PropTypes.shape({
            slug: PropTypes.string.isRequired,
          }),
        }),
        fields: PropTypes.shape({
          featuredOnProjectImage: PropTypes.shape({
            id: PropTypes.string.isRequired,
            original: PropTypes.shape({
              src: PropTypes.string.isRequired,
            }),
          }),
        }),
      }),
    ),
  }),
}

export default NextProjects
