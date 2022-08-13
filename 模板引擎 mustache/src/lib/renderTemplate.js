import lookup from './lookup'

/**
 * 描述： renderTemplate（）方法的主要作用就是将：tokens和数据合并，然后生成 DOM字符串。我们先用一个简单的tokens和数据进行合并。
 * @param {string} tokens parseTemplelateTokens生成的数组
 * @param {object} data 对象数据
 */

export default function renderTemplate(tokens, data) {
  // let tokens = parseTemplelateTokens(str)
  let templateStr = ''
  for (let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if (token[0] == 'text') {
      templateStr += token[1]
    } else if (token[0] == 'name') {
      templateStr += lookup(data, token[1])
    } else if (token[0] == '#') {
      // 循环递归遍历
      let lookData = data[token[1]]
      if (typeof lookData == 'boolean' && lookData) { // 布尔类型
        templateStr += renderTemplate(token[2], lookData)
      } else if (Array.isArray(lookData)) {
        for(let item of lookData) {
          if (typeof item == 'object') { // 引用类型
            templateStr += renderTemplate(token[2], item)
          } else { // 基本类型
            templateStr += renderTemplate(token[2], {'.':item})
          }
        }
      }
    }
  }
  // console.log(templateStr);
  return templateStr
}


