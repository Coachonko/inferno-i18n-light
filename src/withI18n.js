import { Component } from 'inferno'
import { useT } from './translate'

// Passes getChildContext as prop, this ensures all lifecycle events work as expected.
export function withI18n (WrappedComponent) {
  return class extends Component {
    render () {
      const {
        language,
        setLanguage,
        languages,
        defaultLanguage
      } = this.context
      const { t } = useT(this.context)
      return (
        <WrappedComponent
          {...this.props}
          i18nContext={{
            language,
            setLanguage,
            languages,
            defaultLanguage
          }}
          t={t}
        />
      )
    }
  }
}
