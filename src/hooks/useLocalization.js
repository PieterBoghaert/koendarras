import { useState, useEffect } from 'react'

const useLocalization = () => {
  const [language, setLanguage] = useState(() => {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search)
    const urlLang = urlParams.get('lang')
    if (urlLang && ['en', 'nl'].includes(urlLang)) {
      return urlLang
    }
    
    // Check localStorage second
    const saved = localStorage.getItem('language')
    if (saved) return saved
    
    // Check browser language, default to Dutch for Netherlands
    const browserLang = navigator.language.toLowerCase()
    return browserLang.startsWith('nl') ? 'nl' : 'en'
  })
  
  const [translations, setTranslations] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/locales/${language}.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // Fallback to English if loading fails
        if (language !== 'en') {
          const fallbackResponse = await fetch('/locales/en.json')
          const fallbackData = await fallbackResponse.json()
          setTranslations(fallbackData)
        }
      } finally {
        setLoading(false)
      }
    }

    loadTranslations()
    // Set HTML lang attribute on language change
    document.documentElement.lang = language
  }, [language])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    // Update HTML lang attribute
    document.documentElement.lang = newLanguage
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return value || key
  }

  return {
    language,
    changeLanguage,
    t,
    loading,
    isEnglish: language === 'en',
    isDutch: language === 'nl'
  }
}

export default useLocalization
