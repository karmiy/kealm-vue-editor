<template>
    <!-- 快速下拉菜单 -->
    <sl-dropdown overlayClassName="km-quick-dropdown-menu" :trigger="['click']" :visible="visible" @visibleChange="$emit('visibleChange', $event)">
        <slot name="trigger"></slot>
        <sl-menu slot="overlay" @click="$emit('visibleChange', false)" :style="{minWidth: '140px'}">
            <slot name="menu-title"></slot>
            <sl-menu-item v-show="!isQuickOperate" disabled>
                空白行插入 " / " 快速插入
            </sl-menu-item>
            <sl-menu-item @click="showUploadImgModal = true">
                <a href="javascript:;">图片</a>
            </sl-menu-item>
            <sl-menu-item @click="showInsertTableModal = true">
                <a href="javascript:;">表格</a>
            </sl-menu-item>
            <sl-menu-item @click="onEdit('code_block')">
                <a href="javascript:;">代码</a>
            </sl-menu-item>
            <sl-menu-item @click="onEdit('code_line')">
                <a href="javascript:;">行内代码</a>
            </sl-menu-item>
            <sl-menu-item @click="onEdit('flow')">
                <a href="javascript:;">流程图</a>
            </sl-menu-item>
            <sl-menu-item @click="onEdit('sequence')">
                <a href="javascript:;">序列图</a>
            </sl-menu-item>
            <sl-menu-item @click="showUploadAffixModal = true">
                <a href="javascript:;">附件</a>
            </sl-menu-item>
            <sl-menu-item v-show="toolbarDropdownPlugin.length" disabled class="divider">
                嵌入
            </sl-menu-item>
            <!--<sl-menu-item @click="onEdit('video')">
                <a href="javascript:;">本地视频</a>
            </sl-menu-item>-->
            <sl-menu-item v-for="item in toolbarDropdownPlugin" :key="item.name" @click="item.handler">
                <a href="javascript:;">{{item.name}}</a>
            </sl-menu-item>
            <!-- 插入图片 -->
            <upload-img-modal v-bind="$props" v-on="$listeners" v-model="showUploadImgModal" @ok="onEdit('img', $event)" />
            <!-- 插入表格 -->
            <insert-table-modal v-model="showInsertTableModal" @ok="onEdit('table', $event)" />
            <!-- 插入附件 -->
            <upload-affix-modal v-bind="$props" v-on="$listeners" v-model="showUploadAffixModal" @ok="onEdit('affix', $event)" />
        </sl-menu>
    </sl-dropdown>
</template>

<script>
    import { quickDropdownMenuProps } from "@/components/editor/interface";
    import UploadImgModal from '@/components/editor/toolbar/upload-img-modal';
    import InsertTableModal from '@/components/editor/toolbar/insert-table-modal';
    import UploadAffixModal from '@/components/editor/toolbar/upload-affix-modal';
    export default {
        name: "QuickDropdownMenu",
        inheritAttrs: false,
        props: quickDropdownMenuProps,
        model: {
            prop: 'visible',
            event: 'visibleChange',
        },
        data() {
            return {
                showUploadImgModal: false, // 显示上传图片模态框
                showInsertTableModal: false, // 显示插入表格模态框
                showUploadAffixModal: false, // 显示上传附件模态框
            }
        },
        components: {
            UploadImgModal,
            InsertTableModal,
            UploadAffixModal,
        },
        methods: {
            onEdit(type, value = '') {
                this.$emit('ok', type, value, this.isUndo);
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/components/editor/quick-dropdown-menu/index";
</style>
