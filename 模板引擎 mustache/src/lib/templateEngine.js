import renderTemplate from './renderTemplate'
import parseTemplelateTokens from './parseTemplelateTokens'

/**
 * 描述：模板渲染
 * @param {string} templateStr 模板字符串
 * @param {object} data 对象类型的数据
 */

export default function templateEngine(templateStr, data ) {
  document.body.innerHTML = renderTemplate(parseTemplelateTokens(templateStr), data)
}