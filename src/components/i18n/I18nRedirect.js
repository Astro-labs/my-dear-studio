import { PureComponent } from 'react'
import { withPrefix, navigateTo } from 'gatsby-link'
import { lookup, navigatorLanguages } from '@wapps/langtag-utils'

class Redirect extends PureComponent {
  componentDidMount() {
    if (typeof window === 'undefined') return
    const { languages, defaultLanguage, redirectPage } = this.props.pathContext
    const detectedLanguage = lookup(languages, navigatorLanguages(), defaultLanguage)
    const newUrl = withPrefix(`/${detectedLanguage}${redirectPage}`)

    navigateTo(newUrl)
  }

  render() {
    return null
  }
}

export default Redirect
