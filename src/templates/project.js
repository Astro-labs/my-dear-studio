import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import { flow, groupBy, values, shuffle, slice } from 'lodash/fp'
import { FormattedMessage } from 'react-intl'
import { withIntl } from '../i18n'

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

import styled from 'styled-components'

const Body = styled(Grid)`
  p {
    ${BreakPoints({
      columnCount: ['1', '2', '2'],
    })};
    width: 100%;
    line-height: 150%;

    img[alt="col-3"] {
      ${BreakPoints({
        width: ['100%', '49%', '49%'],
      })};
    }

    img[alt="col-12"] {
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
    <Menu />
    <Explanation>
      <Container>
        <Grid justifyContent="space-around">
          <ProjectIcon src={featuredOnProjectImage} />
          <Grid direction="column" alignItems="flex-start">
            <ProjectDescription>
              {explanation}
            </ProjectDescription>
            <ExplanationToggleMore onClick={() => setMoreExplanation()}>
              {isMoreExplanationOpened ? '−' : '+'} {isMoreExplanationOpened ? <FormattedMessage id="reduce" /> : <FormattedMessage id="expand" />} 
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
        <ProjectsNextTitle><FormattedMessage id="moreProjects" /></ProjectsNextTitle>
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
        <FooterWrapper>
          <Grid justifyContent="center" style={{ width: '33%', paddingBottom: 20 }}>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterTitle>Social</FooterTitle>
              <FooterLink to={contact.frontmatter.instagram}>Instagram</FooterLink>
              <FooterLink to={contact.frontmatter.facebook}>Facebook</FooterLink>
              <FooterLink to={contact.frontmatter.linkedin}>LinkedIn</FooterLink>
            </Grid>
          </Grid>
          <Grid justifyContent="center" style={{ width: '33%', paddingBottom: 20 }}>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
              <FooterTitle><FormattedMessage id="contact" /></FooterTitle>
              <FooterLink to={`mailto:${contact.frontmatter.contactEmail}`}>
                {contact.frontmatter.contactEmail}
              </FooterLink>
              {contact.frontmatter.phones.map(phone => <FooterText key={phone}>{phone}</FooterText>)}
            </Grid>
          </Grid>
          <Grid justifyContent="center" style={{ width: '33%', paddingBottom: 20 }}>
            <Grid justifyContent="flex-start" alignItems="flex-start" direction="column">
            <FooterTitle><FormattedMessage id="newsletter" /></FooterTitle>
            <FooterLink to={contact.frontmatter.newsletterLink}><FormattedMessage id="subscribe" /></FooterLink>
            </Grid>
          </Grid>
        </FooterWrapper>
        <Grid direction="column" style={{ marginTop: 60 }}>
          <Logo color="#B93026" width="150px" />
          <br />
          <AstrocodersLink>
            <span><FormattedMessage id="madeBy" /></span> <Astrocoders />
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
  withIntl,
  withStateHandlers(
    { isMoreExplanationOpened: false },
    {
      setMoreExplanation: ({ isMoreExplanationOpened }) => () => ({
        isMoreExplanationOpened: !isMoreExplanationOpened,
      }),
    },
  ),
)(Project)
