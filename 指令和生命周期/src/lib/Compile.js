import { Watcher } from '../other/Watcher'

/**
 * 编译模板
 */
export default class Compile {
  constructor(el, vue) {
    this.$vue = vue // Vue 实例
    this.$el = document.querySelector(el) // 挂载点
    if (this.$el) {// 如果传入挂载点
      let $fragment = this.node2Fragment(this.$el)
      this.compile($fragment)
      this.$el.appendChild($fragment)
    }
  }

  // 将节点转为 Fragment ，类似 mustache 中的 tokens， 实际上用的是 AST，这里是轻量级的
  node2Fragment(el) {
    // console.log(el);
    let fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragment.appendChild(child)
      // console.log('child', child);
    }
    // console.log(fragment);
    return fragment
  }

  // 编译
  compile(el) {
    // console.log('childNodes', el.childNodes);
    let childNodes = el.childNodes

    let reg = /\{\{(.*)\}\}/

    childNodes.forEach(node => {
      let text = node.textContent
      // console.log(node.nodeType);
      // nodeType 代表节点属于什么，比如1：Element，2：Attr，3：Text
      if (node.nodeType == 1) {
        this.compileElement(node)
      } else if (node.nodeType == 3 && reg.test(text)) {// 匹配到文本

        let value = this.compileText(node, text.match(reg)[1])

        node.textContent = text.replace(reg, value)

        new Watcher(this.$vue, text.match(reg)[1], val => {
          console.log('更新虚拟DOM', val);
          node.textContent = text.replace(reg, val)
        })
      }
    });
  }

  // 属性
  compileElement(node) {
    let nodeAttr = node.attributes;
    // console.log('nodeAttr',node.childNodes)
    // nodeAttr 是一个类数组对象，就是有数组的结构，但不拥有数组的方法
    // 类数组对象 变为 数组
    [].slice.call(nodeAttr).forEach(attr => {
      // 在这里分析指令
      let attrName = attr.name // 属性名
      let attrValue = attr.value // 属性值
      // v- 开头的指令
      /**
       * v-on / @ 事件
       * v-bind / : 属性
       * v-其他 自定义指令
       */
      // 看是不是指令
      console.log('=====', attr);
      let attrRegExp = /^(v-|:|@)/
      if (attrRegExp.test(attrName)) {
        let pre = attrName.match(attrRegExp)[0]
        let dir = attrName.substring(pre.length)
        console.log('属性', pre, dir, attrValue, node);
        switch (dir) {
          case 'model':
            let that = this
            node.oninput = function () {
              console.log(this.value);
              that.setVueVal(that.$vue, attrValue, this.value)
            }
            node.value = this.getVueVal(this.$vue, attrValue)
            new Watcher(this.$vue, attrValue, (newVal, oldVal) => {
              console.log('v-model', newVal, oldVal);
              node.value = this.getVueVal(this.$vue, attrValue)
              node.style.display = 'block'
            })
            break;
          case 'if':
            let val = this.getVueVal(this.$vue, attrValue)
            let show = val
            if (val == undefined) {
              show = attrValue == 'true'  
            }
            if (!show) {
              node.style.display = 'none'
            }
            new Watcher(this.$vue, attrValue, (newVal, oldVal) => {
              console.log('v-if', newVal, oldVal);
              if (newVal == 'false') {
                node.style.display = 'none'
              } else {
                node.style.display = 'block'
              }
            })
             
            break;

          default:
            break;
        }
      }
    })
    this.compile(node)
  }

  // 除了花括号的字段
  compileText(node, name) {
    console.log('我的', this.getVueVal(this.$vue, name));
    return this.getVueVal(this.$vue, name)
  }

  getVueVal(vue, exp) {
    let val = vue
    exp.split('.').forEach(key => {
      val = val[key]
      console.log(val, key);
    })
    return val
  }

  setVueVal(vue, exp, newVal) {
    let val = vue
    console.log(vue);
    exp =  exp.split('.')
    exp.forEach((key, index) => {
      if ((exp.length - 1) > index) {
        val = val[key]
        console.log('key', key);
      } else {
        val[key] = newVal
      }
    })
  }

}