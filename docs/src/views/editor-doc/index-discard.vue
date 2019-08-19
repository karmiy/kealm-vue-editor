<template>
    <div id="km-editor-doc" ref="page">
        <!-- 文档导读 -->
        <div class="anchor-wrap" :class="{hidden: !showAnchor}">
            <div class="collapse" @click="showAnchor = !showAnchor">
                <i v-show="!showAnchor" class="salus-icon-arrow-left-o"></i>
                <i v-show="showAnchor" class="salus-icon-arrow-right-o"></i>
            </div>
            <div class="anchor-collapse">
                <div class="anchor-container">
                    <div class="title">文档导读</div>
                    <sl-anchor :getContainer="getContainer">
                        <template #default>
                            <sl-anchor-link href="#base-use" title="基本使用" />
                            <sl-anchor-link href="#img-preview" title="图片预览" />
                            <sl-anchor-link href="#v-model" title="双向绑定" />
                            <sl-anchor-link href="#manual-assignment" title="手动赋值" />
                            <sl-anchor-link href="#manual-value" title="手动取值" />
                            <sl-anchor-link href="#codeMirror-option" title="CodeMirror配置" />
                            <sl-anchor-link href="#marked-option" title="Marked配置" />
                            <sl-anchor-link href="#markdown-pipe" title="Markdown管道" />
                            <sl-anchor-link href="#html-pipe" title="HTML管道" />
                            <sl-anchor-link href="#contrast-diff" title="对比变更" />
                            <sl-anchor-link href="#embed-dropdown-groups" title="嵌入下拉组" />
                            <sl-anchor-link href="#custom-toolbars" title="自定义工具栏" />
                            <sl-anchor-link href="#file-upload-limit" title="文件上传条件限制" />
                            <sl-anchor-link href="#virtual-progress" title="虚拟上传进度" />
                            <sl-anchor-link href="#file-upload-callback" title="文件上传回调" />
                            <sl-anchor-link href="#sidebar-tree" title="左侧边栏文档树" />
                        </template>
                    </sl-anchor>
                </div>
            </div>
        </div>

        <!-- 介绍 -->
        <h1>Kealm Markdown编辑器</h1>
        <div class="detail-box">
            <h2>说明</h2>
            <p>一款基于Vue、CodeMirror、Marked所开发的Markdown编辑器</p>
        </div>
        <div class="detail-box">
            <h2>安装</h2>
            <search-code :code="CodeInstall" :expand="true"></search-code>
        </div>
        <div class="detail-box">
            <h2>使用</h2>
            <search-code :code="CodeUse" :expand="true"></search-code>
        </div>

        <!-- 基本使用 -->
        <div class="detail-box" id="base-use">
            <h2>基本使用</h2>
            <p>可以通过defaultValue属性设置默认文本</p>
            <p>默认高度充满屏幕，即100vh。工具栏默认高度50px，可以通过设置toolbarClass(工具栏类名)、contentClass(内容区类名)来调整高度</p>
            <p>当我们利用一些软件如QQ、微信，使用Ctrl + Alt + A截图时，编辑器允许Ctrl + V直接粘贴图片</p>
            <p>支持快捷插入，可以在空行插入 "/" 弹出快速插入下拉窗口</p>
            <p>尝试删除第4行的"/"符号，再重新输入"/"，这时会弹出快捷下拉菜单</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :defaultValue="defaultValue"
                toolbarClass="edit-toolbar"
                contentClass="edit-container" />
            <search-code :code="CodeBasic"></search-code>
        </div>

        <!-- 图片预览 -->
        <div class="detail-box" id="img-preview">
            <h2>图片预览</h2>
            <p>编辑器除了Ctrl + V粘贴图片，还支持图片的预览</p>
            <p>尝试单击HTML区的图片，体验预览效果</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :defaultValue="'## Img Preview\nTry clicking on the image in the preview area to experience the image preview\n\n![](' + require('./imgs/cat.png') + ')'"
                contentClass="edit-container" />
        </div>

        <!-- 双向绑定 -->
        <div class="detail-box" id="v-model">
            <h2>双向绑定</h2>
            <p>通过v-model可以方便的达到与编辑器的数据联动</p>
            <p class="code-left-line">Demo</p>
            <p>尝试修改文本域或编辑区的内容，可以看到两者数据相互联动</p>
            <sl-textarea row="4" v-model="value"></sl-textarea>
            <km-editor
                v-model="value"
                contentClass="edit-container" />
            <search-code :code="CodeVModel"></search-code>
        </div>

        <!-- 手动赋值 -->
        <div class="detail-box" id="manual-assignment">
            <h2>手动赋值</h2>
            <p>当需要在切换文章时，对markdown编辑区手动进行赋值时，除了修改绑定的value props，还可以通过组建实例上的setMarkdown实现</p>
            <p class="code-left-line">Demo</p>
            <p>尝试在下方文本域输入内容，编辑器将同步改变</p>
            <sl-textarea row="4" v-model="valueAreaSet"></sl-textarea>
            <km-editor ref="editor-set" contentClass="edit-container" />
            <search-code :code="CodeSetMarkdown"></search-code>
        </div>

        <!-- 手动取值 -->
        <div class="detail-box" id="manual-value">
            <h2>手动取值</h2>
            <p>当需要获取当前编辑区的文本时，可以调用getMarkdown方法</p>
            <p class="code-left-line">Demo</p>
            <p>尝试使用"点击取值"按钮，将编辑区的内容赋值到文本域</p>
            <sl-textarea row="4" v-model="valueAreaGet"></sl-textarea>
            <sl-button class="detail-box-button" type="primary" @click="getMarkdown">点击取值</sl-button>
            <km-editor
                ref="editor-get"
                :defaultValue="'## Get\nClick the button to assign the editor text to the text field'"
                contentClass="edit-container" />
            <search-code :code="CodeGetMarkdown"></search-code>
        </div>

        <!-- CodeMirror配置 -->
        <div class="detail-box" id="codeMirror-option">
            <h2>CodeMirror配置</h2>
            <p>提供了codeMirrorOptions属性初始化codeMirror的配置项，更多配置请参考 <a class="reference-link" href="https://codemirror.net/" target="_blank">CodeMirror官网</a></p>
            <p class="code-left-line">Demo</p>
            <p>覆盖codeMirror默认值配置固定为'Fixed initial defaults'</p>
            <km-editor
                :codeMirrorOptions="codeMirrorOptions"
                contentClass="edit-container" />
            <search-code :code="CodeCodeMirrorOption"></search-code>
        </div>

        <!-- Marked配置 -->
        <div class="detail-box" id="marked-option">
            <h2>Marked配置</h2>
            <p>提供了markedOptions属性初始化Marked的配置项，更多配置请参考 <a class="reference-link" href="https://github.com/markedjs/marked" target="_blank">Marked Github</a></p>
            <p class="code-left-line">Demo</p>
            <p>Kealm Markdown编辑器主要综合当代编辑器的语法</p>
            <p>原始Markdown语法在换行上，需要空2行(中间留一个空行)才能实现文本换行，该编辑器主要依照当代编辑器的语法，实现的是1行换行</p>
            <p>如果更熟悉原始语法，可以通过修改Marked初始配置恢复原始的空行换行</p>
            <km-editor
                :markedOptions="markedOptions"
                :defaultValue="'## Marked Breaks\nYou need to insert an blank line to wrap the line\n\nOkay, so I\'ve inserted a blank line'"
                contentClass="edit-container" />
            <search-code :code="CodeMarkedOption"></search-code>
        </div>

        <!-- Markdown管道 -->
        <div class="detail-box" id="markdown-pipe">
            <h2>Markdown管道</h2>
            <p>当需要对编辑区的Markdown文本过滤时，可以调用markdownPipe属性实现</p>
            <p class="code-left-line">Demo</p>
            <p>尝试在编辑器的文本前固定加上'## Markdown Pipe'</p>
            <km-editor
                :markdownPipe="markdownPipe"
                :defaultValue="'Now whatever you type in, the result is always \'Markdown Pipe\''"
                contentClass="edit-container" />
            <search-code :code="CodeMarkdownPipe"></search-code>
        </div>

        <!-- HTML管道 -->
        <div class="detail-box" id="html-pipe">
            <h2>HTML管道</h2>
            <p>当需要对预览区的HTML文本过滤时，可以调用htmlPipe属性实现</p>
            <p class="code-left-line">Demo</p>
            <p>尝试在预览区的文本前固定加上&lt;h2&gt;HTML Pipe&lt;/h2&gt;</p>
            <km-editor
                :htmlPipe="htmlPipe"
                :defaultValue="'Now whatever you type in, the result is always \'HTML Pipe\''"
                contentClass="edit-container" />
            <search-code :code="CodeHtmlPipe"></search-code>
        </div>

        <!-- 对比变更 -->
        <div class="detail-box" id="contrast-diff">
            <h2>对比变更</h2>
            <p>工具栏左侧的第4个按钮是markdown文本的对比变更，默认是对比"初始文本"与"当前文本"</p>
            <p>可以设置prevMarkedString与nextMarkedString固定对比文本内容(通常用于对比数据由后端提供)</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                prevMarkedString="The original text"
                nextMarkedString="The current text"
                :defaultValue="'## Diff\nClick the fourth button on the left of the toolbar to view the changes'"
                contentClass="edit-container" />
            <search-code :code="CodeContrastDiff"></search-code>
        </div>

        <!-- 嵌入下拉组 -->
        <div class="detail-box" id="embed-dropdown-groups">
            <h2>嵌入下拉组</h2>
            <p>"/"的快捷下拉组与工具栏"插入图片、表格、代码块、附件等"，允许配置toolbarDropdownPlugin嵌入新的功能</p>
            <p>尝试在快捷下拉组中嵌入一个"本地视频"</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :toolbarDropdownPlugin="toolbarDropdownPlugin"
                :defaultValue="'## Embed Dropdown Groups\nEmbed local video in the dropdown group'"
                contentClass="edit-container" />
            <search-code :code="CodeEmbedDropdownGroups"></search-code>
        </div>

        <!-- 自定义工具栏 -->
        <div class="detail-box" id="custom-toolbars">
            <h2>自定义工具栏</h2>
            <p>除了工具栏默认的按钮组，还可以添加自定义按钮</p>
            <p>组建提供了4个方位的作用域插槽放置自定义按钮，接收isEditView当前是否编辑状态</p>
            <p>
                左侧工具栏的前置<b>（tools-left-before）</b><br>
                左侧工具栏的后置<b>（tools-left-after）</b><br>
                右侧工具栏的前置<b>（tools-right-before）</b><br>
                右侧工具栏的后置<b>（tools-right-after）</b></p>
            <p class="code-left-line">Demo</p>
            <km-editor :defaultValue="'## Custom Toolbars\nAllows insertion of function items in 4 directions'" contentClass="edit-container">
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
            <search-code :code="CodeCustomToolbars"></search-code>
        </div>

        <!-- 文件上传条件限制 -->
        <div class="detail-box" id="file-upload-limit">
            <h2>文件上传条件限制</h2>
            <p>提供了imgSize、imgType、imgUnit限制图片上传的大小、类型与单位，affixSize、affixType、affixUnit限制附件上传的大小、类型与单位</p>
            <p>尝试限制图片大小为10kb，类型都为svg</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :imgSize="10"
                imgUnit="KB"
                :imgType="imgType"
                :defaultValue="'## File limit\nLimit file uploads as required'"
                contentClass="edit-container" />
            <search-code :code="CodeImgAffix"></search-code>
        </div>

        <!-- 虚拟上传进度 -->
        <div class="detail-box" id="virtual-progress">
            <h2>虚拟上传进度</h2>
            <p>上传图片、附件时，点击上传按钮默认是没有进度显示的</p>
            <p>可以通过配置isVirtualProgress呈现虚拟进度，开启后默认的虚拟进度时长是2000ms，可以通过virtualProgressTime进行调整</p>
            <p>当进度达到100%时，窗口会立即关闭，可以配置closeDelay属性实现延迟关闭</p>
            <p>尝试开启虚拟进度条，时长5s，达到100%后延迟1s再关闭窗口</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :isVirtualProgress="true"
                :virtualProgressTime="5000"
                :closeDelay="1000"
                :defaultValue="'## Virtual Progress\nTry uploading an image and a virtual progress bar will appear'"
                contentClass="edit-container" />
            <search-code :code="CodeVirtualProgress"></search-code>
        </div>

        <!-- 文件上传回调 -->
        <div class="detail-box" id="file-upload-callback">
            <h2>文件上传回调</h2>
            <p>上传图片、附件时，编辑器只是开辟临时内存空间存储文件，生成的也是临时的Blob URL</p>
            <p>在实际应用中，上传过程应该是与后端衔接的</p>
            <p>编辑器提供了imgUpload、affixUpload作为文件上传的回调函数，接收file对象与传递进度的函数，需要返回Promise对象</p>
            <p>回调第二个参数setProgress(传递进度函数)，一般用在请求(如axios)的onprogress进度函数中，计算当前百分比，执行setProgress函数并将当前进度数值传入</p>
            <p>尝试模拟图片上传的操作(此处没有真实调用接口，而是简单封装虚拟上传类)</p>
            <p class="code-left-line">Demo</p>
            <p>
                <sl-radio-group v-model="uploadStatus">
                    <sl-radio :value="true">上传成功</sl-radio>
                    <sl-radio :value="false">上传失败</sl-radio>
                </sl-radio-group>
            </p>
            <km-editor
                :imgUpload="imgUpload"
                :defaultValue="'## File Upload\nTry toggling upload status and then upload image'"
                contentClass="edit-container" />
            <search-code :code="CodeFileUpload"></search-code>
        </div>

        <!-- 左侧边栏文档树 -->
        <div class="detail-box" id="sidebar-tree">
            <h2>左侧边栏文档树</h2>
            <p>项目开发中，编辑器更多的是配合文档树，实现文章显示、切换、保存等功能</p>
            <p class="code-left-line">Demo</p>
            <km-editor v-model="nodeText" @save="save" contentClass="edit-container">
                <template #sidebar="{isEditView}" >
                    <div class="sidebar scroll-bar">
                        <sl-tree
                            :defaultExpandedKeys="expandedKeys"
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
        </div>
    </div>
</template>

<script>
    import * as Code from  './codes';
    import SearchCode from '@/components/common/searchCode';
    import treeData from './datas/tree-data';
    const CodeWrapper = {};
    for(let key in Code) {
        CodeWrapper[key] = Object.freeze(Code[key])
    }
    /* 虚拟上传类 */
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
        name: "EditorDoc",
        data() {
            return {
                ...CodeWrapper,
                showAnchor: true, // 是否显示导航
                defaultValue: '## Quick insert\nTry deleting the "/" symbol below and retyping "/"\n\n/',
                value: '## v-model\nTry changing values in the editor and text box, and you\'ll see data linkage',
                valueAreaSet: '## Set\nThe content will be synchronized to the editor',
                valueAreaGet: '',
                codeMirrorOptions: Object.freeze({value: '## CodeMirror defaultValue\nFixed initial defaults'}),
                markedOptions: Object.freeze({breaks: false}),
                toolbarDropdownPlugin: Object.freeze([{name: '本地视频', handler: () => {}}]),
                imgType: Object.freeze({svg: 'image/svg+xml'}),
                uploadStatus: true, // 上传状态
                treeData,
                expandedKeys: ['10'],
                selectedKeys: [],
                selectNode: null, // 当前选中节点
                nodeText: '',
            }
        },
        components: {
            SearchCode,
        },
        mounted() {
            this.selectNode = this.treeData[0].children[0].children[0];
            this.selectedKeys = [this.selectNode.key];
            this.nodeText = this.selectNode.content;
        },
        watch: {
            valueAreaSet: {
                handler(val) {
                    this.$nextTick(() => {
                        this.$refs['editor-set'].setMarkdown(val);
                    })
                },
                immediate: true
            },
        },
        methods: {
            getContainer() {
                return document.querySelector('#app')
            },
            getMarkdown() {
                this.valueAreaGet = this.$refs['editor-get'].getMarkdown();
            },
            markdownPipe(md) {
                return `## Markdown Pipe\n${md}`;
            },
            htmlPipe(html) {
                return `<h2>HTML Pipe</h2>${html}`;
            },
            imgUpload(file, setProgress) {
                const upload =  new VirtualUpload({
                    file,
                    error: !this.uploadStatus,
                    onprogress: setProgress,
                })
                return upload.start();
            },
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
                this.$message['success'](`保存成功`, {
                    pos: 'topCenter',
                });
            },
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/views/editor-doc/index';
    @import '~@/assets/styles/views/editor-doc/routeros';
</style>
