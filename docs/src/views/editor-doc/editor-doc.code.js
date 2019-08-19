/* 安装 */
export const CodeInstall = `    npm install --save @kealm/vue-editor`;

/* 使用 */
export const CodeUse =
`    import Editor from '@kealm/vue-editor';
    Vue.use(Editor);
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
                    watch: {
                            valueAreaSet: {
                                    handler(val) {
                                            this.$nextTick(() => {
                                                    this.$refs['editor-set'].setMarkdown(val);
                                            })
                                    },
                                    immediate: true
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
                    :defaultValue="'Now whatever you type in, the result is always \\'Markdown Pipe\\''"/>
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
                    :defaultValue="'Now whatever you type in, the result is always \\'HTML Pipe\\''" />
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
