import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers } from 'recompose'
import MediaQuery from 'react-responsive'
import ClickOutside from 'react-click-outside'

import HeaderLink from '../components/HeaderLink'
import Header from '../components/Header'
import HeaderContainer from '../components/HeaderContainer'

import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'

import MenuDialog from '../components/MenuDialog'
import MenuIcon from '../components/MenuIcon'
import MenuIconClose from '../components/MenuIconClose'

const Menu = ({ setMenuOpened, isMenuOpened }) => (
  <ClickOutside onClickOutside={() => setMenuOpened(false)}>
    <MediaQuery query="(min-device-width: 1224px)">
      <Header>
        <HeaderContainer>
          <Grid justifyContent="space-between">
            <Logo />
            <Grid>
              <HeaderLink to="/#project">Projetos</HeaderLink>
              <HeaderLink to="/about">Sobre</HeaderLink>
              <HeaderLink to="/#contact">Contato</HeaderLink>
            </Grid>
          </Grid>
        </HeaderContainer>
      </Header>
    </MediaQuery>
    <MediaQuery query="(max-device-width: 1224px)">
      <Header
        style={{
          backgroundColor: '#fff',
          margin: 0,
        }}
      >
        <Container>
          <Grid justifyContent="space-between">
            {isMenuOpened ? <div /> : <Logo />}
            <Grid>
              <div onClick={evt => setMenuOpened()}>{isMenuOpened ? <MenuIconClose /> : <MenuIcon />}</div>
            </Grid>
          </Grid>
        </Container>
      </Header>
      {isMenuOpened && (
        <MenuDialog>
          <HeaderLink fontSize="1.5rem" to="/#project" onClick={evt => setMenuOpened()}>
            Projetos
          </HeaderLink>
          <HeaderLink fontSize="1.5rem" to="/about" onClick={evt => setMenuOpened()}>
            Sobre
          </HeaderLink>
          <HeaderLink fontSize="1.5rem" to="/#contact" onClick={evt => setMenuOpened()}>
            Contato
          </HeaderLink>
          <br />
          <br />
          <Logo />
        </MenuDialog>
      )}
    </MediaQuery>
  </ClickOutside>
)

Menu.propTypes = {
  isMenuOpened: PropTypes.bool,
  setMenuOpened: PropTypes.func.isRequired,
}

export default compose(
  withStateHandlers(
    { isMenuOpened: false },
    {
      setMenuOpened: ({ isMenuOpened }) => (newState = !isMenuOpened) => ({
        isMenuOpened: newState,
      }),
    },
  ),
)(Menu)
