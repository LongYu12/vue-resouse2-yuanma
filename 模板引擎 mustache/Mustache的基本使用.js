import Mustache from 'mustache'

const app = document.getElementById('app')
console.log(app);
const data = {
  arr: [
    { name: 'Alex', sex: '男', age: 18 , hobies:['打篮球', '羽毛球']},
    { name: 'Jack', sex: '男', age: 20 , hobies:['打篮球', '羽毛球']},
    { name: '青峰', sex: '男', age: 19 , hobies:['打篮球', '羽毛球']},
  ],
  classes: '五年级一班',
  isShow: true
}

let templateStr = `
                <div>
                <h1>{{classes}}</h1>
                
                  {{#arr}}
                    <li>
                      <div class="hd">{{name}}基本信息</div>
                      <div class="bd">
                        <ul>姓名：{{name}}</ul>
                        <ul>性别: {{sex}}</ul>
                        <ul>年龄：{{age}}</ul>
                        {{# hobies}}
                          <p>爱好： {{.}}</p>
                        {{/ hobies}}
                      </div>
                    </li>
                  {{/arr}}
                  <h3>是否式特级班级：{{#isShow}} 是 {{/isShow}}</h3>
                  
                </div>

`
let dom = Mustache.render(templateStr, data)
app.innerHTML = dom