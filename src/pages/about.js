import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import OutsideClickHandler from 'react-outside-click-handler'

import Astrocoders from '../components/Astrocoders'
import AstrocodersLink from '../components/AstrocodersLink'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeaderLink from '../components/HeaderLink'
import Header from '../components/Header'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'

import Explanation from '../components/Explanation'
import ExplanationDescription from '../components/ExplanationDescription'

import Team from '../components/Team'
import TeamMember from '../components/TeamMember'
import TeamMemberName from '../components/TeamMemberName'
import TeamMemberInformation from '../components/TeamMemberInformation'
import TeamMemberStatus from '../components/TeamMemberStatus'
import TeamMemberStatusItem from '../components/TeamMemberStatusItem'
import TeamMemberCurriculum from '../components/TeamMemberCurriculum'
import TeamMemberWrapper from '../components/TeamMemberWrapper'

import Footer from '../components/Footer'
import FooterWrapper from '../components/FooterWrapper'
import FooterTitle from '../components/FooterTitle'
import FooterSubTitle from '../components/FooterSubTitle'
import FooterText from '../components/FooterText'
import FooterLink from '../components/FooterLink'

export const query = graphql`
  query About {
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
  isColorChanged,
  indexTeamMember,
  setIndexTeamMember,
  data: {
    contact,
    metadata,
    page: { html, frontmatter: { seoTitle, seoDescription, seoImage }, fields: { team } } = {},
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
        <ExplanationDescription dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    </Explanation>
    <Team>
      <Container>
        <TeamMemberWrapper>
          {team.map((teamMember, idx) => (
            <OutsideClickHandler key={teamMember.frontmatter.title} onOutsideClick={() => setIndexTeamMember(null)}>
              <TeamMember onClick={() => setIndexTeamMember(idx)}>
                <TeamMemberInformation>
                  <TeamMemberName>{teamMember.frontmatter.title}</TeamMemberName>
                  <Grid justifyContent="space-between">
                    <TeamMemberStatus>
                      <TeamMemberStatusItem>{teamMember.frontmatter.position} </TeamMemberStatusItem>
                      <TeamMemberStatusItem>{teamMember.frontmatter.specialty} </TeamMemberStatusItem>
                      <TeamMemberStatusItem>{teamMember.frontmatter.city}</TeamMemberStatusItem>
                    </TeamMemberStatus>

                    <span>{indexTeamMember === idx ? '−' : '+'}</span>
                  </Grid>
                </TeamMemberInformation>
                {indexTeamMember === idx && <TeamMemberCurriculum dangerouslySetInnerHTML={{ __html: teamMember.html }} />}
              </TeamMember>
            </OutsideClickHandler>
          ))}
        </TeamMemberWrapper>
      </Container>
    </Team>
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

About.propTypes = {
  isColorChanged: PropTypes.bool,
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
    { indexTeamMember: null, isColorChanged: false },
    {
      setIndexTeamMember: () => value => ({ indexTeamMember: value }),
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
)(About)
