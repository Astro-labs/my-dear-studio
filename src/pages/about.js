import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { find, map, flow } from 'lodash/fp'

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
    page: markdownRemark(frontmatter: { templateKey: { eq: "about" } }) {
      frontmatter {
        languages {
          language
          seoTitle
          seoDescription
          seoImage
          description
        }
      }
      fields {
        team {
          frontmatter {
            title
            languages {
              language
              position
              specialty
              city
              curriculum
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

const About = ({
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
      fields: { team: teamMembers },
    },
  },
}) => {
  const { seoTitle, seoDescription, seoImage, description } = find(({ language: planguage }) => planguage === language)(
    pageLngs,
  )

  const team = flow(
    map(({ frontmatter: { title, languages: tlanguages } }) => ({
      title,
      ...find(({ language: tlanguage }) => tlanguage === language)(tlanguages),
    })),
  )(teamMembers)

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
      <AboutExplanation html={description} />
      <Team team={team} />
      <Footer
        astrocodersLogo={astrocodersLogo}
        contact={find(({ language: clanguage }) => clanguage === language)(contactLngs)}
      />
    </Layout>
  )
}

About.propTypes = {
  pathContext: PropTypes.shape({
    languages: PropTypes.arrayOf(PropTypes.string.isRequired),
    defaultLanguage: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
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

export default About
