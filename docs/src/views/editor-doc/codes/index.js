/* 安装 */
export const CodeInstall = `    npm install --save @kealm/vue-editor`;

/* 使用 */
export const CodeUse =
    `    import  KealmEditor  from  '@kealm/vue-editor';
    import  '@kealm/vue-editor/styles/index.min.css'
    Vue.use(KealmEditor);
`;

/* 基本用法 */
export const CodeBasic =
    `    <template>
            <km-editor 
                    :defaultValue="defaultValue"
                    toolbarClass="edit-toolbar" 
                    contentClass="edit-container" />
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    defaultValue: '## Quick insert\\nTry deleting the "/" symbol below and retyping "/"\\n\\n/',
                            }
                    },
            }
    </script>
    <style>
            .edit-toolbar {
                height: 60px;
            }
            .edit-container {
                height: 350px;
            }
    </style>
`;

/* 双向绑定 */
export const CodeVModel =
    `    <template>
            <div>
                    <sl-textarea row="4" v-model="value"></sl-textarea>
                    <km-editor v-model="value" />
            </div>
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    valueAreaSet: \`## v-model\\nTry changing values in the editor and text box, and you'll see data linkage\`,
                            }
                    },
            }
    </script>
`;

/* 手动赋值 */
export const CodeSetMarkdown =
    `    <template>
            <div>
                    <sl-textarea row="4" v-model="valueAreaSet"></sl-textarea>
                    <sl-button class="detail-box-button" type="primary" @click="setMarkdown">点击赋值</sl-button>
                    <km-editor ref="editor-set" />
            </div>
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    valueAreaSet: '## Set\\nThe content will be synchronized to the editor',
                            }
                    },
                    methods: {
                            setMarkdown() {
                                    this.$refs['editor-set'].setMarkdown(this.valueAreaSet);
                            }
                    },
            }
    </script>
`;

/* 手动取值 */
export const CodeGetMarkdown =
    `    <template>
            <div>
                    <sl-textarea row="4" v-model="valueAreaGet"></sl-textarea>
                    <sl-button type="primary" @click="getMarkdown">点击取值</sl-button>
                    <km-editor 
                            ref="editor-get" 
                            :defaultValue="'## Get\\nClick the button to assign the editor text to the text field'" />
            </div>
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    valueAreaGet: '',
                            }
                    },
                    methods: {
                            getMarkdown() {
                                    this.valueAreaGet = this.$refs['editor-get'].getMarkdown();
                            }
                    }
            }
    </script>
`;

/* CodeMirror配置 */
export const CodeCodeMirrorOption =
    `    <template>
            <km-editor :codeMirrorOptions="codeMirrorOptions" />
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    codeMirrorOptions: Object.freeze({value: '## CodeMirror defaultValue\\nFixed initial defaults'}),
                            }
                    },
            }
    </script>
`;

/* Marked配置 */
export const CodeMarkedOption =
    `    <template>
            <km-editor 
                    :markedOptions="markedOptions" 
                    :defaultValue="'## Marked Breaks\\nYou need to insert an blank line to wrap the line\\n\\nOkay, so I\\'ve inserted a blank line'" />
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    markedOptions: Object.freeze({breaks: false}),
                            }
                    },
            }
    </script>
`;

/* Markdown管道 */
export const CodeMarkdownPipe =
    `    <template>
            <km-editor 
                    :markdownPipe="markdownPipe"
                    :defaultValue="'Now whatever you type in, it always starts with \\'Markdown Pipe\\''"/>
    </template>
    <script>
            export default {
                    methods: {
                            markdownPipe(md) {
                                    return \`## Markdown Pipe\\n\${md}\`;
                            },
                    },
            }
    </script>
`;

/* HTML管道 */
export const CodeHtmlPipe =
    `    <template>
            <km-editor 
                    :htmlPipe="htmlPipe" 
                    :defaultValue="'Now whatever you type in, it always starts with \\'HTML Pipe\\''" />
    </template>
    <script>
            export default {
                    methods: {
                            htmlPipe(html) {
                                            return \`<h2>HTML Pipe</h2>\${html}\`;
                            },
                    },
            }
    </script>
`;

/* 对比变更 */
export const CodeContrastDiff =
    `    <template>
            <km-editor 
                    prevMarkedString="The original text" 
                    nextMarkedString="The current text" 
                    :defaultValue="'## Diff\\nClick the fourth button on the left of the toolbar to view the changes'" />
    </template>
`;

/* 嵌入下拉组 */
export const CodeEmbedDropdownGroups =
    `    <template>
            <km-editor
                    :toolbarDropdownPlugin="toolbarDropdownPlugin"
                    :defaultValue="'## Embed Dropdown Groups\\nEmbed local video in the dropdown group'" />
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    toolbarDropdownPlugin: Object.freeze([{name: '本地视频', handler: () => {}}]),
                            }
                    },
            }
    </script>
`;

/* 自定义工具栏 */
export const CodeCustomToolbars =
    `    <template>
            <km-editor :defaultValue="'## Custom Toolbars\\nAllows insertion of function items in 4 directions'">
                    <template #tools-left-before="{isEditView}">
                            <sl-button v-if="!isEditView">
                                左侧前置0号
                            </sl-button>
                            <sl-button v-if="isEditView">
                                左侧前置1号
                            </sl-button>
                    </template>
                    <template #tools-left-after="{isEditView}">
                            <sl-button v-if="isEditView" style="margin-left: 20px">
                                左侧后置2号
                            </sl-button>
                    </template>
                    <template #tools-right-before="{isEditView}">
                            <sl-button v-if="isEditView">
                                右侧前置3号
                            </sl-button>
                    </template>
                    <template #tools-right-after="{isEditView}">
                            <sl-button v-if="isEditView">
                                右侧后置4号
                            </sl-button>
                    </template>
            </km-editor>
    </template>
`;

/* 文件上传条件限制 */
export const CodeImgAffix =
    `    <template>
            <km-editor 
                    :defaultValue="'## File limit\\nLimit file uploads as required'"
                    :imgSize="10" 
                    imgUnit="KB" 
                    :imgType="imgType" />
    </template>
    <script>
            export default {
                    data() {
                            return {
                                    imgType: Object.freeze({svg: 'image/svg+xml'}),
                            }
                    },
            }
    </script>
`;

/* 虚拟上传进度 */
export const CodeVirtualProgress =
    `    <template>
            <km-editor
                    :isVirtualProgress="true"
                    :virtualProgressTime="5000"
                    :closeDelay="1000"
                    :defaultValue="'## Virtual Progress\\nTry uploading an image and a virtual progress bar will appear'" />
    </template>
`;

/* 文件上传回调 */
export const CodeFileUpload =
    `    <template>
            <div>
                    <sl-radio-group v-model="uploadStatus">
                            <sl-radio :value="true">上传成功</sl-radio>
                            <sl-radio :value="false">上传失败</sl-radio>
                    </sl-radio-group>
                    <km-editor
                            :imgUpload="imgUpload"
                            :defaultValue="'## File Upload\\nTry toggling upload status and then upload image'" />
            </div>
    </template>
    <script>
            class VirtualUpload {
                    constructor(props) {
                            Object.assign(this, {
                                    file: null,
                                    duration: 2000,
                                    error: false,
                                    abortTime: 1000,
                                    onprogress: () => {},
                            }, props);
                    }
                    virtualProgress(startTime, resolve, reject) {
                            requestAnimationFrame(() => {
                                    const currentDuration = Date.now() - startTime;
                                    const rate = currentDuration / this.duration;
                                    this.onprogress && this.onprogress(Math.floor(Math.min(rate, 1) * 100));
                                    if(this.error && currentDuration >= this.abortTime) {
                                            reject('上传失败');
                                            return;
                                    }
                                    rate < 1 ? this.virtualProgress(startTime, resolve, reject) : resolve(window.URL.createObjectURL(this.file));
                            })
                    }
                    start() {
                            return new Promise((resolve, reject) => {
                                    this.virtualProgress(Date.now(), resolve, reject);
                            })
                    }
            }
            export default {
                    data() {
                            return {
                                    uploadStatus: true,
                            }
                    },
                    methods: {
                            imgUpload(file, setProgress) {
                                    const upload =  new VirtualUpload({
                                            file,
                                            error: !this.uploadStatus,
                                            onprogress: setProgress,
                                    })
                                    return upload.start();
                            },
                    }
            }
    </script>
`;

/* 左侧边栏文档树 */
export const CodeSidebarTree =
    `    <template>
            <km-editor v-model="nodeText" @save="save">
                    <template #sidebar="{isEditView}" >
                            <div class="sidebar scroll-bar">
                                    <sl-tree
                                            :expandedKeys.sync="expandedKeys"
                                            :treeData="treeData"
                                            :selectedKeys.sync="selectedKeys">
                                            <template #title="node">
                                                    <span class="title-wrapper" :class="{isFolder: node.type === 'folder'}" @click="selectTreeNode(node)">
                                                            {{node.title}}
                                                    </span>
                                            </template>
                                    </sl-tree>
                            </div>
                    </template>
            </km-editor>
    </template>
    <script>
            const treeData = [
                    {
                            title: 'doc',
                            key: '1',
                            type: 'folder',
                            scopedSlots: {title: 'title'},
                            children: [
                                    {
                                            title: 'props',
                                            key: '10',
                                            type: 'folder',
                                            scopedSlots: {title: 'title'},
                                            children: [
                                                    { title: 'defaultValue', key: '99', type: 'article', scopedSlots: {title: 'title'}, content: '## defaultValue' },
                                                    { title: 'value', key: '100', type: 'article', scopedSlots: {title: 'title'}, content: '## value' },
                                                    { title: 'codeMirrorOptions', key: '101', type: 'article', scopedSlots: {title: 'title'}, content: '## codeMirrorOptions' },
                                                    { title: 'markedOptions', key: '102', type: 'article', scopedSlots: {title: 'title'}, content: '## markedOptions' },
                                                    { title: 'markdownPipe', key: '103', type: 'article', scopedSlots: {title: 'title'}, content: '## markdownPipe' },
                                                    { title: 'htmlPipe', key: '104', type: 'article', scopedSlots: {title: 'title'}, content: '## htmlPipe' },
                                                    { title: 'toolbarClass', key: '105', type: 'article', scopedSlots: {title: 'title'}, content: '## toolbarClass' },
                                                    { title: 'contentClass', key: '106', type: 'article', scopedSlots: {title: 'title'}, content: '## contentClass' },
                                                    { title: 'prevMarkedString', key: '107', type: 'article', scopedSlots: {title: 'title'}, content: '## prevMarkedString' },
                                                    { title: 'nextMarkedString', key: '108', type: 'article', scopedSlots: {title: 'title'}, content: '## nextMarkedString' },
                                                    { title: 'imgSize', key: '109', type: 'article', scopedSlots: {title: 'title'}, content: '## imgSize' },
                                                    { title: 'imgType', key: '110', type: 'article', scopedSlots: {title: 'title'}, content: '## imgType' },
                                                    { title: 'imgUnit', key: '111', type: 'article', scopedSlots: {title: 'title'}, content: '## imgUnit' },
                                                    { title: 'affixSize', key: '112', type: 'article', scopedSlots: {title: 'title'}, content: '## affixSize' },
                                                    { title: 'affixType', key: '113', type: 'article', scopedSlots: {title: 'title'}, content: '## affixType' },
                                                    { title: 'affixUnit', key: '114', type: 'article', scopedSlots: {title: 'title'}, content: '## affixUnit' },
                                                    { title: 'isVirtualProgress', key: '115', type: 'article', scopedSlots: {title: 'title'}, content: '## isVirtualProgress' },
                                                    { title: 'virtualProgressTime', key: '116', type: 'article', scopedSlots: {title: 'title'}, content: '## virtualProgressTime' },
                                                    { title: 'closeDelay', key: '117', type: 'article', scopedSlots: {title: 'title'}, content: '## closeDelay' },
                                                    { title: 'setMarkdown', key: '118', type: 'article', scopedSlots: {title: 'title'}, content: '## setMarkdown' },
                                                    { title: 'getMarkdown', key: '119', type: 'article', scopedSlots: {title: 'title'}, content: '## getMarkdown' },
                                                    { title: 'toolbarDropdownPlugin', key: '120', type: 'article', scopedSlots: {title: 'title'}, content: '## toolbarDropdownPlugin' },
                                                    { title: 'imgUpload', key: '121', type: 'article', scopedSlots: {title: 'title'}, content: '## imgUpload' },
                                                    { title: 'affixUpload', key: '122', type: 'article', scopedSlots: {title: 'title'}, content: '## affixUpload' },
                                            ],
                                    },
                                    {
                                            title: 'events',
                                            key: '20',
                                            type: 'folder',
                                            scopedSlots: {title: 'title'},
                                            children: [
                                                    { title: 'change', key: '200', type: 'article', scopedSlots: {title: 'title'}, content: '## change' },
                                                    { title: 'save', key: '201', type: 'article', scopedSlots: {title: 'title'}, content: '## save' },
                                            ],
                                    },
                            ],
                    },
            ]
            export default {
                    data() {
                            return {
                                    treeData,
                                    expandedKeys: [],
                                    selectedKeys: [],
                                    selectNode: null,
                                    nodeText: '',
                            }
                    },
                    created() {
                            this.selectNode = this.treeData[0].children[0].children[0];
                            this.expandedKeys = [this.selectNode.key];
                            this.selectedKeys = [this.selectNode.key];
                            this.nodeText = this.selectNode.content;
                    },
                    methods: {
                            selectTreeNode(node) {
                                    if(node.type === 'folder') return;
                                    this.nodeText !== this.selectNode.content ?
                                            this.$confirm({
                                                    title: '文档尚未保存，是否确认要离开该页面?',
                                                    content: '点击确认后文档编辑内容将丢失',
                                                    onOk: () => {
                                                            this.selectNode = node;
                                                            this.nodeText = node.content;
                                                    },
                                                    okText: '确认',
                                                    cancelText: '取消',
                                                    onCancel: () => {this.selectedKeys = [this.selectNode.key]},
                                            })
                                            :
                                            (this.selectNode = node, this.nodeText = node.content);
                            },
                            save(text) {
                                    this.selectNode.content = text;
                                    this.$message['success'](\`保存成功\`, {
                                            pos: 'topCenter',
                                    });
                            },
                    }
            }
    </script>
`;
