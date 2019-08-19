<template>
    <div class="page-box">
        <!-- Marked配置 -->
        <div class="detail-box" id="marked-option">
            <h2>Marked配置</h2>
            <p>提供了 <b>markedOptions</b> 属性初始化Marked的配置项，更多配置请参考 <a class="reference-link" href="https://github.com/markedjs/marked" target="_blank">Marked Github</a></p>
            <p class="code-left-line">Demo</p>
            <p>Kealm Markdown编辑器主要综合当代编辑器的语法</p>
            <p><b>原始Markdown语法</b>在换行上，<b>需要空2行</b>(中间留一个空行)才能实现文本换行，该编辑器主要依照当代编辑器的语法，实现的是<b>1行换行</b></p>
            <p>如果更熟悉原始语法，可以通过修改Marked初始配置恢复原始的空行换行</p>
            <km-editor
                :markedOptions="markedOptions"
                :defaultValue="'## Marked Breaks\nYou need to insert an blank line to wrap the line\n\nOkay, so I\'ve inserted a blank line'"
                contentClass="edit-container" />
            <search-code :code="CodeMarkedOption"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeMarkedOption } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "MarkedOptionDoc",
        data() {
            return {
                CodeMarkedOption,
                markedOptions: Object.freeze({breaks: false}),
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
