<template>
    <div class="page-box">
        <!-- CodeMirror配置 -->
        <div class="detail-box" id="codeMirror-option">
            <h2>CodeMirror配置</h2>
            <p>提供了 <b>codeMirrorOptions</b> 属性初始化codeMirror的配置项，更多配置请参考 <a class="reference-link" href="https://codemirror.net/" target="_blank">CodeMirror官网</a></p>
            <p class="code-left-line">Demo</p>
            <p>覆盖codeMirror默认值配置固定为'Fixed initial defaults'</p>
            <km-editor
                :codeMirrorOptions="codeMirrorOptions"
                contentClass="edit-container" />
            <search-code :code="CodeCodeMirrorOption"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeCodeMirrorOption } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "CodeMirrorOptionDoc",
        data() {
            return {
                CodeCodeMirrorOption,
                codeMirrorOptions: Object.freeze({value: '## CodeMirror defaultValue\nFixed initial defaults'}),
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
