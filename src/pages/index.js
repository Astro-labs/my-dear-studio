import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import BreakPoints from '../components/BreakPoints'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Link from '../components/Link'
import Header from '../components/Header'
import Container from '../components/Container'
import FeaturedProjects from '../components/FeaturedProjects'
import Footer from '../components/Footer'

const About = styled.div`
  ${BreakPoints({
    padding: ['0 50px', '60px 80px', '100px'],
    marginTop: '58px',
  })};
`

const AboutText = styled.p`
  padding: 15px 0;
  color: #7e7e7e;
  font-size: 1.3rem;
  margin: 0 0 35px 0;
`

export const query = graphql`
  query Home {
    astrocodersLogo: imageSharp(id: { regex: "/astro-logo/" }) {
      sizes(maxWidth: 100) {
        ...GatsbyImageSharpSizes_withWebp_noBase64
      }
      original {
        src
      }
    }
    header: markdownRemark(frontmatter: { templateKey: { eq: "header" } }) {
      frontmatter {
        projects
        about
        contact
      }
    }
    contact: markdownRemark(frontmatter: { templateKey: { eq: "contact" } }) {
      frontmatter {
        phones
        contactEmail
        workEmail
        newsletterLink
        newsletterText
        instagram
        facebook
        linkedin
        astrocoders
      }
    }
    page: markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
      html
      frontmatter {
        description
        seoTitle
        seoDescription
        seoImage
        projects {
          project
          row
          column
        }
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
              sizes(maxWidth: 2600) {
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
    header,
    contact,
    metadata,
    page: {
      fields: { projects },
      frontmatter: { description, seoTitle, seoDescription, seoImage, projects: selectedProjects },
    },
  },
}) => (
  <Layout>
    <SEO {...{ seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
    <Header header={header} />
    <About>
      <Container>
        <AboutText>{description}</AboutText>
      </Container>
    </About>
    <FeaturedProjects projects={projects} selectedProjects={selectedProjects} />
    <Footer astrocodersLogo={astrocodersLogo} contact={contact} />
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
