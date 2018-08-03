import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose, withStateHandlers, lifecycle } from 'recompose'
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

import Explanation from '../components/Explanation'
import ExplanationDescription from '../components/ExplanationDescription'
import ExplanationToggleMore from '../components/ExplanationToggleMore'

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
import FooterTitle from '../components/FooterTitle'
import FooterSubTitle from '../components/FooterSubTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

const svgExtension = /\.svg$/g

const Body = styled(Grid)`
  p {
    ${BreakPoints({
      columnCount: ['1', '2', '2'],
    })};
    width: 100%;
    line-height: 150%;

    img[alt='col-3'] {
      ${BreakPoints({
        width: ['100%', '49%', '49%'],
      })};
    }

    img[alt='col-12'] {
      width: 100%;
    }

    &:last-of-type {
      column-count: 1;
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
  font-size: 1.7rem;
  font-weight: 300;
  line-height: 150%;
`

const ProjectDescriptionWrapper = styled.div`
  font-family: 'Open Sans';
  display: flex;
  justify-content: space-around;
  align-items: center;

  ${BreakPoints({
    flexDirection: ['column', 'row', 'row'],
  })};
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
            sizes(maxWidth: 1900) {
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
    <Explanation>
      <Container>
        <ProjectDescriptionWrapper justifyContent="space-around">
          <ProjectIcon src={featuredOnProjectImage} />
          <Grid direction="column" alignItems="flex-start">
            <ProjectDescription>{explanation}</ProjectDescription>
            <ExplanationToggleMore onClick={() => setMoreExplanation()}>
              {isMoreExplanationOpened ? '−' : '+'} Read {isMoreExplanationOpened ? 'less' : 'more'} about
            </ExplanationToggleMore>
          </Grid>
        </ProjectDescriptionWrapper>
        {isMoreExplanationOpened && (
          <Body direction="column" alignItems="flex-start" dangerouslySetInnerHTML={{ __html: html }} />
        )}
      </Container>
    </Explanation>

    <ProjectImages>
      <Container>
        <hr />
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
      </Container>
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
        <FooterTitle>Contact</FooterTitle>
        <FooterWrapper>
          <Grid justifyContent="center" style={{ width: '33%', paddingBottom: 20 }}>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterLink to={`mailto:${contact.frontmatter.contactEmail}`}>
                {contact.frontmatter.contactEmail}
              </FooterLink>
              {contact.frontmatter.phones.map(phone => <FooterText key={phone}>{phone}</FooterText>)}
            </Grid>
          </Grid>
          <Grid justifyContent="center" style={{ width: '33%', paddingBottom: 20 }}>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterSubTitle>Connect</FooterSubTitle>
              <FooterLink to={contact.frontmatter.instagram}>Instagram</FooterLink>
              <FooterLink to={contact.frontmatter.facebook}>Facebook</FooterLink>
              <FooterLink to={contact.frontmatter.linkedin}>LinkedIn</FooterLink>
            </Grid>
          </Grid>
          <Grid justifyContent="center" style={{ width: '33%', paddingBottom: 20 }}>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterSubTitle>Jobs applications and internships:</FooterSubTitle>
              <FooterLink to={contact.frontmatter.workEmail}>{contact.frontmatter.workEmail}</FooterLink>
            </Grid>
          </Grid>
        </FooterWrapper>
        <FooterTitle>Newsletter</FooterTitle>
        <Grid>
          <FooterLink to={contact.frontmatter.newsletterLink}>Subscribe to our mailing</FooterLink>
        </Grid>
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
