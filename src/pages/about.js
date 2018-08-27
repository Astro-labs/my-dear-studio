import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import BreakPoints from '../components/BreakPoints'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Header from '../components/Header'
import Explanation from '../components/Explanation'
import Team from '../components/Team'
import Footer from '../components/Footer'

const AboutExplanation = styled(Explanation)`
  padding-bottom: 0;
`

export const query = graphql`
  query About {
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
    page: markdownRemark(frontmatter: { templateKey: { eq: "about" } }) {
      html
      frontmatter {
        seoTitle
        seoDescription
        seoImage
      }
      fields {
        team {
          html
          frontmatter {
            title
            position
            specialty
            city
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

const About = ({
  data: {
    astrocodersLogo,
    contact,
    metadata,
    page: { html, frontmatter: { seoTitle, seoDescription, seoImage }, fields: { team } } = {},
  },
}) => (
  <Layout>
    <SEO {...{ seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
    <Header />
    <AboutExplanation html={html} />
    <Team team={team} />

    <Footer contact={contact} astrocodersLogo={astrocodersLogo} />
  </Layout>
)

About.propTypes = {
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

export default About
