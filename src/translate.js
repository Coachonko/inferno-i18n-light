const getPlural = (count, language) => {
  if (typeof Intl === 'object' && typeof Intl.PluralRules === 'function') {
    return new Intl.PluralRules(language).select(count)
  }
  if (count === 0) {
    return 'zero'
  } else if (count === 1) {
    return 'one'
  } else {
    return 'other'
  }
}

export function tr ({ language, languages, defaultLanguage }, key, params) {
  const currentLanguage = !languages[language] ? defaultLanguage : language
  let result = languages[currentLanguage]
  let currentKey = key
  if (params && Object.keys(params).includes('count')) {
    const plural = getPlural(params.count, currentLanguage)
    if (params.count === 0) {
      currentKey += '.zero'
    } else if (plural === 'other') {
      currentKey += '.many'
    } else {
      currentKey += `.${plural}`
    }
  }
  if (params && params.gender) {
    if (params.gender === 'm') {
      currentKey += '.male'
    } else {
      currentKey += '.female'
    }
  }
  currentKey.split('.').forEach(k => {
    if (!result[k]) return
    return (result = result[k])
  })
  if (typeof result !== 'string') {
    console.warn(`i18n: Missing translation for ${key}`)
    return ''
  }
  if (params) {
    return result
      .split('__')
      .map(word => params[word] || word)
      .join('')
  } else {
    return result
  }
}

export function useT (context) {
  const { setLanguage, ...props } = context

  const t = (key, params) => tr(props, key, params)

  return { ...props, setLanguage, t }
}
