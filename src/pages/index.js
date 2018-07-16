import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

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

import Projects from '../components/Projects'
import ProjectItem from '../components/ProjectItem'
import ProjectImage from '../components/ProjectImage'
import ProjectImageWrapper from '../components/ProjectImageWrapper'
import ProjectTitle from '../components/ProjectTitle'
import ProjectDescription from '../components/ProjectDescription'
import ProjectExplanation from '../components/ProjectExplanation'
import ProjectExplanationWrapper from '../components/ProjectExplanationWrapper'

import Footer from '../components/Footer'
import FooterTitle from '../components/FooterTitle'
import FooterSubTitle from '../components/FooterSubTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

export const query = graphql`
  query Home {
    site {
      siteMetadata {
        title
        description
        image
        fbAppId
        twitterUser
      }
    }
  }
`

const Home = ({ data: { site: { siteMetadata } } }) => (
  <Layout>
    <SEO {...siteMetadata} />
    <Header>
      <Container>
        <Grid justifyContent="flex-end">
          <HeaderLink to="/link">Work</HeaderLink>
          <HeaderLink to="/about">About</HeaderLink>
          <HeaderLink to="/#contact">Contact</HeaderLink>
        </Grid>
        <Grid style={{ marginTop: 60 }}>
          <Logo color="#E2BA39" />
        </Grid>
      </Container>
    </Header>
    <Explanation>
      <Container>
        <ExplanationDescription>
          My Dear Studio, is a brand identity design studio based in Barcelona, Spain, and Berlin, Germany.
        </ExplanationDescription>
        <ExplanationDescription>
          We work in every single aspect of your brand's design - naming, Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Nam quis diam ornare, consectetur tellus in, porttitor orci. Nulla eu viverra leo. Fusce
          fermentum orci vel pharetra pharetra.
        </ExplanationDescription>
        <ExplanationToggleMore>+ Read more about us</ExplanationToggleMore>
      </Container>
    </Explanation>
    <Projects>
      <ProjectItem>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/01_branding_grid.png" />
        </ProjectImageWrapper>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>Caderno Inteligente</ProjectTitle>
            <ProjectDescription>Brand, Identity, Digital</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>ZanPan</ProjectTitle>
            <ProjectDescription>Naming, Brand, Identity, Digital</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/02_branding_grid.png" />
        </ProjectImageWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/03_branding_grid.png" />
        </ProjectImageWrapper>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>Callejeando Project</ProjectTitle>
            <ProjectDescription>Brand, Identity, Digital</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>Estúdio CaLó</ProjectTitle>
            <ProjectDescription>Naming, Brand, Identity, Digital</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/04_branding_grid.png" />
        </ProjectImageWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/05_branding_grid.png" />
        </ProjectImageWrapper>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>Oodles</ProjectTitle>
            <ProjectDescription>Naming, Brand, Identity, Digital</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>Seja Bene</ProjectTitle>
            <ProjectDescription>Digital</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/06_branding_grid.png" />
        </ProjectImageWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/07_branding_grid.png" />
        </ProjectImageWrapper>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>Seti</ProjectTitle>
            <ProjectDescription>Rebranding</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
      </ProjectItem>
      <ProjectItem>
        <ProjectExplanationWrapper>
          <ProjectExplanation>
            <ProjectTitle>AnotherGreatShop</ProjectTitle>
            <ProjectDescription>Naming, Brand</ProjectDescription>
          </ProjectExplanation>
        </ProjectExplanationWrapper>
        <ProjectImageWrapper>
          <ProjectImage src="/img/home/08_branding_grid.png" />
        </ProjectImageWrapper>
      </ProjectItem>
    </Projects>
    <Footer id="contact">
      <Container>
        <FooterTitle>Contact</FooterTitle>
        <Grid justifyContent="space-between" alignItems="flex-start">
          <Grid justifyContent="center" direction="column" style={{ width: '33%' }}>
            <FooterLink>hi@mydearstudio.com</FooterLink>
            <FooterText>T ()</FooterText>
            <FooterText>T ()</FooterText>
          </Grid>
          <Grid justifyContent="center" direction="column" style={{ width: '33%' }}>
            <FooterSubTitle>Connect</FooterSubTitle>
            <FooterLink>Instagram</FooterLink>
            <FooterLink>Facebook</FooterLink>
            <FooterLink>LinkedIn</FooterLink>
          </Grid>
          <Grid justifyContent="center" direction="column" style={{ width: '33%' }}>
            <FooterSubTitle>Jobs applications and internships:</FooterSubTitle>
            <FooterLink>work@mydearstudio.com</FooterLink>
          </Grid>
        </Grid>
        <FooterTitle>Newsletter</FooterTitle>
        <Grid>
          <FooterLink>Subscribe to our mailing</FooterLink>
        </Grid>
        <Grid style={{ marginTop: 60 }}>
          <Logo color="#B93026" width="100px" />
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
