# Taro-i18n
Taro国际化结构，支持参数化,支持小程序

## 快速开始
### 1.安装插件,在项目的根目录下打开命令行,执行 `npm i --save taro-i18n`
### 2.创建 **locales.ts文件** 
```
//locales.ts文件内容
export default function get(value: any={}): any{
  return {
    'en': {
      'test': `this is test text`,
      'testParam': `Resend in ${value.time} s`,
      'testMultiParam': value.name+'go to'+value.school
    },
    'zh': {
      'test': `这是测试文本`,
      'testParam': `${value.time}秒后重发`,
      'testMultiParam': value.name+'去上'+value.school
    }
  }
}
```
### 3. 在**app文件**(**app.tsx**或**app.js**,根据你的项目使用的是ts还是js决定,以下是ts的例子)中引入组件,并初始化组件
  ```

//文件最上方引入组件
import i18n from 'taro-i18n'

//步骤2中你建的 locales.ts文件 位置,我是放在utils文件夹下,具体以你实际位置为准
import locales from './utils/locales'


  //在生命周期方法中初始化组件
  componentWillMount(){

    //1.使用系统语言的初始化方法,第一个参数是:语言类型 第二个参数是:词语仓库
    // Taro.getSystemInfo().then((result)=>{
    //   i18n.t = new i18n(result.language,locales)
    // })

    //2.使用给定的语言初始化方法,第一个参数是:语言类型 第二个参数是:词语仓库
    i18n.t = new i18n('zh',locales)
  }
  ```
  ### 4. 简单使用,在页面或组件中引用 `import i18n from 'taro-i18n'` 在需要的地方 `i18n.t._('test')`,显示效果 '这是测试文本'
 ### 5. 带参数使用
 ```
 //locales.ts 中
 'testParam': `${value.time}秒后重发`,
 ```
 也可以用其他写法,作用一样
 ```
  //locales.ts 中
  'testParam': value.time+'秒后重发',
 ```
 使用`i18n.t._('testParam',{'time':'60'})` 显示效果 '60秒后重发' 
 #### 可以有多个参数,但注意参数名一致,列如这里的 time 对应 value.time,多参数例子如下:
 ```
  //locales.ts 中
  'testMultiParam': value.name+'去上'+value.school,

 ```
  使用`i18n.t._('testMultiParam',{'name':'小明','school':'明珠小学'})` 显示效果 '小明去上明珠小学'

  ### 6.以上步骤即可正常使用国际化组件
## 通过源码使用(适合修改和优化)
### 1. 复制demo中 **utils** 文件夹下的 **i18n.ts** 和 **locales.ts** 文件,粘贴到你自己的utils文件夹或其他任意文件夹
### 2. 在**app文件**(**app.tsx**或**app.js**,根据你的项目使用的是ts还是js决定,以下是ts的例子)中引入 **i18n.ts** 文件,并初始化国际化工具
  ```

//上方引入i18n工具,路径是你上方复制文件的真实路径
import T from './utils/i18n'

  //在生命周期方法中初始化i18n工具
  componentWillMount():void{
    this.initLocale ()
  }
  
  async initLocale (): Promise<void> {

    // 初始化语言
    const systemInfo = await Taro.getSystemInfo()

    // 默认使用系统语言
    let locale = systemInfo.language 

    //初始化i18n工具
    T.t = new T(locale)
  }
  ```
  ### 3. 在locales.ts文件中添加国际化字段,en是'test'对应的英文是什么,zh是'test'对应的中文是什么,当然你也可以自定义其他语言或修改名称,在上一步中 **T.t = new T(locale)** 其中locale =='zh',代表接下来使用中文环境,之后也可以 **T.t.setLocale('en')** 来手动更改语言
  ```
    'en': {
      'test': `this is test text`,
    },
    'zh': {
      'test': `这是测试文本`,
    }
  ```
  ### 4. 简单使用,在页面或组件中引用
  `import i18n from './utils/i18n'`
  (引用你i18n.ts文件具体的位置),在需要的地方
  `i18n.t._('test')`,显示效果 '这是测试文本'
 ### 5. 带参数使用,在locales.ts中新加一个字段
 ```
 //locales.ts 中
 'testParam': `${value.time}秒后重发`,
 ```
 也可以用其他写法,作用一样
 ```
  //locales.ts 中
  'testParam': value.time+'秒后重发',
 ```
 使用`i18n.t._('testParam',{'time':'60'})` 显示效果 '60秒后重发' 
 #### 可以有多个参数,但注意参数名一致,列如这里的time和value.time,多参数例子如下:
 ```
  //locales.ts 中
  'testMultiParam': value.name+'去上'+value.school,

 ```
  使用`i18n.t._('testMultiParam',{'name':'小明','school':'明珠小学'})` 显示效果 '小明去上明珠小学'

  ### 6.下面是设置别名和可能遇到的问题,以上内容已经可以正常使用
  ## 设置别名
  ### 1. 在项目目录下config文件夹下index.js中加入
  ```
  //这行加在最上方
  const path = require('path')

  //这行加在const config = {}中
  'alias': {
    '@i18n': path.resolve(__dirname, '..', 'src/utils/i18n'),
  },
  ```
  ### 2. 在项目目录下global.d.ts文件中加入
  ```
  declare module "@i18n";
  ```
### 3. 之前的引入方式 `import i18n from './utils/i18n'` 可以改成 `import i18n from '@i18n'`,其他用法不变

## 可能遇到的问题

* 遇到报错:thirdScriptError regeneratorRuntime is not defined 请访问官网 https://nervjs.github.io/taro/docs/migrate-to-2.html#%E4%BD%BF%E7%94%A8-async-await-%E6%97%B6%E5%87%BA%E7%8E%B0%E6%8A%A5%E9%94%99-function-is-not-a-function   如果还未解决,那就不要在app.ts中使用async和await了,改成通过回调来做
app文件中的initLocale方法改成
```
  initLocale1(): void {
    Taro.getSystemInfo().then((result)=>{
      T.t = new T(result.language)
    })
  }
```
## 其他
* 目前只在小程序上用了,其他平台的没试,欢迎大家来一起完善




