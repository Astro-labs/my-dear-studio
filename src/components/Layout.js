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

  html {
    color: #7e7e7e;
    ${BreakPoints({
      fontSize: ['70%', '85%', '100%'],
    })}
  }

  a {
    color: #9d1c1c;
  }

  a:active, a:hover {
    color: #5a1010;
  }
  
  html{
    line-heith:1.5;
}

.bTBbjP {
line-heith:1.5;
}

`
/* eslint-enable */

export default styled.div`
  display: flex;
  flex-direction: column;
`
