<template>
    <div class="page-box">
        <!-- 对比变更 -->
        <div class="detail-box" id="contrast-diff">
            <h2>对比变更</h2>
            <p>工具栏左侧的第4个按钮是markdown文本的对比变更，默认是对比 <b>初始文本</b> 与 <b>当前文本</b></p>
            <p>可以设置 <b>prevMarkedString</b> 与 <b>nextMarkedString</b> 固定对比文本内容(通常用于对比数据由后端提供)</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                prevMarkedString="The original text"
                nextMarkedString="The current text"
                :defaultValue="'## Diff\nClick the fourth button on the left of the toolbar to view the changes'"
                contentClass="edit-container" />
            <search-code :code="CodeContrastDiff"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeContrastDiff } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "ContrastDiffDoc",
        data() {
            return {
                CodeContrastDiff,
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
