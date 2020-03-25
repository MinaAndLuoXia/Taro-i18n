import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/index'
import T from './utils/i18n'
import './app.scss'

class App extends Component {

  componentWillMount(): void {
    this.initLocale()
  }

  async initLocale(): Promise<void> {
    const systemInfo = await Taro.getSystemInfo()
    let locale = systemInfo.language // 默认使用系统语言
    T.t = new T(locale)
  }

  config: Config = {
    pages: [
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
