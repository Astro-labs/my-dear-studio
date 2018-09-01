import styled, { injectGlobal } from 'styled-components'

import quincyFC from '../fonts/quincy-cf-text.woff2'
import BreakPoints from './BreakPoints'

/* eslint-disable */
import 'normalize.css'

injectGlobal`
  @font-face {
    font-family: 'QuincyCF-Text';
    font-style: normal;
    font-weight: normal;
    src: local('QuincyCF-Text'), url('${quincyFC}') format('woff2');
  }
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:100,400,700');

  &&& {
    html {
      font-family: "Open Sans";
      color: #7c7c7c;
      ${BreakPoints({
        fontSize: ['70%', '85%', '100%'],
      })};
    }

    a, p, h1, h2, h3, h4, h5, h6 {
      line-height: 1.5;
    }

    a {
      color: #9d1c1c;
      &:active, &:hover { color: #5a1010 }
      font-size: 1.25rem;
    }
  }
`
/* eslint-enable */

export default styled.div`
  display: flex;
  flex-direction: column;
`
