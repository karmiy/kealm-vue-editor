(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{541:function(t,e,n){},542:function(t,e,n){"use strict";n.d(e,"j",function(){return i}),n.d(e,"o",function(){return l}),n.d(e,"a",function(){return r}),n.d(e,"p",function(){return o}),n.d(e,"m",function(){return a}),n.d(e,"g",function(){return s}),n.d(e,"b",function(){return d}),n.d(e,"l",function(){return c}),n.d(e,"k",function(){return p}),n.d(e,"h",function(){return u}),n.d(e,"c",function(){return m}),n.d(e,"e",function(){return f}),n.d(e,"d",function(){return h}),n.d(e,"i",function(){return v}),n.d(e,"q",function(){return y}),n.d(e,"f",function(){return k}),n.d(e,"n",function(){return g});var i="    npm install --save @kealm/vue-editor",l="    import  KealmEditor  from  '@kealm/vue-editor';\n    import  '@kealm/vue-editor/styles/index.min.css'\n    Vue.use(KealmEditor);\n",r='    <template>\n            <km-editor \n                    :defaultValue="defaultValue"\n                    toolbarClass="edit-toolbar" \n                    contentClass="edit-container" />\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    defaultValue: \'## Quick insert\\nTry deleting the "/" symbol below and retyping "/"\\n\\n/\',\n                            }\n                    },\n            }\n    <\/script>\n    <style>\n            .edit-toolbar {\n                height: 60px;\n            }\n            .edit-container {\n                height: 350px;\n            }\n    </style>\n',o='    <template>\n            <div>\n                    <sl-textarea row="4" v-model="value"></sl-textarea>\n                    <km-editor v-model="value" />\n            </div>\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    valueAreaSet: `## v-model\\nTry changing values in the editor and text box, and you\'ll see data linkage`,\n                            }\n                    },\n            }\n    <\/script>\n',a='    <template>\n            <div>\n                    <sl-textarea row="4" v-model="valueAreaSet"></sl-textarea>\n                    <sl-button class="detail-box-button" type="primary" @click="setMarkdown">点击赋值</sl-button>\n                    <km-editor ref="editor-set" />\n            </div>\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    valueAreaSet: \'## Set\\nThe content will be synchronized to the editor\',\n                            }\n                    },\n                    methods: {\n                            setMarkdown() {\n                                    this.$refs[\'editor-set\'].setMarkdown(this.valueAreaSet);\n                            }\n                    },\n            }\n    <\/script>\n',s='    <template>\n            <div>\n                    <sl-textarea row="4" v-model="valueAreaGet"></sl-textarea>\n                    <sl-button type="primary" @click="getMarkdown">点击取值</sl-button>\n                    <km-editor \n                            ref="editor-get" \n                            :defaultValue="\'## Get\\nClick the button to assign the editor text to the text field\'" />\n            </div>\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    valueAreaGet: \'\',\n                            }\n                    },\n                    methods: {\n                            getMarkdown() {\n                                    this.valueAreaGet = this.$refs[\'editor-get\'].getMarkdown();\n                            }\n                    }\n            }\n    <\/script>\n',d="    <template>\n            <km-editor :codeMirrorOptions=\"codeMirrorOptions\" />\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    codeMirrorOptions: Object.freeze({value: '## CodeMirror defaultValue\\nFixed initial defaults'}),\n                            }\n                    },\n            }\n    <\/script>\n",c='    <template>\n            <km-editor \n                    :markedOptions="markedOptions" \n                    :defaultValue="\'## Marked Breaks\\nYou need to insert an blank line to wrap the line\\n\\nOkay, so I\\\'ve inserted a blank line\'" />\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    markedOptions: Object.freeze({breaks: false}),\n                            }\n                    },\n            }\n    <\/script>\n',p="    <template>\n            <km-editor \n                    :markdownPipe=\"markdownPipe\"\n                    :defaultValue=\"'Now whatever you type in, it always starts with \\'Markdown Pipe\\''\"/>\n    </template>\n    <script>\n            export default {\n                    methods: {\n                            markdownPipe(md) {\n                                    return `## Markdown Pipe\\n${md}`;\n                            },\n                    },\n            }\n    <\/script>\n",u="    <template>\n            <km-editor \n                    :htmlPipe=\"htmlPipe\" \n                    :defaultValue=\"'Now whatever you type in, it always starts with \\'HTML Pipe\\''\" />\n    </template>\n    <script>\n            export default {\n                    methods: {\n                            htmlPipe(html) {\n                                            return `<h2>HTML Pipe</h2>${html}`;\n                            },\n                    },\n            }\n    <\/script>\n",m='    <template>\n            <km-editor \n                    prevMarkedString="The original text" \n                    nextMarkedString="The current text" \n                    :defaultValue="\'## Diff\\nClick the fourth button on the left of the toolbar to view the changes\'" />\n    </template>\n',f="    <template>\n            <km-editor\n                    :toolbarDropdownPlugin=\"toolbarDropdownPlugin\"\n                    :defaultValue=\"'## Embed Dropdown Groups\\nEmbed local video in the dropdown group'\" />\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    toolbarDropdownPlugin: Object.freeze([{name: '本地视频', handler: () => {}}]),\n                            }\n                    },\n            }\n    <\/script>\n",h='    <template>\n            <km-editor :defaultValue="\'## Custom Toolbars\\nAllows insertion of function items in 4 directions\'">\n                    <template #tools-left-before="{isEditView}">\n                            <sl-button v-if="!isEditView">\n                                左侧前置0号\n                            </sl-button>\n                            <sl-button v-if="isEditView">\n                                左侧前置1号\n                            </sl-button>\n                    </template>\n                    <template #tools-left-after="{isEditView}">\n                            <sl-button v-if="isEditView" style="margin-left: 20px">\n                                左侧后置2号\n                            </sl-button>\n                    </template>\n                    <template #tools-right-before="{isEditView}">\n                            <sl-button v-if="isEditView">\n                                右侧前置3号\n                            </sl-button>\n                    </template>\n                    <template #tools-right-after="{isEditView}">\n                            <sl-button v-if="isEditView">\n                                右侧后置4号\n                            </sl-button>\n                    </template>\n            </km-editor>\n    </template>\n',v='    <template>\n            <km-editor \n                    :defaultValue="\'## File limit\\nLimit file uploads as required\'"\n                    :imgSize="10" \n                    imgUnit="KB" \n                    :imgType="imgType" />\n    </template>\n    <script>\n            export default {\n                    data() {\n                            return {\n                                    imgType: Object.freeze({svg: \'image/svg+xml\'}),\n                            }\n                    },\n            }\n    <\/script>\n',y='    <template>\n            <km-editor\n                    :isVirtualProgress="true"\n                    :virtualProgressTime="5000"\n                    :closeDelay="1000"\n                    :defaultValue="\'## Virtual Progress\\nTry uploading an image and a virtual progress bar will appear\'" />\n    </template>\n',k='    <template>\n            <div>\n                    <sl-radio-group v-model="uploadStatus">\n                            <sl-radio :value="true">上传成功</sl-radio>\n                            <sl-radio :value="false">上传失败</sl-radio>\n                    </sl-radio-group>\n                    <km-editor\n                            :imgUpload="imgUpload"\n                            :defaultValue="\'## File Upload\\nTry toggling upload status and then upload image\'" />\n            </div>\n    </template>\n    <script>\n            class VirtualUpload {\n                    constructor(props) {\n                            Object.assign(this, {\n                                    file: null,\n                                    duration: 2000,\n                                    error: false,\n                                    abortTime: 1000,\n                                    onprogress: () => {},\n                            }, props);\n                    }\n                    virtualProgress(startTime, resolve, reject) {\n                            requestAnimationFrame(() => {\n                                    const currentDuration = Date.now() - startTime;\n                                    const rate = currentDuration / this.duration;\n                                    this.onprogress && this.onprogress(Math.floor(Math.min(rate, 1) * 100));\n                                    if(this.error && currentDuration >= this.abortTime) {\n                                            reject(\'上传失败\');\n                                            return;\n                                    }\n                                    rate < 1 ? this.virtualProgress(startTime, resolve, reject) : resolve(window.URL.createObjectURL(this.file));\n                            })\n                    }\n                    start() {\n                            return new Promise((resolve, reject) => {\n                                    this.virtualProgress(Date.now(), resolve, reject);\n                            })\n                    }\n            }\n            export default {\n                    data() {\n                            return {\n                                    uploadStatus: true,\n                            }\n                    },\n                    methods: {\n                            imgUpload(file, setProgress) {\n                                    const upload =  new VirtualUpload({\n                                            file,\n                                            error: !this.uploadStatus,\n                                            onprogress: setProgress,\n                                    })\n                                    return upload.start();\n                            },\n                    }\n            }\n    <\/script>\n',g="    <template>\n            <km-editor v-model=\"nodeText\" @save=\"save\">\n                    <template #sidebar=\"{isEditView}\" >\n                            <div class=\"sidebar scroll-bar\">\n                                    <sl-tree\n                                            :expandedKeys.sync=\"expandedKeys\"\n                                            :treeData=\"treeData\"\n                                            :selectedKeys.sync=\"selectedKeys\">\n                                            <template #title=\"node\">\n                                                    <span class=\"title-wrapper\" :class=\"{isFolder: node.type === 'folder'}\" @click=\"selectTreeNode(node)\">\n                                                            {{node.title}}\n                                                    </span>\n                                            </template>\n                                    </sl-tree>\n                            </div>\n                    </template>\n            </km-editor>\n    </template>\n    <script>\n            const treeData = [\n                    {\n                            title: 'doc',\n                            key: '1',\n                            type: 'folder',\n                            scopedSlots: {title: 'title'},\n                            children: [\n                                    {\n                                            title: 'props',\n                                            key: '10',\n                                            type: 'folder',\n                                            scopedSlots: {title: 'title'},\n                                            children: [\n                                                    { title: 'defaultValue', key: '99', type: 'article', scopedSlots: {title: 'title'}, content: '## defaultValue' },\n                                                    { title: 'value', key: '100', type: 'article', scopedSlots: {title: 'title'}, content: '## value' },\n                                                    { title: 'codeMirrorOptions', key: '101', type: 'article', scopedSlots: {title: 'title'}, content: '## codeMirrorOptions' },\n                                                    { title: 'markedOptions', key: '102', type: 'article', scopedSlots: {title: 'title'}, content: '## markedOptions' },\n                                                    { title: 'markdownPipe', key: '103', type: 'article', scopedSlots: {title: 'title'}, content: '## markdownPipe' },\n                                                    { title: 'htmlPipe', key: '104', type: 'article', scopedSlots: {title: 'title'}, content: '## htmlPipe' },\n                                                    { title: 'toolbarClass', key: '105', type: 'article', scopedSlots: {title: 'title'}, content: '## toolbarClass' },\n                                                    { title: 'contentClass', key: '106', type: 'article', scopedSlots: {title: 'title'}, content: '## contentClass' },\n                                                    { title: 'prevMarkedString', key: '107', type: 'article', scopedSlots: {title: 'title'}, content: '## prevMarkedString' },\n                                                    { title: 'nextMarkedString', key: '108', type: 'article', scopedSlots: {title: 'title'}, content: '## nextMarkedString' },\n                                                    { title: 'imgSize', key: '109', type: 'article', scopedSlots: {title: 'title'}, content: '## imgSize' },\n                                                    { title: 'imgType', key: '110', type: 'article', scopedSlots: {title: 'title'}, content: '## imgType' },\n                                                    { title: 'imgUnit', key: '111', type: 'article', scopedSlots: {title: 'title'}, content: '## imgUnit' },\n                                                    { title: 'affixSize', key: '112', type: 'article', scopedSlots: {title: 'title'}, content: '## affixSize' },\n                                                    { title: 'affixType', key: '113', type: 'article', scopedSlots: {title: 'title'}, content: '## affixType' },\n                                                    { title: 'affixUnit', key: '114', type: 'article', scopedSlots: {title: 'title'}, content: '## affixUnit' },\n                                                    { title: 'isVirtualProgress', key: '115', type: 'article', scopedSlots: {title: 'title'}, content: '## isVirtualProgress' },\n                                                    { title: 'virtualProgressTime', key: '116', type: 'article', scopedSlots: {title: 'title'}, content: '## virtualProgressTime' },\n                                                    { title: 'closeDelay', key: '117', type: 'article', scopedSlots: {title: 'title'}, content: '## closeDelay' },\n                                                    { title: 'setMarkdown', key: '118', type: 'article', scopedSlots: {title: 'title'}, content: '## setMarkdown' },\n                                                    { title: 'getMarkdown', key: '119', type: 'article', scopedSlots: {title: 'title'}, content: '## getMarkdown' },\n                                                    { title: 'toolbarDropdownPlugin', key: '120', type: 'article', scopedSlots: {title: 'title'}, content: '## toolbarDropdownPlugin' },\n                                                    { title: 'imgUpload', key: '121', type: 'article', scopedSlots: {title: 'title'}, content: '## imgUpload' },\n                                                    { title: 'affixUpload', key: '122', type: 'article', scopedSlots: {title: 'title'}, content: '## affixUpload' },\n                                            ],\n                                    },\n                                    {\n                                            title: 'events',\n                                            key: '20',\n                                            type: 'folder',\n                                            scopedSlots: {title: 'title'},\n                                            children: [\n                                                    { title: 'change', key: '200', type: 'article', scopedSlots: {title: 'title'}, content: '## change' },\n                                                    { title: 'save', key: '201', type: 'article', scopedSlots: {title: 'title'}, content: '## save' },\n                                            ],\n                                    },\n                            ],\n                    },\n            ]\n            export default {\n                    data() {\n                            return {\n                                    treeData,\n                                    expandedKeys: [],\n                                    selectedKeys: [],\n                                    selectNode: null,\n                                    nodeText: '',\n                            }\n                    },\n                    created() {\n                            this.selectNode = this.treeData[0].children[0].children[0];\n                            this.expandedKeys = [this.selectNode.key];\n                            this.selectedKeys = [this.selectNode.key];\n                            this.nodeText = this.selectNode.content;\n                    },\n                    methods: {\n                            selectTreeNode(node) {\n                                    if(node.type === 'folder') return;\n                                    this.nodeText !== this.selectNode.content ?\n                                            this.$confirm({\n                                                    title: '文档尚未保存，是否确认要离开该页面?',\n                                                    content: '点击确认后文档编辑内容将丢失',\n                                                    onOk: () => {\n                                                            this.selectNode = node;\n                                                            this.nodeText = node.content;\n                                                    },\n                                                    okText: '确认',\n                                                    cancelText: '取消',\n                                                    onCancel: () => {this.selectedKeys = [this.selectNode.key]},\n                                            })\n                                            :\n                                            (this.selectNode = node, this.nodeText = node.content);\n                            },\n                            save(text) {\n                                    this.selectNode.content = text;\n                                    this.$message['success'](`保存成功`, {\n                                            pos: 'topCenter',\n                                    });\n                            },\n                    }\n            }\n    <\/script>\n"},543:function(t,e,n){"use strict";var i=n(541);n.n(i).a},544:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.visibleTitle?n("p",{staticClass:"code-left-line"},[t._v(t._s(t.title))]):t._e(),t._v(" "),t.expand?t._e():n("sl-collapse",[n("sl-collapse-panel",{attrs:{header:t.header,codeBox:t.trueVal,active:t.falseVal}},[n("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs",value:t.code,expression:"code"}]},[n("code",{staticClass:"xml"})])])],1),t._v(" "),t.expand?n("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs",value:t.code,expression:"code"}]},[n("code",{staticClass:"xml"})]):t._e()],1)};i._withStripped=!0;var l={name:"SearchCode",props:{title:{type:String,default:"Code"},header:{default:"展开查看Code"},code:{type:String},visibleTitle:{type:Boolean,default:!0},expand:{type:Boolean}},data:function(){return{trueVal:!0,falseVal:!1}},watch:{activeKey:function(t){console.log(t)}}},r=(n(543),n(40)),o=Object(r.a)(l,i,[],!1,null,"4d7735f9",null);o.options.__file="src/components/common/searchCode.vue";e.a=o.exports},584:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page-box"},[n("div",{staticClass:"detail-box",attrs:{id:"contrast-diff"}},[n("h2",[t._v("对比变更")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),n("p",{staticClass:"code-left-line"},[t._v("Demo")]),t._v(" "),n("km-editor",{attrs:{prevMarkedString:"The original text",nextMarkedString:"The current text",defaultValue:"## Diff\nClick the fourth button on the left of the toolbar to view the changes",contentClass:"edit-container"}}),t._v(" "),n("search-code",{attrs:{code:t.CodeContrastDiff}})],1)])};i._withStripped=!0;var l=n(542),r={name:"ContrastDiffDoc",data:function(){return{CodeContrastDiff:l.c}},components:{SearchCode:n(544).a}},o=n(40),a=Object(o.a)(r,i,[function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("工具栏左侧的第4个按钮是markdown文本的对比变更，默认是对比 "),e("b",[this._v("初始文本")]),this._v(" 与 "),e("b",[this._v("当前文本")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[this._v("可以设置 "),e("b",[this._v("prevMarkedString")]),this._v(" 与 "),e("b",[this._v("nextMarkedString")]),this._v(" 固定对比文本内容(通常用于对比数据由后端提供)")])}],!1,null,null,null);a.options.__file="src/views/editor-doc/docs/contrast-diff.vue";e.default=a.exports}}]);