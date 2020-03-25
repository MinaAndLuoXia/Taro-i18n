import locales from './locales'

export default class T {

  locale: string
  static t: T=new T('en')
  constructor(locale: string) {
    if (locale) {
      this.locale = locale
    }
  }

  setLocale(locale: string): void {
    this.locale = locale
  }

  _(line: string,value?:{}): any {
    const { locale } = this
    let string = line

    if (locale && locales(value)[locale] && locales(value)[locale][line]) {
      string = locales(value)[locale][line]
    }

    return string
  }
}