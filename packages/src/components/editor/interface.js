/* base-file */
export const baseFileProps = {
    isVirtualProgress: { // 是否开启虚拟进度条
        type: Boolean,
        default: false,
    },
    virtualProgressTime: { // 虚拟进度0-100%总时长
        type: Number,
        default: 2000,
    },
    closeDelay: {
        type: Number, // 延迟关闭时长
        default: 0,
    },
}

/* base-img */
export const baseImgProps = {
    imgSize: {  // 图片大小限制
        type: Number,
        default: 10,
    },
    imgType: Object, // 图片类型限制
    imgUnit: { // 图片单位限制
        type: String,
        default: 'MB',
    },
    imgUpload: Function, // 图片上传回调
    ...baseFileProps,
}

/* base-affix */
export const baseAffixProps = {
    affixSize: {  // 附件大小限制
        type: Number,
        default: 500,
    },
    affixType: Object, // 附件类型限制
    affixUnit: { // 附件单位限制
        type: String,
        default: 'MB',
    },
    affixUpload: Function, // 附件上传回调
    ...baseFileProps,
}

/* base-modal */
export const baseModalProps = {
    "visible": Boolean, // 是否可见
}

/* upload-img-modal */
export const uploadImgModalProps = {
    ...baseModalProps,
    ...baseImgProps,
}

/* help-mdal */
export const helpModalProps = {
    ...baseModalProps,
}

/* insert-anchor-modal */
export const insertAnchorModalProps = {
    ...baseModalProps,
}

/* diff-modal */
export const diffModalProps = {
    ...baseModalProps,
    prevContent: String, // prev对比文本
    nextContent: String, // next对比本文,
}

/* insert-link-modal */
export const insertLinkModalProps = {
    ...baseModalProps,
}

/* insert-table-modal */
export const insertTableModalProps = {
    ...baseModalProps,
}

/* upload-affix-modal */
export const uploadAffixModalProps = {
    ...baseModalProps,
    ...baseAffixProps,
}

/* operation-modal */
export const operationModalProps = {
    ...baseModalProps,
}

/* quick-dropdown-menu */
export const quickDropdownMenuProps = {
    ...baseModalProps,
    ...baseImgProps,
    ...baseAffixProps,
    isUndo: { // 选择后是否回退前一次输入，如输入/出现这个快捷下拉菜单，选择后把/回退
        type: Boolean,
        default: false,
    },
    isQuickOperate: { // 是否通过按"/"快速打开的，false是工具栏下拉出来的，true是 "/" 出来的
        type: Boolean,
        default: false,
    },
    toolbarDropdownPlugin: { // 追加下拉菜单工具栏功能列表
        type: Array,
        default: () => [],
    },
}

/* reading-anchor */
export const readingAnchorProps = {
    ...baseModalProps,
    isStatic: { // 是否静态
        default: true,
        type: Boolean,
    },
    getContainer: Function, // 滚动容器
    anchorList: { // 导航列表
        type: Array,
        default: () => [],
    }
}

/* toolbar */
export const toolbarProps = {
    ...baseImgProps,
    ...baseAffixProps,
    isEditView: Boolean, // 是否可编辑视图
    preview: Boolean, // 是否预览视图
    readingVisible: Boolean, // 本文导读是否可见
    toolbarDropdownPlugin: { // 追加下拉菜单工具栏功能列表
        type: Array,
        default: () => [],
    },
    prevMarkedString: String, // 对比变更，原始文本
    nextMarkedString: String, // 对比变更，当前文本
}

/* editor */
export const editorProps = {
    ...baseImgProps,
    ...baseAffixProps,
    value: { // 绑定文本
        type: String,
        default: '',
    },
    defaultValue: { // 默认文本
        type: String,
        default: '',
    },
    codeMirrorOptions: { // codeMirror配置
        type: Object,
        default: () => ({}),
    },
    markedOptions: { // marked配置
        type: Object,
        default: () => ({}),
    },
    markdownPipe: Function, // markdown文本管道过滤
    htmlPipe: Function, // html文本管道过滤
    toolbarClass: String, // 工具栏class
    contentClass: String, // 内容区域class
    toolbarDropdownPlugin: { // 追加下拉菜单工具栏功能列表
        type: Array,
        default: () => [],
    },
    minAnchorShowCount: { // 至少要多少h2、h3才显示导航
        default: 1,
        type: Number,
    },
    prevMarkedString: String, // 对比变更，原始文本
    nextMarkedString: String, // 对比变更，当前文本
}