<template>
    <div class="page-box">
        <!-- HTML管道 -->
        <div class="detail-box" id="html-pipe">
            <h2>HTML管道</h2>
            <p>当需要对预览区的HTML文本过滤时，可以调用 <b>htmlPipe</b> 属性实现</p>
            <p class="code-left-line">Demo</p>
            <p>尝试在预览区的文本前固定加上&lt;h2&gt;HTML Pipe&lt;/h2&gt;</p>
            <km-editor
                :htmlPipe="htmlPipe"
                :defaultValue="'Now whatever you type in, it always starts with \'HTML Pipe\''"
                contentClass="edit-container" />
            <search-code :code="CodeHtmlPipe"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeHtmlPipe } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "HtmlPipeDoc",
        data() {
            return {
                CodeHtmlPipe,
            }
        },
        components: {
            SearchCode,
        },
        methods: {
            htmlPipe(html) {
                return `<h2>HTML Pipe</h2>${html}`;
            },
        },
    }
</script>

<style lang="scss">
</style>
