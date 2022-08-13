
/**
 * 描述： 将标签属性转换为兑现数字的形式
 * @returns []
 */
export function parseAttrString(attrString) {
  if (attrString.length == 0) return []
  let index = 0
  let attrArr = []
  let reg = /(^[a-zA-Z\@\:]+)=(\'|\")([\w\s]+)(\'|\")\s?/
  while (index < attrString.length) {
    let subStr = attrString.substring(index)
    if (reg.test(subStr)) {
      let tem = subStr.match(reg) 
      console.log('subStr',attrString,'>>', tem);
      attrArr.push({
        key: tem[1],
        value: tem[3].split(/\s/)
      })
      index += tem[0].length
    } else {
       index++
    }
   
  }
  return attrArr
}