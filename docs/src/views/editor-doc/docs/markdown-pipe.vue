<template>
    <div class="page-box">
        <!-- Markdown管道 -->
        <div class="detail-box" id="markdown-pipe">
            <h2>Markdown管道</h2>
            <p>当需要对编辑区的Markdown文本过滤时，可以调用 <b>markdownPipe</b> 属性实现</p>
            <p class="code-left-line">Demo</p>
            <p>尝试在编辑器的文本前固定加上'## Markdown Pipe'</p>
            <km-editor
                :markdownPipe="markdownPipe"
                :defaultValue="'Now whatever you type in, it always starts with \'Markdown Pipe\''"
                contentClass="edit-container" />
            <search-code :code="CodeMarkdownPipe"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeMarkdownPipe } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "MarkdownPipeDoc",
        data() {
            return {
                CodeMarkdownPipe,
            }
        },
        components: {
            SearchCode,
        },
        methods: {
            markdownPipe(md) {
                return `## Markdown Pipe\n${md}`;
            },
        },
    }
</script>

<style lang="scss">
</style>
