
import Dep from './Dep'

import {ob} from './ob'
/*
* @params objName
* @params Attributes
* @params val
*/
 
export default function defineReactive(objName, Attributes, val = '') {
	// const dep = new Dep()
	const dep = objName.__ob__.dep
	let value

	// arguments是一个数组，她包含该函数的接受到的所有参数
	if (arguments.length == 2) {
		value = objName[Attributes]
	} else {
		value = val
	}

	let childrenObj = ob(value)

	Object.defineProperty(objName, Attributes, {
		// value:'124',
		// getrer
		// 是否可以被枚举
		enumerable: true,
		// 可以被配置
		configurable: true,
		get() {
			console.log('你试图访问',objName, Attributes, Dep.target)
			// 如果现在处于依赖收集阶段
			if(Dep.target){
				dep.depend()
				if (childrenObj) {
					childrenObj.dep.depend()
				}
			}
			return value
		},
		// setter
		set(newValue) {
			if (newValue == value) return
			value = newValue
			// 每个都要ob一下，看能否加上监听方法Observer
		  childrenObj = ob(newValue)
			// 新值加ob
			console.log('你试图改变', childrenObj, newValue)
			// 发布订阅模式
			dep.notify()
		}
	})
}