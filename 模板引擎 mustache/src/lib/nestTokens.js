export default function nestTokens(tokens) {
  // 组装号的结果数组
  const _nestTokens = []
  // 栈 用来存储 #
  let section = []
  // 目前所在的数组
  let thisArr = _nestTokens

  // 判断数组第一个项是 # 还是 /
  for (let i = 0; i < tokens.length; i++) {
    // 遍历每一项
    let token = tokens[i]
    // 判断数组第一个是# 还是 / ，还是文本类型
    switch (token[0]) {
      case '#':
        // 进栈也要将数组存放搭配结果数组中去
        thisArr.push(token)
        // 将 # 后面的 token 存入当前栈的队尾（栈口）数组的下标为2 的项
        // 作为当前数组
        thisArr = token[2] = []
        // 入栈
        section.push(token)

        break;
      case '/':
        // 出战
        section.pop()
        // 将出栈的数组存放到结果数组中
        if (section.length > 0) {
          thisArr = section[section.length - 1][2]
        } else {
          thisArr = _nestTokens
        }
        break;
      default:
        thisArr.push(token)
        break;
    }
  }
  return _nestTokens
}

