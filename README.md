## 🚀 Sino Ztree

![avatar](https://github.com/Mikasa33/sino-ztree/blob/master/screenshot.png)

- [Github 仓库](https://github.com/Mikasa33/sino-ztree)
- [Coding 仓库](https://dev.tencent.com/u/mikasa33/p/sino-ztree/git)

### 💎 简介

`Sino Ztree` 是一个轻量级的部门、用户选择树。

### ✨ 特性

- 基于 zTree 实现
- 使用 Grunt 构建
- 完善的中文文档和示例
- 友好的交互语言和视觉风格

### 🌐 支持环境

- 现代浏览器
- 如需支持 IE ，请使用 babel 处理编译后的代码

### ⌨️ 本地开发

``` bash
git clone https://git.dev.tencent.com/mikasa33/sino-ztree.git
cd sino-ztree

npm install grunt-cli -g # 全局安装 grunt 插件
npm install sass -g # 全局安装 sass 插件
npm install babel-cli -g # 全局安装 babel 插件
npm install # 安装依赖的插件

grunt # 编译 js 和 css 文件

babel dest/js/sino-ztree.js -o dest/js/sino-ztree.ie.js  # babel 处理
babel dest/js/sino-ztree.min.js -o dest/js/sino-ztree.min.ie.js  # babel 处理
```

### 📦 安装

``` html
<!-- 引入样式 -->
<link rel="stylesheet" href="./assets/zTree_v3-master/css/zTreeStyle/zTreeStyle.css" />
<link rel="stylesheet" href="./dest/css/sino-ztree.css" />

<!-- 引入树结构 -->
<script type="text/javascript" src="./assets/jquery/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="./assets/zTree_v3-master/js/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="./dest/js/sino-ztree.min.js"></script>
```

### 💝 示例

``` html
<!-- 部门 id -->
<input id="deptId" type="hidden">
<!-- 部门名称 -->
<input id="deptName" type="text" readonly placeholder="请选择部门">
<!-- 触发选择事件按钮 -->
<button type="button" onclick="chooseDept()">选择</button>
```

``` javascript
function chooseDept() {
  sinoZtree.publicEvt.init({
    model: {
      title: '选择部门' // 弹窗标题
    },
    result: {
      id: 'deptId', // 树节点中的属性 id ，页面回写的标签 id 属性 deptId
      name: 'deptName' // 树节点中的属性 name ，页面回写的标签 id 属性 deptName
    },
    config: {
      url: '/sino-ztree/json/dept.json',
      type: 'dept', // 类型
      rootId: '001', // 顶级部门 id ，只显示当前部门下的数据
      max: 0, // 最大可选数，0 为无限制
      showLeader: false, // 是否显示领导部门
      showCompany: false, // 是否显示公司下属子公司
      showParent: false, // 是否显示公司 / 部门所属父公司
      hideNodes: '财务部,其他' // 隐藏节点名称模糊匹配的节点，节点名称间使用 `,` 分割
    }
  }, function (data) { // 回调函数，如果存在此回调函数，将不会回写属性值
    console.log(data); // data 对象包含所有回显属性值
  });
}
```

更多示例请下载项目访问根目录下的 `index.html` 页面查看

### ⚙️ 选择树 API

`sinoZtree.publicEvt.init(cfs)` 函数接收一个 `cfs` 对象，该对象中包含 4 个属性：`model` , `result` , `config` , `callback`

#### 属性说明

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| model | 弹窗配置信息 | Object | - | 1.0.0 |
| result | 页面回写的标签 id 属性信息 | Object | - | 1.0.0 |
| config | 筛选条件信息 | `Object` | - | 1.0.0 |
| callback | 回调函数，如果存在此回调函数，将不会回写属性值，`data` 对象包含所有回显属性值 | `function(data)` | - | 1.0.0 |

#### model

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| title | 弹窗标题 | String | `选择部门` 或 `选择用户` | 1.0.0 |

#### result

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| $$ | 适用于扩展属性信息情况。 `key($$)`: 树节点中存在的属性（获取该属性值时使用），`value`: 回写标签 id 属性（必须是唯一的）。例：`cfs.result.name: 'deptName'` | String | - | 1.0.0 |

#### config

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| url | 数据源接口地址（必填），详细内容请查看数据源 API | `String` | - | 1.0.0 |
| type | 类型（必填），可选值为 `dept` , `user` | `String` | - | 1.0.0 |
| rootId | 顶级部门 id ，只显示当前部门下的数据 | `String` | sinoZtree.rootId | 1.0.0 |
| max | 最大可选数，`0` 为无限制，最大可选数为 500 | `Number` | `0` | 1.0.0 |
| showLeader | 是否显示领导部门 | `Boolean` | `true` | 1.0.0 |
| showCompany | 是否显示公司下属子公司，`rootId = sinoZtree.rootId` 时不生效 | `Boolean` | `true` | 1.0.0 |
| showParent | 是否显示公司 / 部门所属父公司 | `Boolean` | `false` | 1.0.0 |
| hideNodes | 隐藏节点名称模糊匹配的节点，节点名称间使用 `,` 分割 | `String` | - | 1.0.0 |

#### callback

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| callback | 回调函数，如果存在此回调函数，将不会回写属性值，`data` 对象包含所有回写属性值 | `function(data)` | - | 1.0.0 |

### 🔨 数据源 API

数据应为一个 JSON 数组，每个 JSON 对象包含属性如下

> 添加更多节点属性时，请注意不要与 zTree 使用的属性相同即可，可随意设定。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|------|------|
| id | 节点数据唯一标识（必填） | `String` | - | 1.0.0 |
| parentId | 父级节点数据唯一标识（必填） | `String` | - | 1.0.0 |
| fromUnit | 用于区分公司和部门（必填），可选值 `0` （公司）, `1` （部门） | `String` | - | 1.0.0 |
| name | 节点数据名称（必填） | `String` | - | 1.0.0 |
| iconSkin | 节点个性图标，可选值为 `root`, `depts`, `dept`, `users`, `user` | `String` | - | 1.0.0 |
| isZhc | 部门特殊标识，可选值 `3` （领导部门） | `String` | - | 1.0.0 |
| children | 子节点数据，`config.type = dept` 时，若无子节点可不返回 `children`。`config.type = user` 时，部门节点若无用户必须返回 `[]` | `Array` | - | 1.0.0 |

### 🔗 链接

- [zTree 官网](http://www.treejs.cn)
