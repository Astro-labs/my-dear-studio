import React from 'react'
import PropTypes from 'prop-types'
import { compose, withStateHandlers, lifecycle } from 'recompose'
import MediaQuery from 'react-responsive'
import styled from 'styled-components'
import ClickOutside from 'react-click-outside'

import withScrollColorChange from '../hocs/withScrollColorChange'

import HeaderLink from '../components/HeaderLink'
import Header from '../components/Header'
import Grid from '../components/Grid'
import Logo from '../components/Logo'
import Container from '../components/Container'
import MenuDialog from '../components/MenuDialog'
import MenuBlackIcon from '../components/MenuBlackIcon'
import MenuWhiteIcon from '../components/MenuWhiteIcon'
import CloseBlackIcon from '../components/CloseBlackIcon'
import CloseWhiteIcon from '../components/CloseWhiteIcon'

const Menu = ({ isColorChanged, setMenuOpened, isMenuOpened }) => (
  <ClickOutside onClickOutside={() => setMenuOpened(false)}>
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
              <div onClick={evt => setMenuOpened()}>
                {isMenuOpened ? (
                  isColorChanged ? (
                    <CloseWhiteIcon />
                  ) : (
                    <CloseBlackIcon />
                  )
                ) : isColorChanged ? (
                  <MenuWhiteIcon />
                ) : (
                  <MenuBlackIcon />
                )}
              </div>
            </Grid>
          </Grid>
        </Container>
      </Header>
      {isMenuOpened && (
        <MenuDialog style={{ backgroundColor: isColorChanged ? '#9d1c1c' : '#fff' }}>
          <HeaderLink
            fontSize="1.5rem"
            color={isColorChanged ? '#E2BA39' : '#9d1c1c'}
            to="/#project"
            onClick={evt => setMenuOpened()}>
            Project
          </HeaderLink>
          <HeaderLink
            fontSize="1.5rem"
            color={isColorChanged ? '#E2BA39' : '#9d1c1c'}
            to="/about"
            onClick={evt => setMenuOpened()}>
            About
          </HeaderLink>
          <HeaderLink
            fontSize="1.5rem"
            color={isColorChanged ? '#E2BA39' : '#9d1c1c'}
            to="/#contact"
            onClick={evt => setMenuOpened()}>
            Contact
          </HeaderLink>
        </MenuDialog>
      )}
    </MediaQuery>
  </ClickOutside>
)

Menu.propTypes = {
  isColorChanged: PropTypes.bool,
  isMenuOpened: PropTypes.bool,
  setMenuOpened: PropTypes.func.isRequired,
}

export default compose(
  withScrollColorChange,
  withStateHandlers(
    { isMenuOpened: false },
    {
      setMenuOpened: ({ isMenuOpened }) => (newState = !isMenuOpened) => ({
        isMenuOpened: newState,
      }),
    },
  ),
)(Menu)
