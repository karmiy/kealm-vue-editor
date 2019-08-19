<template>
    <div class="page-box">
        <!-- 双向绑定 -->
        <div class="detail-box" id="v-model">
            <h2>双向绑定</h2>
            <p>通过 <b>v-model</b> 可以方便的达到与编辑器的数据联动</p>
            <p class="code-left-line">Demo</p>
            <p>尝试修改文本域或编辑区的内容，可以看到两者数据相互联动</p>
            <sl-textarea row="4" v-model="value"></sl-textarea>
            <km-editor
                v-model="value"
                contentClass="edit-container" />
            <search-code :code="CodeVModel"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeVModel } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';

    export default {
        name: "VModelDoc",
        data() {
            return {
                CodeVModel,
                value: '## v-model\nTry changing values in the editor and text box, and you\'ll see data linkage',
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
