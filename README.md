# Inferno-i18n-light

Lightweight i18n framework for inferno.

Supports several features, take a look at [translate.js](./src/translate.js)

Note: uses infereno JSX, it is not pre-compiled (can change if you open a PR)

Pull requests are welcome, look [here](./CONTRIBUTING.md).

## Usage

```js
// browser.js
import { hydrate } from 'inferno-hydrate'
import { BrowserRouter } from 'inferno-router'

import { I18nProvider } from '../shared/utils/i18n/I18nProvider'
import { App } from '../shared/components'
import './styles/index.less'

import { en } from '../shared/languages/en'
import { it } from '../shared/languages/it'
import { de } from '../shared/languages/de'
import { nl } from '../shared/languages/nl'
import { no } from '../shared/languages/no'

hydrate(
  <BrowserRouter>
    <I18nProvider languages={{ en, it, de, nl, no }} defaultLanguage='en' detectBrowserLanguage>
      <App />
    </I18nProvider>
  </BrowserRouter>
  , document.getElementById('root')
)

// your '../shared/languages/en'
export const en = {
  home: {
    test: 'en-test',
    anotherTest: 'en-another-test'
  }
}

// your route
  render () {
    const { t } = this.props

    return (
      <>
        <header>
          <h1 className='title'>'title'</h1>
          <span className='subtitle'>{t('home.test')}</span>
          <p className='content'>{t('home.anotherTest')}</p>
```