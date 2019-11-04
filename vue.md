

# 不想成为规范的书写规范
## 1.合作开发注意事项
```
1.提交之前先拉取别人代码，解决冲突需逐行分析，无法解决及时求助。
2.公共组件，mixin增加内容不能引起别人页面报错。如需修改，请协商。
3.多写有利于二次开发的代码。
4.自己任务尽心尽责。
```
## 2.命名规则
为确保统一性，组件命名统一采用驼峰命名。
文件夹、组件名需遵循以下规则：
```
1.有意义的名词、简短、具有可读性
2.以小写开头，采用驼峰命名
3.文件夹命名主要以不同模块划分
4.避免出现无意义的数字
5.组件避免一个单词，多个单词组成
```
以个人信息模块举例
```
--user               ----文件夹名称
----index.vue        ----模块主页
----setUsername.vue  ----模块子页面
----setPhoto.vue     ----模块子页面
```
## 3.按模块划分
项目一般会划分成几个模块。
components、router、store 目录下按模块划分文件夹，避免不同模块内容写在同一个目录下

## 4.注释规范

以下情况，务必添加注释
```
1.公共组件,mixin使用说明，最上方写明
2.各组件中重要函数或者类说明
3.复杂的业务逻辑处理说明
4.特殊情况的代码处理说明,对于代码中特殊用途的变量、存在临界值、函数中使用的hack、使用了某种算法或思路等需要进行注释描述
```
## 5.编码规范

[请使用ES6编码，请使用ES6编码，请使用ES6编码](http://es6.ruanyifeng.com/)
提高效率，提升可读性
简单举例：
```
1.定义变量使用let ，定义常量使用const，别用var
2.function(){}   写成   ()=>{}
3.使用export ，import 模块化
```
## 6.vue 方法放置顺序（仅供参考）
1.data
2.components
3.mixins
4.props
5.methods
6.watch
7.computed
8.mounted
9.created
10.router的一些方法

## 7.props
props 尽量详细，数据类型是必要的
例子
```props:{
 status: String
}
```
```
props: {
  status: {
    type: String,
    required: true,
    validator: function (value) {
      return [
        'syncing',
        'synced',
        'version-conflict',
        'error'
      ].indexOf(value) !== -1
    }
  }
}
```
## 8.为v-for设置键值
总是用 key 配合 v-for。
确保key唯一性

## 9.避免v-if和v-for一起用
当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级

## 10.为组件样式设置作用域

``scoped`` 可能不是必须的，可以有其他的约定

## 11.私有属性名
在插件、混入等扩展中始终为自定义的私有属性使用 $_ 前缀。并附带一个命名空间以回避和其它作者的冲突 (比如 ``$_yourPluginName_``)。


## 12.基础组件名
应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。
```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

## 13.单例组件名
只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。
这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。
```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

## 14.紧密耦合的组件名
和父组件紧密耦合的子组件应该以父组件名作为前缀命名。

如果一个组件只在某个父组件的场景下有意义，这层关系应该体现在其名字上。因为编辑器通常会按字母顺序组织文件，所以这样做可以把相关联的文件排在一起。
```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

## 15.组件名中的单词顺序
组件名应该以高级别的 (通常是一般化描述的) 单词开头，以描述性的修饰词结尾。
```
components/
   |- SearchButtonClear.vue
   |- SearchButtonRun.vue
   |- SearchInputQuery.vue
   |- SearchInputExcludeGlob.vue
   |- SettingsCheckboxTerms.vue
   |- SettingsCheckboxLaunchOnStartup.vue

```
## 16.多个特性的元素
多个特性的元素应该分多行撰写，每个特性一行。
```
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

# vue 快速开发指南不指北
## 1.安装[node](https://nodejs.org/zh-cn/)
 推荐使用nvm安装，用nvm管理node

## 2.安装vue[脚手架](!https://github.com/vuejs/vue-cli/tree/v2#vue-cli--)
```
  npm install -g vue-cli  或者  yarn global add vue-cli （需先安装yarn）
```
## 3.用脚手架创建项目
```
vue init webpack <project-name>
```
建立必要文件夹
大致是这样的
```
   ├── index.html                      入口页面
   ├── build                           构建脚本目录
   │   ├── build.js                        生产环境构建脚本
   │   ├── utils.js                        构建相关工具方法
   │   ├── webpack.base.conf.js            wabpack基础配置
   │   ├── webpack.dev.conf.js             wabpack开发环境配置
   │   └── webpack.prod.conf.js            wabpack生产环境配置
   ├── config                          项目配置
   │   ├── dev.env.js                      开发环境变量
   │   ├── index.js                        项目配置文件
   │   ├── prod.env.js                     生产环境变量
   │   └── test.env.js                     测试环境变量
   ├── package.json                    npm包配置文件
   ├── src                             项目源码目录
   │   ├── main.js                         入口js文件
   │   ├── App.vue                         根组件
   │   ├── components                      公共组件目录
   │   │   └── title.vue
   │   ├── mixins                          混入
   │   ├── assets                          资源目录，这里的资源会被webpack构建
   │   │   ├── css                         公共样式文件目录
   │   │   ├── js                          公共js文件目录
   │   │   └── img                      图片存放目录
   │   ├── router                         前端路由
   │   │   └── index.js
   │   ├── store                           应用级数据（state）
   │   │   └── index.js
   │   └── views                            页面目录
   │       ├── index.vue
   │       └── notFound.vue
   ├── static                          纯静态资源，不会被webpack构建。
   └── test                            测试文件目录（unit&e2e）
       └── unit                            单元测试
           ├── index.js                        入口脚本
           ├── karma.conf.js                   karma配置文件
           └── specs                           单测case目录
               └── Hello.spec.js

```
注意 views,router,store 需按模块划分文件夹
## 4.安装必要的包
```
npm install axios --save
```
## 5.将项目跑起来
```
npm run dev
```

## 6.修改接口地址，跨域操作

config 目录下 找到 proxyTable 添加

```
 '/api': {
        target:'http://172.**.**.**:8080',   //后端接口地址
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '/'
        }
```
main.js
```
import axios from 'axios'
axios.defaults.baseURL = `/api/${这里可以加公共部分}`; //   ！！！需要配置线上路径

```
## 7.添加favicon.ico

1.index.html 添加
```
 <link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
```
2.在build目录下 webpack.dev.conf.js 找到 HtmlWebpackPlugin 添加 favicon: path.resolve('favicon.ico')
3.在build目录下 webpack.dev.prod.js 找到 HtmlWebpackPlugin 添加 favicon: path.resolve('favicon.ico')

## 8.import ** from '*************' ，缩短 '' 中内容
在build目录下 webpack.dev.conf.js 找到 alias 添加
```
 '@': resolve('src'),
 '$img':'@/assets/img',
```
## 9.axios

this.$get(this.$api.api,{}).then(res=>{console.log(res)})

# css简易规则
## 1.命名
1.文件命名
重置样式 ``reset.css``
公共样式 ``public.css||basic.css``
单独样式文件 ``组件名.css``
2.样式名 驼峰命名
3.为避免冲突，不要在私有css中写单个单词的样式名

