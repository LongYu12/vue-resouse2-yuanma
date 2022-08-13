 
import {Vue} from './src/lib/Vue.js'

 let ob = {
  name:'我不是家栋',
  age: 18,
  per: {
    gender: 0
  }
}
let vm =  new Vue({
  data: {
    ob,
    wo: [
      '第一个',
      '钩子'
    ]
  }
})
vm.$watch('ob.per.gender', function(data){
  // alert(data)
  // console.log('我想sssssssssssss班', this, data);
})
// console.log('Vuessss',vm._data.ob);
// vm.ob.name = '急急急即将'
vm.ob.per.gender = 1
console.log(vm.ob);
// setInterval(()=>{
//   ob.age++
//   console.log(ob);
// }, 1000)
// console.log('Vue', vm);
//  vm.$watch('wo.1', function(data){
//   alert(data)
//   console.log('我想sssssssssssss班', this, data);
// })
// console.log(vm._data.wo[1]);
// vm._data.wo[1] = 'luo地'
// vm._data.wo.push()