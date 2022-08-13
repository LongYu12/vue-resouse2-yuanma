import templateEngine from './src/lib/templateEngine'


let str = ` <div>
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
  
</div>`
const data = {
  arr: [
    {
      name:'你好',
      age: 10,
      sex: '女',
      hobies: ['我','你']
    },
    {
      name:'你好',
      age: 15,
      sex: '女',
      hobies: ['我','你']
    }
  ],
  classes: '八级',
  isShow: true
}
templateEngine(str, data)