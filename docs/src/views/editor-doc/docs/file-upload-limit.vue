<template>
    <div class="page-box">
        <!-- 文件上传条件限制 -->
        <div class="detail-box" id="file-upload-limit">
            <h2>文件上传条件限制</h2>
            <p>提供了 <b>imgSize、imgType、imgUnit</b> 限制图片上传的大小、类型与单位，<b>affixSize、affixType、affixUnit</b> 限制附件上传的大小、类型与单位</p>
            <p>尝试限制图片大小为10kb，类型都为svg</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :imgSize="10"
                imgUnit="KB"
                :imgType="imgType"
                :defaultValue="'## File limit\nLimit file uploads as required'"
                contentClass="edit-container" />
            <search-code :code="CodeImgAffix"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeImgAffix } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "FileUploadLimitDoc",
        data() {
            return {
                CodeImgAffix,
                imgType: Object.freeze({svg: 'image/svg+xml'}),
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
