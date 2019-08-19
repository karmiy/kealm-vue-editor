<template>
    <div class="page-box">
        <!-- 手动取值 -->
        <div class="detail-box" id="manual-value">
            <h2>手动取值</h2>
            <p>当需要获取当前编辑区的文本时，可以调用 <b>getMarkdown</b> 方法</p>
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
    </div>
</template>

<script>
    import { CodeGetMarkdown } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';

    export default {
        name: "ManualValueDoc",
        data() {
            return {
                CodeGetMarkdown,
                valueAreaGet: '',
            }
        },
        components: {
            SearchCode,
        },
        methods: {
            getMarkdown() {
                this.valueAreaGet = this.$refs['editor-get'].getMarkdown();
            },
        },
    }
</script>

<style lang="scss">
</style>
