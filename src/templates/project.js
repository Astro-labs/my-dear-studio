import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withStateHandlers } from 'recompose'
import { flow, groupBy, values, shuffle, slice } from 'lodash/fp'

import Astrocoders from '../components/Astrocoders'
import AstrocodersLink from '../components/AstrocodersLink'

import BreakPoints from '../components/BreakPoints'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'
import Menu from '../components/Menu'

import ExplanationToggleMore from '../components/ExplanationToggleMore'

import ProjectExplanation from '../components/ProjectExplanation'
import ProjectIcon from '../components/ProjectIcon'
import ProjectImages from '../components/ProjectImages'
import ProjectImagesWrapper from '../components/ProjectImagesWrapper'

import ProjectImage from '../components/ProjectModalImage'

import ProjectNext from '../components/ProjectNext'
import ProjectNextLink from '../components/ProjectNextLink'
import ProjectsNext from '../components/ProjectsNext'
import ProjectsNextWrapper from '../components/ProjectsNextWrapper'
import ProjectsNextTitle from '../components/ProjectsNextTitle'

import Footer from '../components/Footer'
import FooterWrapper from '../components/FooterWrapper'
import FooterColumn from '../components/FooterColumn'
import FooterTitle from '../components/FooterTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

const svgExtension = /\.svg$/g

const Body = styled(Grid)`
  margin: 0 6rem;
  p {
    img {
      display: block;
      max-width: 100%;
      object-fit: contain;
    }

    column-gap: 65px;

    column-fill: balance;

    ${BreakPoints({
      columnCount: ['1', '2', '2'],
    })};
    width: 100%;
    line-height: 150%;

    flex-direction: column;

    &:last-of-type {
      display: flex;
      img {
        margin: 0 auto;
        width: auto;
      }
    }
  }
`

const ProjectDescription = styled.h2`
  font-family: 'Open Sans';
  font-size: 1.3rem;
  font-weight: normal;
  line-height: 150%;
`

const ProjectDescriptionWrapper = styled.div`
  font-family: 'Open Sans';
  display: flex;
  justify-content: flex-start;
  align-items: center;
  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
  })};
  margin-bottom: 80px;
`

export const query = graphql`
  query Project($slug: String!) {
    astrocodersLogo: imageSharp(id: { regex: "/astro-logo/" }) {
      sizes(maxWidth: 100) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
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
          image {
            original {
              src
            }
            sizes(maxWidth: 1200) {
              ...GatsbyImageSharpSizes_withWebp_noBase64
            }
          }
          row
        }
        featuredImage {
          original {
            src
          }
          sizes(maxWidth: 600) {
            ...GatsbyImageSharpSizes_withWebp_noBase64
          }
        }
        featuredOnProjectImage {
          original {
            src
          }
          sizes(maxWidth: 600) {
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
    <Menu />
    <ProjectExplanation>
      <Container>
        <ProjectDescriptionWrapper justifyContent="space-around">
          <ProjectIcon src={featuredOnProjectImage} />
          <Grid direction="column" alignItems="flex-start">
            <ProjectDescription>{explanation}</ProjectDescription>
            <ExplanationToggleMore onClick={() => setMoreExplanation()}>
              {isMoreExplanationOpened ? '−' : '+'} Read {isMoreExplanationOpened ? 'less' : 'more'} about this project
            </ExplanationToggleMore>
          </Grid>
        </ProjectDescriptionWrapper>
      </Container>
    </ProjectExplanation>

    {isMoreExplanationOpened && (
      <Body direction="column" alignItems="flex-start" dangerouslySetInnerHTML={{ __html: html }} />
    )}

    <ProjectImages>
      {flow(
        groupBy('row'),
        values,
      )(images).map((imgs, idx) => (
        <ProjectImagesWrapper key={idx}>
          {imgs.map(({ image }) => (
            <div style={{ width: `${(1 / imgs.length) * 100}%` }} key={`${idx}-${image}`}>
              <ProjectImage
                small={!svgExtension.test(image.original.src) ? image.sizes.src : image.original.src}
                large={!svgExtension.test(image.original.src) ? image.sizes.src : image.original.src}
              />
            </div>
          ))}
        </ProjectImagesWrapper>
      ))}
    </ProjectImages>

    <ProjectsNext>
      <ProjectsNextTitle>More Projects</ProjectsNextTitle>
      <ProjectsNextWrapper>
        {flow(
          shuffle,
          slice(0, 3),
        )(projects.edges).map(({ node: { frontmatter: { slug }, fields: { featuredOnProjectImage } } }) => {
          return featuredOnProjectImage ? (
            <ProjectNextLink to={`/project/${slug}`}>
              <ProjectNext src={featuredOnProjectImage} key={featuredOnProjectImage.id} />
            </ProjectNextLink>
          ) : null
        })}
      </ProjectsNextWrapper>
    </ProjectsNext>

    <Footer id="contact">
      <Container>
        <FooterWrapper>
          <FooterColumn>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterTitle>Social</FooterTitle>
              <FooterLink to={contact.frontmatter.instagram}>Instagram</FooterLink>
              <FooterLink to={contact.frontmatter.facebook}>Facebook</FooterLink>
              <FooterLink to={contact.frontmatter.linkedin}>LinkedIn</FooterLink>
            </Grid>
          </FooterColumn>
          <FooterColumn>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterTitle>Contato</FooterTitle>
              <FooterLink to={`mailto:${contact.frontmatter.contactEmail}`}>
                {contact.frontmatter.contactEmail}
              </FooterLink>
              {contact.frontmatter.phones.map(phone => <FooterText key={phone}>{phone}</FooterText>)}
            </Grid>
          </FooterColumn>
          <FooterColumn>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterTitle>Assine nossa Newsletter</FooterTitle>
              <FooterLink to={contact.frontmatter.newsletterLink}>Clique aqui e assine nossa newsletter</FooterLink>
            </Grid>
          </FooterColumn>
        </FooterWrapper>
        <Grid direction="column" style={{ marginTop: 60 }}>
          <Logo color="#B93026" width="150px" />
          <br />
          <AstrocodersLink>
            <span>Made by our friends</span> <Astrocoders logo={astrocodersLogo} />
          </AstrocodersLink>
        </Grid>
      </Container>
    </Footer>
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
