<template>
    <div id="km-editor">
        <!-- 工具栏操作区 -->
        <toolbar
            v-bind="$props" v-on="toolbarListeners" :class="toolbarClass" v-model="isEditView" :preview="preview" :readingVisible="readingVisible"
            @textChange="quickInsert" ref="toolbar"
            :prevMarkedString="prevMarkedString"
            :nextMarkedString="nextMarkedString"
        >
            <slot name="tools-left-before":isEditView="isEditView" slot="tools-left-before" />
            <slot name="tools-left-after":isEditView="isEditView" slot="tools-left-after" />
            <slot name="tools-right-before":isEditView="isEditView" slot="tools-right-before" />
            <slot name="tools-right-after":isEditView="isEditView" slot="tools-right-after" />
        </toolbar>
        <!-- 内容区 -->
        <div class="content-bar" :class="contentClass">
            <!-- 左侧目录 -->
            <slot name="sidebar" :isEditView="isEditView"></slot>
            <!-- 编辑预览区 -->
            <div ref="edit-pad" class="edit-pad">
                <!-- 编辑区 -->
                <div v-show="isEditView" class="edit-view scroll-bar" :class="preview ? 'col-half' : 'col-fill'">
                    <div id="editContent" class="edit-view-content"></div>
                    <!--<textarea id="editContent"></textarea>-->
                </div>
                <!-- 预览区 -->
                <div ref="previewBar" v-show="isEditView && preview || !isEditView"                                                                                                                                                                                                                                                 @click="previewListener"
                     class="html-view scroll-bar" :class="{'col-half' : isEditView, 'col-fill': !isEditView, isPreview: !isEditView && anchorList.length}"></div>
                <!-- 本文导读 -->
                <reading-anchor class="reading-anchor-host" :visible="isReadingVisible" :anchorList="anchorList" :isStatic="isEditView" :getContainer="getAnchorContainer" />
            </div>
        </div>
        <!-- 快捷下拉菜单 -->
        <QuickDropdownMenu v-bind="$props" v-on="quickDropdownMenuListeners" @ok="quickInsert" v-model="quickVisible" :isUndo="true" :isQuickOperate="true" ref="quickDropdownMenu">
            <div slot="trigger" class="hidden-quick-dropdown"></div>
        </QuickDropdownMenu>
        <!-- 图片预览 -->
        <img-preview :previewEle="previewEle" />
    </div>
</template>

<script>
    import Vue from 'vue';
    import renderPlugins from '@/utils/marked-renderer';
    import { editorProps } from "@/components/editor/interface";
    import Toolbar from '@/components/editor/toolbar';
    import QuickDropdownMenu from '@/components/editor/quick-dropdown-menu';
    import ImgPreview from '@/components/common/img-preview';
    import ReadingAnchor from '@/components/editor/reading-anchor';
    import { curLineEmpty } from '@/utils/code-mirror/util';
    import { fullScreen } from '@/utils/common/dom';
    import { merge } from 'lodash-es';
    import raf from '@/utils/common/raf';
    // import plugins from '@/utils/markdown-it-plugins';

    // 判断是否Mac
    const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
    const Ctrl = isMac ? 'Cmd' : "Ctrl";

    export default {
        name: "KmEditor",
        props: editorProps,
        model: {
            prop: 'value',
            event: 'change',
        },
        data() {
            return {
                codeMirror: null, // codemirror
                md: null, // markdown-it / marked
                markedString: '', // markdown文本
                htmlString: '', // html文本
                isEditView: true, // 默认编辑模式
                preview: true, // 编辑模式默认实时预览
                aceEditor: null, // 编辑器
                selectedItem: null, // 左侧目录树选中项
                quickVisible: false, // 快速选择显示隐藏
                previewEle: null, // 图片预览
                extraKeys: null, // 快捷键
                readingVisible: false, // 本文导读是否可见
                originMarkedString: '', // 初始的markdown文本，记录一开始的markdown，在setMarkdown时替换
                anchorList: [], // 导读列表
            }
        },
        mounted() {
            this.initExtraKeys(); // 初始化快捷键支持
            this.initCodeMirror(); // 初始化codeMirror
            this.initMarked(); // 初始化marked
            this.initQuickDropdown(); // 初始化'/'快捷下拉菜单
            this.initPasteImg(); // 初始化粘贴
            //this.md = new this.MarkdownIt();
            // 安装rule plugins
            // this.md.use(plugins);
        },
        computed: {
            /**
             * markdown文本内容
             */
            /*markedString() {
                return this.codeMirror ? (this.markdownPipe ? this.markdownPipe(this.codeMirror.getValue()) : this.codeMirror.getValue()) : '';
            },*/
            /**
             * html文本内容
             */
            /*htmlString() {
                //return this.md ? this.md.render(this.markedString) : '';
                // return this.Marked(this.markedString);
                // console.log(this.Marked && this.Marked('```` ca\n```\n123\n```\n'));
                return this.htmlPipe ? this.htmlPipe(this.Marked(this.markedString)) : this.Marked(this.markedString);
            },*/
            /**
             * toolbar listeners
             */
            toolbarListeners() {
                // 排除change事件
                const { change, ...listeners} = this.$listeners;
                return listeners;
            },
            /**
             * quick-dropdown-menu  listeners
             */
            quickDropdownMenuListeners() {
                // 排除change, save
                const { change, save, ...listeners} = this.$listeners;
                return listeners;
            },
            /**
             * 导读是否可见(当最小导航数量条件符合时，预览模式始终可见)
             */
            isReadingVisible() {
                return !this.isEditView || this.readingVisible;
            },
        },
        watch: {
            /**
             * value改变时，修改markdown文本
             */
            value(val) {
                if(!this.codeMirror || val === this.markedString)
                    return;
                this.setMarkdown(val);
            },
            /**
             * markdown文本改变时，触发@change
             */
            /*markedString(val) {
                this.$emit('change', val);
            },*/
            /**
             * html文本改变时，重初始化流程图，渲染代码块
             */
            /*htmlString() {
                this.$nextTick(() => {
                    try { mermaid.init(); this.prettify(); this.createCopyIcons(); }catch (e) { }
                })
            },*/
            /**
             * 从预览模式切换到编辑模式需要刷新markdown文本(隐藏的情况下会导致setMarkdown改变失败需要点击一下屏幕)
             */
            isEditView() {
                this.isEditView && this.codeMirror && this.$nextTick(() => this.codeMirror.refresh());
            },
            /**
             * 导读从隐藏到显示，需要重新构建一次导读列表，因为为了提升性能在隐藏时不做构建操作
             */
            isReadingVisible(val) {
                val && this.createAnchors();
            },
        },
        components: {
            Toolbar,
            QuickDropdownMenu,
            ImgPreview,
            ReadingAnchor,
        },
        methods: {
            /**
             * 初始化codeMirror快捷键
             */
            initExtraKeys() {
                // 快捷键
                const extraKeys = ['F9', 'F10', `${Ctrl}-S`, `Shift-${Ctrl}-Z`, `${Ctrl}-Y`, `${Ctrl}-B`, `${Ctrl}-I`, `${Ctrl}-L`, `${Ctrl}-G`];
                const _keys = {};
                extraKeys.forEach(extraKey => {
                    _keys[extraKey] = codeMirror => {
                        this.quickKeys(codeMirror, extraKey);
                    }
                });
                this.extraKeys = _keys;
            },
            /**
             * 初始化codeMirror编辑器
             */
            initCodeMirror() {
                // 初始值
                const initialValue = this.defaultValue || this.value || this.codeMirrorOptions.value || '';
                // 创建codeMirror对象
                this.codeMirror = this.CodeMirror(this.$el.querySelector('#editContent'), merge({
                    mode: 'markdown',
                    value: initialValue,
                    smartIndent: true, // 智能缩进(如二级列表 - 按tab + shift会往左缩进)
                    autoCloseBrackets: true, // 打(，自动补全)
                    matchBrackets: true, // 鼠标点到某个括号时，自动高亮与之匹配的那个括号
                    showCursorWhenSelecting: true, // 选中文本时是否显示光标
                    lineWrapping: true,  // 长句子折行，即一行过长时不出现横向滚动条
                    extraKeys: Object.assign({"Enter": "newlineAndIndentContinueMarkdownList"}, this.extraKeys),
                    theme: 'railscasts',
                    keyMap: 'sublime',
                }, this.codeMirrorOptions));
                // 初始时先编译一次HTML
                (initialValue) && this.markdownChange(initialValue);

                this.toThrottle = false; // 节流，不绑在data上，不做数据驱动
                this.codeMirror.on('change', (codeMirror) => {
                    this.markdownChange(codeMirror.getValue());
                })
            },
            /**
             * 初始化marked编译库
             */
            initMarked() {
                const renderer = new this.Marked.Renderer();
                renderPlugins(renderer);
                this.Marked.setOptions(merge({
                    renderer,
                    gfm: true, // 启动Github样式的Markdown
                    tables: true, // 支持Github表格，必须打开gfm选项
                    breaks: true,  // 支持Github换行符，必须打开gfm选项( '>' 换行，回车换成 <br> )
                    pedantic: false, // 只解析符合markdown.pl定义的，不修正markdown的错误
                    sanitize: false, // 可识别HTML标签
                    smartLists: true, // 优化列表输出(true，则使用比markdown.pl中更聪明的列表行为)
                    smartypants: false // true，则智能的排版标点符号如引号和破折号
                }, this.markedOptions))
            },
            /**
             * 初始化codeMirror的/快捷下拉菜单
             */
            initQuickDropdown() {
                // 监听键入，如果键入'/'，且是空行，则显示快捷下拉菜单
                this.codeMirror.on('beforeChange', (codeMirror, {text}) => {
                    if(curLineEmpty(codeMirror) && text[0] === '/') {
                        setTimeout(() => {
                            const textarea = this.$el.querySelector('.edit-view .CodeMirror textarea');
                            const quickDropdown = this.$el.querySelector('.hidden-quick-dropdown');
                            const rect = textarea.getBoundingClientRect();
                            quickDropdown.style.left = `${rect.left + 6}px`;
                            quickDropdown.style.top = `${rect.top - 4}px`;
                            this.quickVisible = true;
                        })
                    }else {
                        this.quickVisible = false;
                    }
                });
            },
            /**
             * 初始化粘贴图片的功能
             */
            initPasteImg() {
                this.$el.querySelector('#editContent').addEventListener('paste', this.pasteEffect);
            },
            pasteEffect(event) {
                const clipboardData = event.clipboardData || event.originalEvent;
                if(!clipboardData) return;
                const items = clipboardData.items ? [...clipboardData.items] : [];
                let blob = null;
                items.forEach(item => {
                    item.type.indexOf('image') !== -1 && (blob = item.getAsFile());
                });
                if(!blob) return;
                this.codeMirror.replaceSelection(`![](${window.URL.createObjectURL(blob)})\n`);
            },
            /**
             * 快捷键回调
             */
            quickKeys(codeMirror, key) {
                switch (key) {
                    case 'F9': // 实时预览
                        this.preview = !this.preview;
                        break;
                    case `F10`: // 全屏HTML预览
                        fullScreen(this.$el.querySelector('.html-view'));
                        break;
                    case `${Ctrl}-S`: // 保存
                        this.$emit('save', this.getMarkdown());
                        break;
                    case `Shift-${Ctrl}-Z`: // 重做
                        case `${Ctrl}-Y`:
                        this.quickInsert('redo');
                        break;
                    case `${Ctrl}-B`: // 加粗
                        this.quickInsert('bold');
                        break;
                    case `${Ctrl}-I`: // 斜体
                        this.quickInsert('italic');
                        break;
                    case `${Ctrl}-L`: // 链接
                        this.$refs.toolbar.showURLModal = true;
                        /*this.$nextTick(() => {
                            // 窗口显示需要点击事件来触发
                            document.body.click();
                        })*/
                        break;
                    case `${Ctrl}-G`: // 插入图片
                        this.quickVisible = true;
                        this.$refs.quickDropdownMenu.showUploadImgModal = true;
                        this.$nextTick(() => {
                            this.quickVisible = false;
                            /*this.$nextTick(() => {
                                // 窗口显示需要点击事件来触发
                                document.body.click();
                            })*/
                        })
                        break;
                }
            },
            /**
             * markdown文本改变触发
             */
            markdownChange(value) {
                // 渲染markdown
                this.renderMarkdown(value);
                // 渲染html
                this.renderHtml(value);
                // 渲染副作用操作
                this.renderEffects();
            },
            /**
             * 渲染markdown
             */
            renderMarkdown(markedString) {
                this.markedString = markedString;
                this.$emit('change', markedString);
            },
            /**
             * 渲染html
             */
            renderHtml(markedString) {
                // 过滤markdown文本
                markedString = this.markdownPipe ? this.markdownPipe(markedString) : markedString;
                // 过滤html文本
                // 直接操作dom，在高频率变化下，性能比v-html高得多
                this.$refs.previewBar.innerHTML = this.htmlString = this.htmlPipe ? this.htmlPipe(this.Marked(markedString)) : this.Marked(markedString);
            },
            /**
             * 渲染副作用操作: 绘制流程图、代码块、导读列表
             */
            renderEffects() {
                // html文本改变时，重初始化流程图，渲染代码块
                if(this.toThrottle)
                    return;
                this.toThrottle = true;
                this.$nextTick(() => {
                    try {
                        raf(() => {
                            // 注: 只有在有对应内容才去格式化渲染，不做无意义的操作，提升性能
                            this.createCopyIcons(); // 代码块美化与复制功能
                            this.createFlowCharts(); // 流程图
                            this.createAnchors(); // 导读
                            this.toThrottle = false;
                        })
                    }catch(e) {
                        console.log(e);
                    }
                })
            },
            /**
             * 生成代码块的复制按钮
             */
            createCopyIcons() {
                // 没有代码块，不做渲染，提升性能
                if(!this.htmlString.includes('<pre class="prettyprint linenums">')) return;

                // 美化<pre>
                this.prettify();

                // 构建复制按钮
                const preCodes = this.$el.querySelectorAll('.html-view pre');
                if(!preCodes.length)
                    return;
                const Compo = {
                    template: `
                        <sl-tooltip :title="title" placement="bottom" @visibleChange="visibleChange">
                            <i class="iconfont iconfuzhi copy-icon" @click="copy"></i>
                       </sl-tooltip>
                    `,
                    data() {
                        return {
                            title: '复制',
                            timer: null,
                        }
                    },
                    methods: {
                        copy() {
                            try {
                                // 由于被编译生成的pretty code的HTML是一行式的，如果使用innerText、textContent会缺失空行，所以采用手动整理每个li的文本
                                const lineEles = this.$el.parentNode.querySelectorAll('li');
                                const copyCode = [...lineEles].reduce((sum, el) => sum ? `${sum}\n    ${el.innerText}` : el.innerText, ''); // \n后带4个空行，优化粘贴后位置不正确的问题
                                // 创建隐式文本域存储代码块内容，用于选中执行浏览器copy命令
                                const codeContainer = document.createElement('textarea');
                                codeContainer.style.position = 'absolute';
                                codeContainer.style.top = '0';
                                codeContainer.style.left = '0';
                                codeContainer.style.zIndex = '9999';
                                codeContainer.style.opacity = '0';
                                codeContainer.value = copyCode.endsWith('\n') ? copyCode.slice(0 ,-1) : copyCode; // 去除结尾换行，提升使用体验
                                document.body.appendChild(codeContainer);

                                // const range = document.createRange();
                                // range.selectNode(codeContainer);
                                window.getSelection().removeAllRanges();
                                // window.getSelection().addRange(range);
                                codeContainer.select();
                                document.execCommand('copy');
                                document.body.removeChild(codeContainer);
                                this.title = '复制成功';
                            }catch(e) {
                                this.title = '复制失败';
                            }
                        },
                        visibleChange(status) {
                            status ? (clearTimeout(this.timer), this.title = '复制') : this.timer = setTimeout(() => this.title = '复制', 500);
                        },
                    }
                };
                [...preCodes].forEach(item => {
                    const el = document.createElement('div');
                    item.appendChild(el);
                    new Vue(Compo).$mount(el);
                })
            },
            /**
             * 构建流程图
             */
            createFlowCharts() {
                this.htmlString.includes('<div class="mermaid">') && this.mermaid.init();
            },
            /**
             * 生成导读列表
             */
            createAnchors() {
                const el = this.$refs.previewBar;
                if(!el) return;
                // 导读是隐藏状态，不做操作，提升性能
                if(!this.isReadingVisible) return;
                // 查询h2、h3标签
                const anchors = el.querySelectorAll('h2, h3');
                // 如果数量、文本没有改变，不做操作，提升性能
                if(anchors.length === this.anchorList.length) {
                    const different = this.anchorList.some((item, index) => {
                        if(item.href !== `#${anchors[index].id}` || item.title !== anchors[index].innerText || item.type !== anchors[index].nodeName) {
                            return true;
                        }
                        return false;
                    });
                    if(!different) return;
                }
                // h2、h3标签数量小于规定数，直接清空
                if(anchors.length < this.minAnchorShowCount) {
                    this.anchorList = [];
                    return;
                }
                const list = [];
                [...anchors].forEach(item => {
                    list.push({
                        href: `#${item.id}`,
                        title: item.innerText,
                        type: item.nodeName,
                    })
                });
                this.anchorList = list;
            },
            /**
             * 切换编辑/预览视图
             */
            changeView(value) {
                this.isEditView = value;
            },
            /**
             * 根据工具栏操作快速插入内容
             */
            quickInsert(type, value = '', isUndo) {
                isUndo && (this.codeMirror.execCommand('delCharBefore'));
                const curSelectText = this.codeMirror.getSelection();
                switch (type) {
                    case 'save': // 保存
                        this.$emit('save', this.getMarkdown());
                        break;
                    case 'actualPreview': // 实时预览
                        this.preview = !this.preview;
                        break;
                    case 'undo': // 撤销
                        this.codeMirror.undo();
                        break;
                    case 'redo': // 重做
                        this.codeMirror.redo();
                        break;
                    case 'bold': // 加粗
                        this.codeMirror.replaceSelection(curSelectText ? `**${curSelectText}**` : '**粗体**');
                        break;
                    case 'italic': // 斜体
                        this.codeMirror.replaceSelection(curSelectText ? `*${curSelectText}*` : '*斜体*');
                        break;
                    case "strikethrough": // 删除线
                        this.codeMirror.replaceSelection(curSelectText ? `~~${curSelectText}~~` : '~~删除线~~');
                        break;
                    case 'underline': // 下划线
                        this.codeMirror.replaceSelection(curSelectText ? `<u>${curSelectText}</u>` : '<u>下划线</u>');
                        break;
                    case "unordered-list": // 无序列表
                        this.codeMirror.replaceSelection(curSelectText ? `- ${curSelectText}\n` : '- 普通列表\n');
                        break;
                    case "ordered-list": // 有序列表
                        this.codeMirror.replaceSelection(curSelectText ? `1. ${curSelectText}\n` : '1. 有序列表\n');
                        break;
                    case "GFM-task": // 代办任务
                        this.codeMirror.replaceSelection(curSelectText ? `- [x] ${curSelectText}\n` : '- [x] 任务待办\n');
                        break;
                    case "header1": // h1
                        this.codeMirror.replaceSelection(curSelectText ? `# ${curSelectText}\n` : '# 标题1\n');
                        break;
                    case "header2": // h2
                        this.codeMirror.replaceSelection(curSelectText ? `## ${curSelectText}\n` : '## 标题2\n');
                        break;
                    case "header3": // h3
                        this.codeMirror.replaceSelection(curSelectText ? `### ${curSelectText}\n` : '### 标题3\n');
                        break;
                    case "header4": // h4
                        this.codeMirror.replaceSelection(curSelectText ? `#### ${curSelectText}\n` : '#### 标题4\n');
                        break;
                    case "header5": // h5
                        this.codeMirror.replaceSelection(curSelectText ? `##### ${curSelectText}\n` : '##### 标题5\n');
                        break;
                    case "header6": // h6
                        this.codeMirror.replaceSelection(curSelectText ? `###### ${curSelectText}\n` : '###### 标题6\n');
                        break;
                    case "url": // 插入链接url
                        value = value == "" ? "http://" : value;
                        this.codeMirror.replaceSelection(curSelectText ? `[${curSelectText}](${value})` : `[文字链接](${value})`);
                        break;
                    case "horline": // 插入分割线
                        this.codeMirror.replaceSelection(curSelectText ? `${curSelectText}------------` : '------------');
                        break;
                    case "quote": // 插入引用
                        this.codeMirror.replaceSelection(curSelectText ? `> ${curSelectText}\n` : '> 引用\n');
                        break;
                    case 'quoteLink': // 插入锚点
                        const { quoteName, quoteId, quoteUrl, quoteTitle } = value;
                        this.codeMirror.replaceSelection(`[${quoteName}][${quoteId}]\n\n[${quoteId}]: ${quoteUrl} "${quoteTitle}"\n\n`);
                        break;
                    case "code_line": // 行内代码
                        this.codeMirror.replaceSelection(curSelectText ? `\`${curSelectText}\`` : '`行内代码`');
                        break;
                    case "code_block": // 代码块
                        this.codeMirror.replaceSelection(curSelectText ? "```\n" + curSelectText + "\n```" : '```\n代码块\n```\n');
                        break;
                    case "img": // 图片
                        this.codeMirror.replaceSelection(`![${value.name}](${value.url})\n`);
                        break;
                    case "table": // 表格
                        if(value.type === 'default') {
                            const tableCol = `\n|${Array(value.col).fill('   |').join('')}`;
                            const tableCode = `|${Array(value.col).fill('   |').join('')}\n|${Array(value.col).fill(' ------------ |').join('')}${Array(+value.row - 1).fill(tableCol).join('')}\n`;
                            this.codeMirror.replaceSelection(tableCode);
                        }else if(value.type === 'left') {
                            const tableCol = `\n|${Array(value.col).fill('   |').join('')}`;
                            const tableCode = `|${Array(value.col).fill('   |').join('')}\n|${Array(value.col).fill(' :------------ |').join('')}${Array(+value.row - 1).fill(tableCol).join('')}\n`;
                            this.codeMirror.replaceSelection(tableCode);
                        }else if(value.type === 'center') {
                            const tableCol = `\n|${Array(value.col).fill('   |').join('')}`;
                            const tableCode = `|${Array(value.col).fill('   |').join('')}\n|${Array(value.col).fill(' :------------: |').join('')}${Array(+value.row - 1).fill(tableCol).join('')}\n`;
                            this.codeMirror.replaceSelection(tableCode);
                        }else {
                            const tableCol = `\n|${Array(value.col).fill('   |').join('')}`;
                            const tableCode = `|${Array(value.col).fill('   |').join('')}\n|${Array(value.col).fill(' ------------: |').join('')}${Array(+value.row - 1).fill(tableCol).join('')}\n`;
                            this.codeMirror.replaceSelection(tableCode);
                        }
                        break;
                    case "affix": // 插入附件
                        this.codeMirror.replaceSelection(`[${value.name}](${value.url})`);
                        break;
                    case "flow": // 流程图
                        this.codeMirror.replaceSelection(curSelectText ?
                            '``` flow\n\n'+ curSelectText +'\n\n```\n'
                            :
                            '``` flow\n\n' +
                            'graph LR\n' +
                            '    A[Square Rect] -- Link text --> B((Circle))\n' +
                            '    A --> C(Round Rect)\n' +
                            '    B --> D{Rhombus}\n' +
                            '    C --> D\n\n' +
                            '```\n'
                        );
                        break;
                    case "sequence": // 时序图
                        this.codeMirror.replaceSelection(curSelectText ?
                            '``` sequence\n\n'+ curSelectText +'\n\n```\n'
                            :
                            '``` sequence\n\n' +
                            'sequenceDiagram\n' +
                            '    Alice ->> Bob: Hello Bob, how are you?\n' +
                            '    Bob-->>John: How about you John?\n' +
                            '    Bob--x Alice: I am good thanks!\n' +
                            '    Bob-x John: I am good thanks!\n' +
                            '    Note right of John: Bob thinks a long<br/>long time, so long<br/>that the text does<br/>not fit on a row.\n' +
                            '    Bob-->Alice: Checking with John...\n' +
                            '    Alice->John: Yes... John, how are you?\n\n' +
                            '```\n'
                        );
                        break;
                    case "reading-anchor":
                        this.readingVisible = !this.readingVisible;
                        break;
                }
            },

            /**
             * 导读滚动容器
             */
            getAnchorContainer() {
                return this.$refs.previewBar;
            },

            /**
             * 事件代理预览区操作
             */
            previewListener(e) {
                if(e.target.nodeName === 'IMG') {
                    this.previewEle = e.target;
                }
            },

            // ----------API-----------
            /**
             * 设置markdown文本(setMarkdown可能赋值失败需要点击一下屏幕)
             */
            setMarkdown(text) {
                this.codeMirror && (this.codeMirror.setValue(text), this.$nextTick(() => this.codeMirror.refresh()));
                this.originMarkedString = text;
            },
            /**
             * 获取markdown文本
             */
            getMarkdown() {
                return this.codeMirror && this.codeMirror.getValue();
            },
        },
        beforeDestroy() {
            this.$el.querySelector('#editContent').removeEventListener('paste', this.pasteEffect);
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/components/editor/editor-markdown-style';
    @import '~@/assets/styles/components/editor/editor-html-style';
    @import "~@/assets/styles/components/editor/editor-content";
</style>
