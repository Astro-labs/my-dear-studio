import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import styled from 'styled-components'

import Astrocoders from '../components/Astrocoders'
import AstrocodersLink from '../components/AstrocodersLink'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Link from '../components/Link'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'
import Menu from '../components/Menu'

import About from '../components/About'
import Explanation from '../components/Explanation'
import ExplanationDescription from '../components/ExplanationDescription'

import Projects from '../components/Projects'
import ProjectItem from '../components/ProjectItem'
import ProjectImage from '../components/ProjectImage'
import ProjectImageWrapper from '../components/ProjectImageWrapper'
import ProjectTitle from '../components/ProjectTitle'
import ProjectDescription from '../components/ProjectDescription'
import ProjectExplanation from '../components/ProjectExplanation'
import ProjectExplanationWrapper from '../components/ProjectExplanationWrapper'
import ProjectImageWithHoverWrapper from '../components/ProjectImageWithHoverWrapper'
import ProjectHoverDescription from '../components/ProjectHoverDescription'

import Footer from '../components/Footer'
import FooterWrapper from '../components/FooterWrapper'
import FooterTitle from '../components/FooterTitle'
import FooterSubTitle from '../components/FooterSubTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

export const query = graphql`
  query Home {
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
    page: markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
      html
      frontmatter {
        description
        seoTitle
        seoDescription
        seoImage
      }
      fields {
        projects {
          frontmatter {
            title
            slug
            tags {
              tag
            }
          }
          fields {
            featuredImage {
              sizes(maxWidth: 600) {
                ...GatsbyImageSharpSizes_withWebp_noBase64
              }
              original {
                src
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

const Home = ({
  data: {
    astrocodersLogo,
    contact,
    metadata,
    page: {
      html,
      fields: { projects },
      frontmatter: { description, seoTitle, seoDescription, seoImage },
    },
  },
}) => (
  <Layout>
    <SEO {...{ seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
    <Menu />
    <Explanation>
      <Container>
        <About>{description}</About>
        <Link to="/about">+ Read more about</Link>
      </Container>
    </Explanation>
    <Projects id="project">
      <Container>
        {projects.map(({ frontmatter: { title, tags, slug }, fields: { featuredImage } }, idx) => (
          <ProjectItem key={title}>
            {idx % 2 === 0 ? (
              <ProjectImageWrapper to={`/project/${slug}`}>
                <ProjectImageWithHoverWrapper>
                  <ProjectImage src={featuredImage} />
                  <ProjectHoverDescription>{title}</ProjectHoverDescription>
                </ProjectImageWithHoverWrapper>
              </ProjectImageWrapper>
            ) : (
              <ProjectExplanationWrapper style={{ paddingLeft: '10px' }}>
                <ProjectExplanation>
                  <ProjectTitle to={`/project/${slug}`}>{title}</ProjectTitle>
                  <ProjectDescription>{tags.map(item => item.tag).join(', ')}</ProjectDescription>
                </ProjectExplanation>
              </ProjectExplanationWrapper>
            )}

            {idx % 2 === 0 ? (
              <ProjectExplanationWrapper style={{ paddingRight: '10px' }}>
                <ProjectExplanation>
                  <ProjectTitle to={`/project/${slug}`}>{title}</ProjectTitle>
                  <ProjectDescription>{tags.map(item => item.tag).join(', ')}</ProjectDescription>
                </ProjectExplanation>
              </ProjectExplanationWrapper>
            ) : (
              <ProjectImageWrapper to={`/project/${slug}`}>
                <ProjectImageWithHoverWrapper>
                  <ProjectImage src={featuredImage} />
                  <ProjectHoverDescription>{title}</ProjectHoverDescription>
                </ProjectImageWithHoverWrapper>
              </ProjectImageWrapper>
            )}
          </ProjectItem>
        ))}
      </Container>
    </Projects>
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

Home.propTypes = {
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

export default Home
