import React from 'react'
import { compose, withStateHandlers, lifecycle } from 'recompose'

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
)
