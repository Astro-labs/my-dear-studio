import React from 'react'
import PropTypes from 'prop-types'
import { flow, groupBy, map, values } from 'lodash/fp'

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

import Projects from '../components/Projects'
import ProjectItem from '../components/ProjectItem'
import ProjectImage from '../components/ProjectImage'
import ProjectImageWrapper from '../components/ProjectImageWrapper'
import ProjectImageWithHoverWrapper from '../components/ProjectImageWithHoverWrapper'
import ProjectHoverDescription from '../components/ProjectHoverDescription'
import ProjectRow from '../components/ProjectRow'

import Footer from '../components/Footer'
import FooterWrapper from '../components/FooterWrapper'
import FooterColumn from '../components/FooterColumn'
import FooterTitle from '../components/FooterTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

const formatProjects = ({ projs, projects }) =>
  flow(
    groupBy('row'),
    map(row =>
      flow(
        groupBy('column'),
        values,
      )(row),
    ),
  )(
    projs.map(proj => ({
      ...proj,
      ...projects.find(({ frontmatter: { title } }) => title.includes(proj.project)),
    })),
  )

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
      frontmatter: { description, seoTitle, seoDescription, seoImage, projects: projs },
    },
  },
}) => (
  <Layout>
    <SEO {...{ seoTitle, seoDescription, seoImage, ...metadata.frontmatter }} />
    <Menu />
    <Explanation>
      <Container>
        <About>{description}</About>
        <Link to="/about">+ Leia mais sobre</Link>
      </Container>
    </Explanation>
    <Projects id="project">
      {formatProjects({ projects, projs }).map(columns => (
        <ProjectRow>
          {columns.map(columnItems => (
            <div>
              {columnItems.map(({ frontmatter: { title, tags, slug }, fields: { featuredImage } }) => (
                <ProjectItem key={title}>
                  <ProjectImageWrapper to={`/project/${slug}`}>
                    <ProjectImageWithHoverWrapper>
                      <ProjectImage src={featuredImage} />
                      <ProjectHoverDescription>
                        {title}
                        <br />
                        {tags.map(item => item.tag).join(', ')}
                      </ProjectHoverDescription>
                    </ProjectImageWithHoverWrapper>
                  </ProjectImageWrapper>
                </ProjectItem>
              ))}
            </div>
          ))}
        </ProjectRow>
      ))}
    </Projects>
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
