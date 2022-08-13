import { parse } from './src/lib/parse'



let template = `
  <div @click="nfneisfesf">
    <input/>
    <h1 class="nn w_e333w" id="myHeade">这不是魔法</h1>
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
    </ul>
  </div>
`
console.log(parse(template));