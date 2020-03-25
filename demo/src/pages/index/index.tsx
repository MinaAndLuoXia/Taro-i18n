import Taro, { Component, Config } from '@tarojs/taro'
import i18n from '@i18n'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  render () {
    return (
      <View className='index'>
        <Text>无参数测试: </Text>
        {i18n.t._('test')}
        <Text> 有参数测试: </Text>
        {i18n.t._('testMultiParam',{'name':'小明','school':'明珠小学'})}
      </View>
    )
  }
}
