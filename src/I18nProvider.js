import { Component } from 'inferno'

function getBrowserLanguage (defaultLanguage) {
  if (typeof navigator !== 'undefined') {
    return navigator.language.split('-')[0]
  }
  return defaultLanguage
}

function initLocale (defaultLanguage, detectBrowserLanguage) {
  if (typeof detectBrowserLanguage === 'undefined') {
    detectBrowserLanguage = false
  }
  if (detectBrowserLanguage) return getBrowserLanguage(defaultLanguage)
  return defaultLanguage
}

export class I18nProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      locale: initLocale(props.defaultLanguage, props.detectBrowserLanguage),
      setLocale: this.setLocale.bind(this),
      languages: props.languages,
      defaultLanguage: props.defaultLanguage
    }
  }

  setLocale (language) {
    this.setState({ locale: language })
  }

  getChildContext () {
    return {
      locale: this.state.locale,
      setLocale: this.setLocale.bind(this),
      languages: this.state.languages,
      defaultLanguage: this.state.defaultLanguage
    }
  }

  render () {
    return this.props.children
  }
}
