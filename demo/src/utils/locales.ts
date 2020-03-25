export default function get(value: any={}): any{
  return {
    'en': {
      'test': `this is test text`,
      'testMultiParam': value.name+'go to'+value.school,
    },
    'zh': {
      'test': `这是测试文本`,
      'testMultiParam': value.name+'去上'+value.school,
    }
  }
}
