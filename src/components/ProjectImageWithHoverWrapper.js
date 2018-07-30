import styled from 'styled-components'

export default styled.div`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -200%;
    width: 150%;
    height: 100%;
    transform: skew(-20deg, 0);
    transition-property: left;
    transition-duration: 0.5s;
    background-color: rgba(157, 28, 28, 1);
  }

  *:not(img) {
    opacity: 0;
    transition: opacity 0.2s ease-out;
    transition-delay: 0.5s * 0.6;
  }

  &:hover {
    *:not(img) {
      opacity: 1;
    }

    &:before {
      left: -20%;
    }
  }
`
