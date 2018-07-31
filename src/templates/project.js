import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { flow, groupBy, values, shuffle, slice } from 'lodash/fp'

import Astrocoders from '../components/Astrocoders'
import AstrocodersLink from '../components/AstrocodersLink'

import BreakPoints from '../components/BreakPoints'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeaderLink from '../components/HeaderLink'
import Header from '../components/Header'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'

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

import styled from '../../node_modules/styled-components';

const Body = styled(Grid)`
  p {
    ${BreakPoints({
      columnCount: ['1', '2', '2'],
    })};
  }
`

export const query = graphql`
  query Project($slug: String!) {
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
        images {
          image
          row
        }
        featuredImage
        featuredOnProjectImage
        tags {
          tag
        }
      }
    }

    projects: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "project" }, slug: { ne: $slug } } }) {
      edges {
        node {
          frontmatter {
            featuredOnProjectImage
            slug
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
  isColorChanged,
  isMoreExplanationOpened,
  setMoreExplanation,
  data: {
    contact,
    projects,
    metadata,
    page: {
      html,
      frontmatter: { images = [], featuredOnProjectImage, explanation, seoTitle, seoDescription, seoImage },
    },
  },
}) => (
  <Layout>
    <SEO {...{ seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
    <Header style={{ backgroundColor: isColorChanged ? '#9d1c1c' : '#fff' }}>
      <Container>
        <Grid justifyContent="space-between">
          <Logo color={isColorChanged ? '#E2BA39' : '#9d1c1c'} />
          <Grid>
            <HeaderLink color={isColorChanged ? '#E2BA39' : '#9d1c1c'} to="/#project">
              Project
            </HeaderLink>
            <HeaderLink color={isColorChanged ? '#E2BA39' : '#9d1c1c'} to="/about">
              About
            </HeaderLink>
            <HeaderLink color={isColorChanged ? '#E2BA39' : '#9d1c1c'} to="/#contact">
              Contact
            </HeaderLink>
          </Grid>
        </Grid>
      </Container>
    </Header>
    <Explanation>
      <Container>
        <Grid justifyContent="space-around">
          <ProjectIcon src={featuredOnProjectImage} />
          <Grid direction="column" alignItems="flex-start">
            <ExplanationDescription>
              {explanation}
            </ExplanationDescription>
            <ExplanationToggleMore onClick={() => setMoreExplanation()}>
              {isMoreExplanationOpened ? '−' : '+'} Read {isMoreExplanationOpened ? 'less' : 'more'} about
            </ExplanationToggleMore>
          </Grid>
        </Grid>
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
                <ProjectImage small={image} large={image} />
              </div>
            ))}
          </ProjectImagesWrapper>
        ))}
      </Container>
    </ProjectImages>

    <ProjectsNext>
      <Container>
        <ProjectsNextTitle>More Projects</ProjectsNextTitle>
        <ProjectsNextWrapper>
          {flow(
            shuffle,
            slice(0, 3),
          )(projects.edges).map(({ node: { frontmatter: { featuredOnProjectImage, slug } } }) => (
            <ProjectNextLink to={`/project/${slug}`}>
              <ProjectNext src={featuredOnProjectImage} key={featuredOnProjectImage} />
            </ProjectNextLink>
          ))}
        </ProjectsNextWrapper>
      </Container>
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
            <span>Made by our friends</span> <Astrocoders />
          </AstrocodersLink>
        </Grid>
      </Container>
    </Footer>
  </Layout>
)

Project.propTypes = {
  isColorChanged: PropTypes.bool.isRequired,
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
    { isMoreExplanationOpened: false, isColorChanged: false },
    {
      setMoreExplanation: ({ isMoreExplanationOpened }) => () => ({
        isMoreExplanationOpened: !isMoreExplanationOpened,
      }),
      changeColor: () => ({ target: { documentElement } }) => ({
        isColorChanged: documentElement.scrollTop > documentElement.offsetHeight / 8,
      }),
    },
  ),
  lifecycle({
    componentDidMount() {
      window.addEventListener('scroll', this.props.changeColor, true)
    },
    componentWillUnmount() {
      window.removeEventListener('scroll', this.props.changeColor)
    },
  }),
)(Project)
