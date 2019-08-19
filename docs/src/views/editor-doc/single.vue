<template>
    <div id="km-editor-doc" ref="page">
        <!-- 双向绑定 -->
        <div class="detail-box" id="v-model">
            <h2>双向绑定</h2>
            <p>通过v-model可以方便的达到与编辑器的数据联动</p>
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
    import * as Code from  './editor-doc.code';
    import SearchCode from '@/components/common/searchCode';
    const CodeWrapper = {};
    for(let key in Code) {
        CodeWrapper[key] = Object.freeze(Code[key])
    }
    export default {
        name: "EditorSingle",
        data() {
            return {
                ...CodeWrapper,
                value: '## v-model\nTry changing values in the editor and text box, and you\'ll see data linkage',
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/views/editor-doc/index';
    @import '~@/assets/styles/views/editor-doc/routeros';
</style>
