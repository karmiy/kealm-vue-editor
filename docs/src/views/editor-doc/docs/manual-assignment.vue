<template>
    <div class="page-box">
        <!-- 手动赋值 -->
        <div class="detail-box" id="manual-assignment">
            <h2>手动赋值</h2>
            <p>当需要在切换文章时，对markdown编辑区手动进行赋值时，除了修改绑定的value props，还可以通过组建实例上的setMarkdown实现</p>
            <p class="code-left-line">Demo</p>
            <p>尝试在下方文本域输入内容，编辑器将同步改变</p>
            <sl-textarea row="4" v-model="valueAreaSet"></sl-textarea>
            <sl-button class="detail-box-button" type="primary" @click="setMarkdown">点击赋值</sl-button>
            <km-editor ref="editor-set" contentClass="edit-container" />
            <search-code :code="CodeSetMarkdown"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeSetMarkdown } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';

    export default {
        name: "ManualAssignmentDoc",
        data() {
            return {
                CodeSetMarkdown,
                valueAreaSet: '## Set\nThe content will be synchronized to the editor',
            }
        },
        components: {
            SearchCode,
        },
        methods: {
            setMarkdown() {
                this.$refs['editor-set'].setMarkdown(this.valueAreaSet);
            }
        },
    }
</script>

<style lang="scss">
</style>
