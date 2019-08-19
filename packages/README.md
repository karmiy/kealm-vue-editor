# Markdown编辑器 - Vue

## 说明

一款基于Vue、CodeMirror、Marked所开发的Markdown编辑器

## 目录

- <a href="#1">支持环境</a>
- <a href="#2">文档</a>
- <a href="#3">安装</a>
- <a href="#4">使用</a>
- <a href="#5">更新日志</a>

<h2 id="1">支持环境</h2>

- Vue ^2.6.6
- 支持浏览器：Chrome、Firefox、Safari、Opera、IE9及以上

<h2 id="2">文档</h2>

构建中

<h2 id="3">安装</h2>

    npm install --save @kealm/vue-editor
    
<h2 id="4">使用</h2>

    import KealmEditor from '@kealm/vue-editor'
    import '@kealm/vue-editor/styles/index.min.css'
    Vue.use(KealmEditor);
    
    在.vue中
    <km-editor />
    

<h2 id="5">更新日志</h2>

### 2019-08-19

#### v0.2.5

- 修复F9快捷键报错BUG、F10快捷键背景BUG

### 2019-08-14

#### v0.1.5

- 测试版，调整中

### 2019-08-14

#### v0.1.4

- 修复代码块无法复制BUG

### 2019-08-14

#### v0.1.0

- 发布测试中
    

