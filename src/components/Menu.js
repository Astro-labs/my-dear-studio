import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'

import HeaderLink from '../components/HeaderLink'
import Header from '../components/Header'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'

import srcMenuBlackIcon from '../img/menu-black-icon.png'
import srcMenuWhiteIcon from '../img/menu-white-icon.png'
import srcCloseBlackIcon from '../img/close-black-icon.png'
import srcCloseWhiteIcon from '../img/close-white-icon.png'

const MenuDialog = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  top: 40px;
  padding: 20px 0;
  align-items: flex-end;
  justify-content: center;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
`

const MenuIcon = styled.img`
  height: 100%;
  width: 100%;
`

const Menu = ({ isColorChanged, setMenuOpened, isMenuOpened }) => (
  <div>
    <MediaQuery query="(min-device-width: 1224px)">
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
    </MediaQuery>
    <MediaQuery query="(max-device-width: 1224px)">
      <Header style={{ backgroundColor: isColorChanged ? '#9d1c1c' : '#fff', margin: 0 }}>
        <Container>
          <Grid justifyContent="space-between">
            <Logo color={isColorChanged ? '#E2BA39' : '#9d1c1c'} />
            <Grid>
              <div onClick={evt => setMenuOpened({ isMenuOpened })}>
                <MenuIcon
                  src={
                    isMenuOpened
                      ? isColorChanged
                        ? srcCloseWhiteIcon
                        : srcCloseBlackIcon
                      : isColorChanged
                        ? srcMenuWhiteIcon
                        : srcMenuBlackIcon
                  }
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Header>
      {isMenuOpened && (
        <MenuDialog style={{ backgroundColor: isColorChanged ? '#9d1c1c' : '#fff' }}>
          <HeaderLink fontSize="1.5rem" color={isColorChanged ? '#E2BA39' : '#9d1c1c'} to="/#project">
            Project
          </HeaderLink>
          <HeaderLink fontSize="1.5rem" color={isColorChanged ? '#E2BA39' : '#9d1c1c'} to="/about">
            About
          </HeaderLink>
          <HeaderLink fontSize="1.5rem" color={isColorChanged ? '#E2BA39' : '#9d1c1c'} to="/#contact">
            Contact
          </HeaderLink>
        </MenuDialog>
      )}
    </MediaQuery>
  </div>
)

Menu.propTypes = {
  isColorChanged: PropTypes.bool,
  isMenuOpened: PropTypes.bool,
  setMenuOpened: PropTypes.func.isRequired,
}

export default compose(
  withStateHandlers(
    { isColorChanged: false, isMenuOpened: false },
    {
      changeColor: () => ({ target: { documentElement } }) => ({
        isColorChanged: documentElement.scrollTop > documentElement.offsetHeight / 8,
      }),
      setMenuOpened: ({ isMenuOpened }) => () => ({
        isMenuOpened: !isMenuOpened,
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
)(Menu)
