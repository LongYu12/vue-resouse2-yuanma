
import Vue from "./src/lib/Vue";

let vm = new Vue({
  el: '#app',
  data: {
    h: {
      name: '佳佳'
    },
    b: 2
  },
  watch: {
    h(newVal, oldVal) {
      console.log('家栋鸭屎', newVal, oldVal);
    }
  }
})
// console.log('vm', vm);
// vm.h.name
// vm.h.name = '打'
setTimeout(() => {
  vm.b++
  vm.h.name = '家栋'
}, 2000)

// setInterval(()=>{
//   vm.b++
// }, 3000)
window.Vue = Vue