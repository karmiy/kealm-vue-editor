<template>
    <sl-modal class="km-diff-modal" :visible="isVisible" title="修改内容"
              :width="900" @cancel="handleCancel">
        <sl-alert type="info" class="diff-container">
            <template #message>
                <p v-html="diffContent"></p>
            </template>
        </sl-alert>
        <template #footer>
            <sl-button @click="handleCancel">取消</sl-button>
        </template>
    </sl-modal>
</template>

<script>
    import { diff_lineMode, diff_prettyHTML } from '@/utils/diff-match-patch/util';
    import { getParentComponent } from '@/utils/common/util';
    import { diffModalProps } from "@/components/editor/interface";

    export default {
        name: "DiffModal",
        props: diffModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        data() {
            return {
                isVisible: this.visible,
                diffContent: '',
            }
        },
        mounted() {
            this.renderDiffContent();
        },
        watch: {
            visible(val) {
                val && this.renderDiffContent();
                this.$nextTick(() => (this.isVisible = val));
            },
        },
        methods: {
            /**
             * 取消按钮
             */
            handleCancel() {
                this.$emit('change', false);
            },
            /**
             * 渲染diff文本
             */
            renderDiffContent() {
                // 获取编辑器组建
                const $editorComponent = getParentComponent(this, 'KmEditor');
                const { originMarkedString, defaultValue, markedString } = $editorComponent;
                // 有配置prevContent、nextContent取配置项，没有再取编辑器组建的值
                const prevContent = this.prevContent === undefined ? (originMarkedString || defaultValue) : this.prevContent,
                        nextContent = this.nextContent === undefined ? markedString : this.nextContent;
                this.diffContent = diff_prettyHTML(diff_lineMode(prevContent, nextContent)).replace(/&para;/g, '');
            }
        },
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/components/editor/toolbar/diff-modal";
</style>
