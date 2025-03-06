// src\lang\index.ts
import { createI18n } from 'vue-i18n'
import { LANG_VALUE } from '@/global/enum'
import zhHans from './zh-Hans'
import en from './en'
import { localCache } from '@/utils/cache'

const i18n = createI18n({
  legacy: false,
  locale: getLanguage(),
  // globalInjection 的配置项默认为 true
  messages: {
    [LANG_VALUE.Zh]: zhHans,
    [LANG_VALUE.En]: en,
  },
})
export default i18n

export function getLanguage() {
  const chooseLanguage = localCache.getCache('LANGUAGE')
  if (chooseLanguage) return chooseLanguage

  // 如果没有选择语言
  const language = navigator.language.toLowerCase()
  const locales = [LANG_VALUE.En, LANG_VALUE.Zh]
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return LANG_VALUE.Zh
}
