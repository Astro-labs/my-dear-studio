import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'

import Astrocoders from '../components/Astrocoders'
import AstrocodersLink from '../components/AstrocodersLink'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'
import Menu from '../components/Menu'

import Explanation from '../components/Explanation'
import ExplanationDescription from '../components/ExplanationDescription'
import ExplanationToggleMore from '../components/ExplanationToggleMore'

import Projects from '../components/Projects'
import ProjectItem from '../components/ProjectItem'
import ProjectImage from '../components/ProjectImage'
import ProjectImageWrapper from '../components/ProjectImageWrapper'
import ProjectTitle from '../components/ProjectTitle'
import ProjectDescription from '../components/ProjectDescription'
import ProjectExplanation from '../components/ProjectExplanation'
import ProjectExplanationWrapper from '../components/ProjectExplanationWrapper'

import Footer from '../components/Footer'
import FooterWrapper from '../components/FooterWrapper'
import FooterTitle from '../components/FooterTitle'
import FooterSubTitle from '../components/FooterSubTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

export const query = graphql`
  query Home {
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
            featuredImage
            tags {
              tag
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
  isMoreExplanationOpened,
  setMoreExplanation,
  data: {
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
        <ExplanationDescription>{description}</ExplanationDescription>
        <ExplanationToggleMore onClick={() => setMoreExplanation()}>
          {isMoreExplanationOpened ? '−' : '+'} Read {isMoreExplanationOpened ? 'less' : 'more'} about
        </ExplanationToggleMore>
        {isMoreExplanationOpened && <ExplanationDescription dangerouslySetInnerHTML={{ __html: html }} />}
      </Container>
    </Explanation>
    <Projects id="project">
      <Container>
        {projects.map(({ frontmatter: { featuredImage, title, tags, slug } }, idx) => (
          <ProjectItem key={title}>
            {idx % 2 === 0 ? (
              <ProjectImageWrapper to={`/project/${slug}`}>
                <ProjectImage src={featuredImage} />
              </ProjectImageWrapper>
            ) : (
              <ProjectExplanationWrapper>
                <ProjectExplanation>
                  <ProjectTitle to={`/project/${slug}`}>{title}</ProjectTitle>
                  <ProjectDescription>{tags.map(item => item.tag).join(', ')}</ProjectDescription>
                </ProjectExplanation>
              </ProjectExplanationWrapper>
            )}

            {idx % 2 === 0 ? (
              <ProjectExplanationWrapper>
                <ProjectExplanation>
                  <ProjectTitle to={`/project/${slug}`}>{title}</ProjectTitle>
                  <ProjectDescription>{tags.map(item => item.tag).join(', ')}</ProjectDescription>
                </ProjectExplanation>
              </ProjectExplanationWrapper>
            ) : (
              <ProjectImageWrapper to={`/project/${slug}`}>
                <ProjectImage src={featuredImage} />
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
            <span>Made by our friends</span> <Astrocoders />
          </AstrocodersLink>
        </Grid>
      </Container>
    </Footer>
  </Layout>
)

Home.propTypes = {
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
)(Home)
