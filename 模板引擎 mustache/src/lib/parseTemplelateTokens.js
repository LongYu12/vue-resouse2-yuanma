// 这个方法主要的作用就是将HTML变成一个个token。
import nestTokens from "./nestTokens";
import Scanner from "./Scanner";

export default function parseTemplateToken(templateStr) {
  // 实例化一个扫描器，构造时提供一个参数，专门为模板字符串服务的
  // 处理模板字符串，为生成 token 服务
  const scanner = new Scanner(templateStr)
  // 将 token 存储到书组中，形成 tokens
  let tokens = []
  // 收集路过的字符串
  let words
  while(!scanner.eos()) {
    // 收集路过的字符串
    words = scanner.scanUtil('{{')
    if (words != '') {
      // 标志位， 不能去掉类名的空格
      let isClass = false
      // 去除空格
      // 拼接
      let _words = ''
      for(let i = 0; i < words.length; i++) {
        // 判断是否在标签里面
        if(words[i] == '<') {
          isClass = true
        } else if(words[i] == '>') {
          isClass = false
        }
        // 当前项不是空格/换行符等空白字符，拼接上
        if(!(/\s/.test(words[i]))){
          _words += words[i]
        } else {
          // 是空格 只有在标签内才拼接上
          if(isClass) {
            _words += ' '
          }
        }
      }
      tokens.push(["text", _words])
    }
    
    // 跳过指定内容
    scanner.scan('{{')
    words = scanner.scanUtil('}}')
    if (words != '') {
      if (words[0] === '#') {
        tokens.push(["#", words.substring(1).trim()])
      } else if (words[0] == '/') {
        tokens.push(['/', words.substring(1).trim()])
      } else {
        tokens.push(["name", words.trim()])
      }
    }
    scanner.scan('}}')

  }
  console.log('技巧怒', tokens);
  return nestTokens(tokens)
}