<template>
    <div class="km-tools-bar">
        <div class="tools-container" ref="container">
            <div class="tools-tab tools-prev-tab" ref="prev_tab">
                <i class="salus-tabs-tab-prev-icon"></i>
            </div>
            <div class="tools-tab tools-next-tab" ref="next_tab">
                <i class="salus-tabs-tab-next-icon"></i>
            </div>
            <div class="tools-scroll" ref="scroll_wrap">
                <div class="tools-wrap">
                    <div class="tools">
                        <div class="tools-left">
                            <!-- 左侧工具栏，前置槽 -->
                            <slot name="tools-left-before"></slot>
                            <div class="tools-left-default">
                                <template v-if="isEditView">
                                    <!-- 编辑模式左侧工具栏 -->
                                    <sl-tooltip title="查看预览" placement="bottom">
                                        <template #default>
                                            <sl-button type="success" @click="changeView(false)">
                                                <i class="iconfont iconkejian_huaban"></i>
                                            </sl-button>
                                        </template>
                                    </sl-tooltip>
                                    <sl-tooltip title="帮助说明" placement="bottom">
                                        <template #default>
                                            <sl-button class="left-border-collapse" @click="showHelpModal">
                                                <i class="iconfont iconbangzhu_huaban"></i>
                                            </sl-button>
                                        </template>
                                    </sl-tooltip>
                                    <sl-tooltip title="实时预览" placement="bottom">
                                        <template #default>
                                            <sl-button v-if="preview" class="left-border-collapse" @click="onEdit('actualPreview')">
                                                <i class="iconfont iconyincang_huaban"></i>
                                            </sl-button>
                                            <sl-button v-else class="left-border-collapse" @click="onEdit('actualPreview')">
                                                <i class="iconfont iconkejian_huaban"></i>
                                            </sl-button>
                                        </template>
                                    </sl-tooltip>
                                    <sl-tooltip title="对比变更" placement="bottom">
                                        <template #default>
                                            <sl-button class="left-border-collapse" @click="showDiffModal = true">
                                                <i class="iconfont iconyulan_huaban"></i>
                                            </sl-button>
                                        </template>
                                    </sl-tooltip>
                                </template>
                                <template v-else>
                                    <!-- 预览模式左侧工具栏 -->
                                    <sl-tooltip title="编辑" placement="bottom">
                                        <template #default>
                                            <sl-button type="success" icon @click="changeView(true)">
                                                <i class="salus-icon-edit-o"></i>
                                            </sl-button>
                                        </template>
                                    </sl-tooltip>
                                </template>
                            </div>
                            <!-- 左侧工具栏，后置槽 -->
                            <slot name="tools-left-after"></slot>
                        </div>
                        <div class="tools-right">
                            <!-- 右侧工具栏，前置槽 -->
                            <slot name="tools-right-before"></slot>
                            <div class="tools-right-default">
                                <template v-if="isEditView">
                                    <!-- 编辑模式右侧工具栏 -->
                                    <span class="tools-item" @click="onEdit('save')">
                                        <sl-tooltip title="保存" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconbaocun"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('undo')">
                                        <sl-tooltip title="撤销" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconchexiao"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('redo')">
                                        <sl-tooltip title="重做" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconzhongzuo"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <em class="divider"></em>
                                    <sl-dropdown :trigger="['click']">
                                        <template #default>
                                            <span class="tools-item tools-item-fill" @click="textToolTipVisible = false">
                                                <sl-tooltip title="正文与标题" v-model="textToolTipVisible" placement="bottom" :overlayStyle="{zIndex: 1000}">
                                                    <template #default>
                                                        <a class="salus-dropdown-link" href="javascript:;">
                                                            正文 <i class="salus-icon-triangle-down"></i>
                                                        </a>
                                                    </template>
                                                </sl-tooltip>
                                            </span>
                                        </template>
                                        <template #overlay>
                                            <sl-menu :style="{minWidth: '140px'}">
                                                <sl-menu-item>
                                                    <a href="javascript:;" style="display: block; height: 100%; line-height: 18px">正文</a>
                                                </sl-menu-item>
                                                <sl-menu-item class="text" v-for="(font, index) in titlesFont" :key="index" @click="onEdit(`header${index + 1}`)">
                                                    <a href="javascript:;">
                                                        <span :style="`font-weight:700;font-size: ${font}px`">标题{{index + 1}}</span>
                                                    </a>
                                                </sl-menu-item>
                                            </sl-menu>
                                        </template>
                                    </sl-dropdown>
                                    <em class="divider"></em>
                                    <span class="tools-item" @click="onEdit('bold')">
                                        <sl-tooltip title="粗体" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconjiacu"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <em class="divider"></em>
                                    <span class="tools-item" @click="onEdit('italic')">
                                        <sl-tooltip title="斜体" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconqingxie"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('strikethrough')">
                                        <sl-tooltip title="删除线" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconshanchuxian"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('underline')">
                                        <sl-tooltip title="下划线" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconxiahuaxian"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <em class="divider"></em>
                                    <span class="tools-item" @click="onEdit('unordered-list')">
                                        <sl-tooltip title="无序列表" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconwuxuliebiao"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('ordered-list')">
                                        <sl-tooltip title="有序列表" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconyouxuliebiao"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('GFM-task')">
                                        <sl-tooltip title="任务列表" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconrenwuliebiao"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <em class="divider"></em>
                                    <span class="tools-item" @click="showURLModal = true">
                                        <sl-tooltip title="插入链接" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconcharulianjie"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('quote')">
                                        <sl-tooltip title="插入引用" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconcharuyinyong"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="onEdit('horline')">
                                        <sl-tooltip title="插入分割线" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconcharufengexian"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span class="tools-item" @click="showQuoteLinkModal = true">
                                        <sl-tooltip title="插入锚点" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconcharumaodian"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <em class="divider"></em>
                                    <quick-dropdown-menu v-bind="$props" v-on="quickDropdownMenuListeners" @ok="onEdit" v-model="quickVisible">
                                        <template #trigger>
                                            <span class="tools-item tools-item-fill" @click="quickToolTipVisible = false">
                                                <sl-tooltip title="插入图片、表格、代码块、附件等" v-model="quickToolTipVisible" placement="bottom" :overlayStyle="{zIndex: 1000}">
                                                    <template #default>
                                                        <i class="iconfont iconcharutupian1"></i>
                                                    </template>
                                               </sl-tooltip>
                                            </span>
                                        </template>
                                        <template #default>
                                            <sl-menu-item name="menu-title" disabled style="cursor: default">
                                                空白行插入"/"快速插入
                                            </sl-menu-item>
                                        </template>
                                    </quick-dropdown-menu>
                                    <em class="divider"></em>
                                    <span v-if="readingVisible"  class="tools-item" @click="onEdit('reading-anchor')">
                                        <sl-tooltip title="本文导读" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconwudaodu"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                    <span v-else="readingVisible" class="tools-item" @click="onEdit('reading-anchor')">
                                        <sl-tooltip title="本文导读" placement="bottom">
                                            <template #default>
                                                <i class="iconfont iconbenwendaodu"></i>
                                            </template>
                                        </sl-tooltip>
                                    </span>
                                </template>
                                <template v-else>
                                    <!-- 预览模式右侧工具栏 -->
                                </template>
                            </div>
                            <!-- 右侧工具栏，后置槽 -->
                            <slot name="tools-right-after"></slot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 帮助文档 -->
        <help-modal v-model="showHelp" />
        <!-- 添加链接 -->
        <insert-link-modal v-model="showURLModal" @ok="onEdit('url', $event)" />
        <!-- 插入锚点 -->
        <insert-anchor-modal v-model="showQuoteLinkModal" @ok="onEdit('quoteLink', $event)" />
        <!-- 对比变更 -->
        <diff-modal v-model="showDiffModal" :prevContent="prevMarkedString" :nextContent="nextMarkedString" />
        <!-- 插入图片 -->
        <!--<upload-img-modal v-model="showUploadImgModal" @ok="onEdit('img', $event)" />-->
        <!-- 插入表格 -->
        <!--<insert-table-modal v-model="showInsertTableModal" @ok="onEdit('table', $event)" />-->
        <!-- 插入附件 -->
        <!--<upload-affix-modal v-model="showUploadAffixModal" @ok="onEdit('affix', $event)" />-->

    </div>
</template>

<script>
    // import insertText from '../../../assets/utils/insertText';
    import { toolbarProps } from "@/components/editor/interface";
    import HelpModal from '@/components/editor/toolbar/help-modal';
    import InsertAnchorModal from '@/components/editor/toolbar/insert-anchor-modal';
    import DiffModal from '@/components/editor/toolbar/diff-modal';
    import InsertLinkModal from '@/components/editor/toolbar/insert-link-modal';
    /*import UploadImgModal from '@/components/editor/toolbar/upload-img-modal';
    import InsertTableModal from '@/components/editor/toolbar/insert-table-modal';
    import UploadAffixModal from '@/components/editor/toolbar/upload-affix-modal';*/
    import QuickDropdownMenu from '@/components/editor/quick-dropdown-menu';
    import { scrollAdaptation } from '@/utils/common/scroll';

    export default {
        name: "Toolbar",
        inheritAttrs: false,
        data() {
            return {
                titlesFont: [30, 26, 22, 20, 18, 16],
                showHelp: false,
                showURLModal: false,
                insertedURL: '',
                showLinkModal: false,
                insertedLink: {
                    name: '',
                    refId: '',
                    redAdd: 'http://',
                    refTitle: ''
                },
                showQuoteLinkModal: false, // 显示插入锚点模态框
                showDiffModal: false, // 显示对比模态框
                /*showUploadImgModal: false, // 显示上传图片模态框
                showInsertTableModal: false, // 显示插入表格模态框
                showUploadAffixModal: false, // 显示上传附件模态框*/
                quickVisible: false, // 快捷下拉菜单是否可见
                textToolTipVisible: false, // 正文下拉菜单图标提示是否可见
                quickToolTipVisible: false, // 快捷下拉菜单图标提示是否可见
            }
        },
        props: toolbarProps,
        model: {
            prop: "isEditView",
            event: 'change'
        },
        components: {
            HelpModal,
            InsertAnchorModal,
            DiffModal,
            InsertLinkModal,
            /*UploadImgModal,
            InsertTableModal,
            UploadAffixModal,*/
            QuickDropdownMenu,
        },
        mounted() {
            const { container, prev_tab, next_tab, scroll_wrap  } = this.$refs;
            scrollAdaptation(
                container,
                prev_tab,
                next_tab,
                scroll_wrap,
            )
        },
        computed: {
            /**
             * quick-dropdown-menu  listeners
             */
            quickDropdownMenuListeners() {
                // 排除change, save, textChange
                const { change, save, textChange, ...listeners} = this.$listeners;
                return listeners;
            },
        },
        methods: {
            changeView(value) {
                this.$emit('change', value);
            },
            showHelpModal() {
                this.showHelp = true;
            },
            onEdit(type, value = '') {
                this.$emit('textChange', type, value);
            },
            insertURL() {
                this.showURLModal = false;
                this.onEdit('url', this.insertedURL)
            },
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/components/editor/toolbar/index";
</style>
