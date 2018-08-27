import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Link from 'gatsby-link'
import { flow, groupBy, map, values } from 'lodash/fp'

import BreakPoints from './BreakPoints'

const FeaturedProjectsWrapper = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`

const FeaturedProjectRow = styled.div`
  display: flex;
  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
  })};
`

const FeaturedProjectColumn = styled.div`
  flex: 1;
`

const ProjectItem = styled.div`
  display: flex;
  ${BreakPoints({
    padding: ['4px 0', '4px', '4px'],
  })};
`

const ProjectImageWrapper = styled(Link)`
  width: 100%;
  line-height: 0;
  padding: 0;
`

const ProjectImageWithHoverWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -200%;
    width: 150%;
    height: 100%;
    transform: skew(-20deg, 0);
    transition-property: left;
    transition-duration: 0.5s;
    background-color: rgba(157, 28, 28, 1);
  }

  *:not(img) {
    opacity: 0;
    transition: opacity 0.2s ease-out;
    transition-delay: 0.5s * 0.6;
  }

  &:hover {
    *:not(img) {
      opacity: 1;
    }

    &:before {
      left: -20%;
    }
  }
`

const ProjectImage = styled.img`
  width: 100%;
`

const ProjectHoverDescription = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 20px 60px;
  color: #fff;
  word-break: break-word;
  font-size: 1.2rem;
  font-weight: 100;
  line-height: 2rem;
  text-overflow: ellipsis;
`

const formatProjects = ({ selectedProjects, projects }) =>
  flow(
    groupBy('row'),
    map(row =>
      flow(
        groupBy('column'),
        values,
      )(row),
    ),
  )(
    selectedProjects.map(proj => ({
      ...proj,
      ...projects.find(({ frontmatter: { title } }) => title.includes(proj.project)),
    })),
  )

const FeaturedProjects = ({ projects = [], selectedProjects = [] }) => (
  <FeaturedProjectsWrapper id="projects">
    {formatProjects({ projects, selectedProjects }).map(columns => (
      <FeaturedProjectRow>
        {columns.map(columnItems => (
          <FeaturedProjectColumn>
            {columnItems.map(({ frontmatter: { title, tags, slug }, fields: { featuredImage } }) => (
              <ProjectItem key={title}>
                <ProjectImageWrapper to={`/project/${slug}`}>
                  <ProjectImageWithHoverWrapper>
                    <ProjectImage src={featuredImage.original.src} />
                    <ProjectHoverDescription>
                      {title}
                      <br />
                      {tags.map(item => item.tag).join(', ')}
                    </ProjectHoverDescription>
                  </ProjectImageWithHoverWrapper>
                </ProjectImageWrapper>
              </ProjectItem>
            ))}
          </FeaturedProjectColumn>
        ))}
      </FeaturedProjectRow>
    ))}
  </FeaturedProjectsWrapper>
)

FeaturedProjects.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
      }),
      fields: PropTypes.shape({
        featuredImage: PropTypes.shape({
          original: PropTypes.shape({
            src: PropTypes.string.isRequired,
          }),
        }),
      }),
    }),
  ),
  selectedProjects: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.string.isRequired,
      column: PropTypes.string.isRequired,
      project: PropTypes.string.isRequired,
    }),
  ),
}

export default FeaturedProjects
