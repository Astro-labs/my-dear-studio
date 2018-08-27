import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import { flow, groupBy, values } from 'lodash/fp'
import ModalImage from '@astrocoders/react-modal-image'
import ReactPlayer from 'react-player'

import BreakPoints from '../components/BreakPoints'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Container from '../components/Container'
import Header from '../components/Header'

import NextProjects from '../components/NextProjects'

import Footer from '../components/Footer'

const ProjectExplanation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${BreakPoints({
    padding: ['0 50px', '60px 80px 0 80px', '150px 100px 0 100px'],
    flexDirection: ['column', 'row', 'row'],
  })};
  margin: 58px 0 80px 0;
`

const ProjectExplanationColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const ProjectIcon = styled.img`
  ${BreakPoints({
    width: ['150px', '160px', '150px'],
    margin: ['0', '0 100px', '0 100px'],
  })};
`

const ProjectDescription = styled.h2`
  font-size: 1.3rem;
  font-weight: normal;
  line-height: 150%;
`

const ProjectExplanationToggleMore = styled.p`
  color: #7e7e7e;
  font-weight: 700;
  cursor: pointer;
`

const ProjectBody = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 8rem;
  p {
    column-gap: 65px;
    flex-direction: column;
    column-fill: balance;
    ${BreakPoints({
      columnCount: ['1', '2', '2'],
    })};
    width: 100%;
    line-height: 150%;

    &:last-of-type {
      display: flex;
      img {
        margin: 0 auto;
        width: auto;
      }
    }

    img {
      display: block;
      max-width: 100%;
      object-fit: contain;
    }
  }
`

const ProjectImages = styled.div`
  margin-left: 2rem;
  margin-right: 2rem;
`

const ProjectImagesWrapper = styled.div`
  display: flex;
  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
  })};

  div {
    width: 100%;
    line-height: 0;
    margin: 4px;
  }
`

const ProjectModalImage = styled(ModalImage)`
  width: 100%;
`

const ProjectReactPlayer = styled(ReactPlayer)`
  width: 100% !important;
  div {
    line-height: 0;
    margin: 0;
  }
`

export const query = graphql`
  query Project($slug: String!) {
    astrocodersLogo: imageSharp(id: { regex: "/astro-logo/" }) {
      sizes(maxWidth: 100) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
      original {
        src
      }
    }
    contact: markdownRemark(frontmatter: { templateKey: { eq: "contact" } }) {
      frontmatter {
        phones
        contactEmail
        workEmail
        newsletterLink
        instagram
        facebook
        linkedin
      }
    }
    page: markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        explanation
        seoTitle
        seoDescription
        seoImage
        tags {
          tag
        }
      }
      fields {
        images {
          videoLink
          image {
            original {
              src
            }
            sizes(maxWidth: 2600) {
              ...GatsbyImageSharpSizes_withWebp_noBase64
            }
          }
          row
        }
        featuredImage {
          original {
            src
          }
          sizes(maxWidth: 2600) {
            ...GatsbyImageSharpSizes_withWebp_noBase64
          }
        }
        featuredOnProjectImage {
          id
          original {
            src
          }
          sizes(maxWidth: 2600) {
            ...GatsbyImageSharpSizes_withWebp_noBase64
          }
        }
      }
    }
    projects: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "project" }, slug: { ne: $slug } } }) {
      edges {
        node {
          frontmatter {
            slug
          }
          fields {
            featuredOnProjectImage {
              original {
                src
              }
              sizes(maxWidth: 600) {
                ...GatsbyImageSharpSizes
              }
            }
          }
        }
      }
    }
    metadata: markdownRemark(frontmatter: { templateKey: { eq: "metadata" } }) {
      frontmatter {
        fbAppId
        twitterUser
      }
    }
  }
`

const Project = ({
  isMoreExplanationOpened,
  setMoreExplanation,
  data: {
    astrocodersLogo,
    contact,
    projects,
    metadata,
    page: {
      html,
      frontmatter: { explanation, seoTitle, seoDescription, seoImage },
      fields: { images = [], featuredOnProjectImage = [] },
    },
  },
}) => (
  <Layout>
    <SEO {...{ seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
    <Header />
    <Container>
      <ProjectExplanation>
        <ProjectIcon src={featuredOnProjectImage.original.src} />
        <ProjectExplanationColumn>
          <ProjectDescription>{explanation}</ProjectDescription>
          <ProjectExplanationToggleMore onClick={() => setMoreExplanation()}>
            {isMoreExplanationOpened ? '−' : '+'} Read {isMoreExplanationOpened ? 'less' : 'more'} about this project
          </ProjectExplanationToggleMore>
        </ProjectExplanationColumn>
      </ProjectExplanation>
    </Container>

    {isMoreExplanationOpened && <ProjectBody dangerouslySetInnerHTML={{ __html: html }} />}

    <ProjectImages>
      {flow(
        groupBy('row'),
        values,
      )(images).map((imgs, idx) => (
        <ProjectImagesWrapper key={idx}>
          {imgs.map(
            ({ image, videoLink }) =>
              videoLink ? (
                <ProjectReactPlayer url={videoLink} playing loop width="1200px" />
              ) : (
                <ProjectModalImage key={image.original.src} small={image.original.src} large={image.original.src} />
              ),
          )}
        </ProjectImagesWrapper>
      ))}
    </ProjectImages>

    <NextProjects projects={projects} />

    <Footer contact={contact} astrocodersLogo={astrocodersLogo} />
  </Layout>
)

Project.propTypes = {
  isMoreExplanationOpened: PropTypes.bool.isRequired,
  setMoreExplanation: PropTypes.func.isRequired,
  data: PropTypes.shape({
    siteMetadata: PropTypes.shape({
      site: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        fbAppId: PropTypes.string.isRequired,
        twitterUser: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default compose(
  withStateHandlers(
    { isMoreExplanationOpened: false },
    {
      setMoreExplanation: ({ isMoreExplanationOpened }) => () => ({
        isMoreExplanationOpened: !isMoreExplanationOpened,
      }),
    },
  ),
)(Project)
