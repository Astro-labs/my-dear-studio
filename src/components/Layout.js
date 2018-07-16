import styled, { injectGlobal } from 'styled-components'
import quincyFC from '../fonts/quincy-cf-text.woff2'
/* eslint-disable */
import 'normalize.css'

injectGlobal`
  @font-face {
    font-family: 'QuincyCF-Text';
    font-style: normal;
    font-weight: normal;
    src: local('QuincyCF-Text'), url('${quincyFC}') format('woff2');
  }
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');

`
/* eslint-enable */

export default styled.div`
  display: flex;
  flex-direction: column;
`
