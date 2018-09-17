import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { find } from 'lodash/fp'

import BreakPoints from '../components/BreakPoints'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
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
        languages {
          language
          projs
          about
          contact
        }
      }
    }
    contact: markdownRemark(frontmatter: { templateKey: { eq: "contact" } }) {
      frontmatter {
        languages {
          language
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
    }
    page: markdownRemark(frontmatter: { templateKey: { eq: "home" } }) {
      html
      frontmatter {
        languages {
          language
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
      }
      fields {
        projects {
          frontmatter {
            title
            slug
            tags {
              tag
            }
            languages {
              language
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
  location,
  pathContext: { languages, language, defaultLanguage },
  data: {
    astrocodersLogo,
    metadata,
    header: {
      frontmatter: { languages: headerLngs },
    },
    contact: {
      frontmatter: { languages: contactLngs },
    },
    page: {
      frontmatter: { languages: pageLngs },
      fields: { projects },
    },
  },
}) => {
  const { seoTitle, seoDescription, seoImage, description, projects: selectedProjects } = find(
    ({ language: planguage }) => planguage === language,
  )(pageLngs)
  return (
    <Layout>
      <SEO {...{ languages, defaultLanguage, seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
      <Header
        {...{
          location,
          languages,
          language,
          header: find(({ language: hlanguage }) => hlanguage === language)(headerLngs),
        }}
      />
      <About>
        <Container>
          <AboutText>{description}</AboutText>
        </Container>
      </About>
      <FeaturedProjects projects={projects} selectedProjects={selectedProjects} />
      <Footer
        astrocodersLogo={astrocodersLogo}
        contact={find(({ language: clanguage }) => clanguage === language)(contactLngs)}
      />
    </Layout>
  )
}

Home.propTypes = {
  pathContext: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.string.isRequired),
    defaultLanguage: PropTypes.string.isRequired,
  }),
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
