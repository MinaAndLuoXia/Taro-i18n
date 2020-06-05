import locales from './locales'

export default class T {

  locale
  static t = {_:()=>{}}
  constructor(locale) {
    if (locale) {
      this.locale = locale
    }
  }

  setLocale(locale) {
    this.locale = locale
  }

  _(line,value) {
    const { locale } = this
    let string = line

    if (locale && locales(value)[locale] && locales(value)[locale][line]) {
      string = locales(value)[locale][line]
    }

    return string
  }
}