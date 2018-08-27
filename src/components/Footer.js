import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import Container from './Container'
import Logo from './Logo'
import BreakPoints from './BreakPoints'

const FooterWrapper = styled.div`
  display: flex;
  ${BreakPoints({
    flexDirection: ['column', 'column', 'row'],
    justifyContent: 'center',
    alignItems: ['center', 'center', 'flex-start'],
    paddingTop: ['0', '50px', '50px'],
  })};
`

const FooterColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 30px;
  ${BreakPoints({
    width: ['100%', '33%', '33%'],
  })};
`

const FooterColumnGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const FooterText = styled.p`
  color: #575757;
  margin: 5px 0;
`

const FooterLink = styled.a.attrs({
  target: '_blank',
})`
  font-size: 1rem;
  text-decoration: none;
  margin: 10px 0;
  color: #575757;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const LogosArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 60px;
`

const AstrocodersLogo = styled.img`
  width: 26px;
  height: 26px;
`

const AstrocodersLink = styled.a.attrs({
  href: 'https://astrocoders.com',
  target: '_blank',
})`
  text-decoration: none;
  font-size: 0.5rem;
  font-weight: 700;
  color: #6939b4;
  display: flex;
  align-items: center;
`

const Footer = ({ contact, astrocodersLogo }) => (
  <div id="contact">
    <Container>
      <FooterWrapper>
        <FooterColumn>
          <FooterColumnGroup>
            <FooterLink to={contact.frontmatter.instagram}>Instagram</FooterLink>
            <FooterLink to={contact.frontmatter.facebook}>Facebook</FooterLink>
            <FooterLink to={contact.frontmatter.linkedin}>LinkedIn</FooterLink>
          </FooterColumnGroup>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnGroup>
            <FooterLink to={`mailto:${contact.frontmatter.contactEmail}`}>
              {contact.frontmatter.contactEmail}
            </FooterLink>
            {contact.frontmatter.phones.map(phone => <FooterText key={phone}>{phone}</FooterText>)}
          </FooterColumnGroup>
        </FooterColumn>
        <FooterColumn>
          <FooterColumnGroup>
            <FooterLink to={contact.frontmatter.newsletterLink}>Clique aqui e assine nossa newsletter</FooterLink>
          </FooterColumnGroup>
        </FooterColumn>
      </FooterWrapper>
      <LogosArea>
        <br />
        <AstrocodersLink>
          <span>Made by our friends</span> <AstrocodersLogo src={astrocodersLogo.original.src} />
        </AstrocodersLink>
      </LogosArea>
    </Container>
  </div>
)

Footer.propTypes = {
  astrocodersLogo: PropTypes.shape({
    original: PropTypes.shape({ src: PropTypes.string.isRequired }),
  }),
  contact: PropTypes.shape({
    frontmatter: PropTypes.shape({
      instagram: PropTypes.string.isRequired,
      facebook: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
      contactEmail: PropTypes.string.isRequired,
      phones: PropTypes.arrayOf(PropTypes.string.isRequired),
    }),
  }),
}

export default Footer
