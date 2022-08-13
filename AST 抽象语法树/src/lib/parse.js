import { parseAttrString } from "./parseAttrString"


/**
 * 描述：AST 语法的主函数
 * @param {*} templateAString 
 * @returns []
 */
export function parse(templateAString) {
  let index = 0
  let stack1 = []
  let stack2 = [{ children: [] }]
  let startRegExp = /^\<([a-zA-Z]+[1-6]?)(\s[^\<]+)?\/?\>/    // 开始标志的正则()
  let endRegExp = /^\<\/([a-zA-Z]+[1-6]?)\>/    // 结束标志的正则
  let textRegExp = /^([^\<]+)\<\/([a-zA-Z]+[1-6]?)\>/ // 文字检测, [^\<]是找指定字符外的所有字符
  let rest = '' // 剩余部分
  console.log(templateAString);
  while (index < templateAString.length) {
    let rest = templateAString.substring(index)
    if (startRegExp.test(rest)) {// 开始
      let restMap = rest.match(startRegExp)
      let tage = restMap[1] // 标签名
      let attrs = restMap[2] ? restMap[2] : '' // 属性
      if (/\/\>/g.test(restMap[0])) {
        stack2[stack2.length - 1].children.push({tag: tage, children: [], attrs: parseAttrString(attrs) , 'type': 1})
        index += tage.length + 3 + attrs.length 
      } else {
        stack1.push(tage)
        stack2.push({ tag: tage, children: [], attrs: parseAttrString(attrs) , 'type': 3 })
        index += tage.length + 2 + attrs.length 
      }
      console.log('开始标志', tage, attrs);
    } else if (endRegExp.test(rest)) {// 结束
      let tage = rest.match(endRegExp)[1]
      // 是否和栈顶的标签相同
      if (stack1[stack1.length - 1] == tage) {
        stack1.pop()
        let pop_arr = stack2.pop()
        stack2[stack2.length - 1].children.push(pop_arr)
      } else {
        throw Error(tage, '这标签没有闭合');
      }
      console.log('结束标志', tage);
      index += tage.length + 3
    } else if (textRegExp.test(rest)) {
      let text = rest.match(textRegExp)[1]
      if (!/^\s+$/.test(text)) {// 不是空百字符串
        console.log('文本', text);
        stack2[stack2.length - 1].children.push({ 'text': text })
      }
      index += text.length

    } else {
      index++
    }
  }
  console.log(stack1, stack2);
  return stack2[0].children
}