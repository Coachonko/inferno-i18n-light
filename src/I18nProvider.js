import { Component } from 'inferno'

function getBrowserLanguage (defaultLanguage) {
  if (typeof navigator !== 'undefined') {
    return navigator.language.split('-')[0]
  }
  return defaultLanguage
}

function initLanguage (defaultLanguage, detectBrowserLanguage) {
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
      language: initLanguage(props.defaultLanguage, props.detectBrowserLanguage),
      setLanguage: this.setLanguage.bind(this),
      languages: props.languages,
      defaultLanguage: props.defaultLanguage
    }
  }

  setLanguage (newLanguage) {
    this.setState({ language: newLanguage })
  }

  getChildContext () {
    return {
      language: this.state.language,
      setLanguage: this.setLanguage.bind(this),
      languages: this.state.languages,
      defaultLanguage: this.state.defaultLanguage
    }
  }

  render () {
    return this.props.children
  }
}
