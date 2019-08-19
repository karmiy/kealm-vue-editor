<template>
    <div class="page-box">
        <!-- 嵌入下拉组 -->
        <div class="detail-box" id="embed-dropdown-groups">
            <h2>嵌入下拉组</h2>
            <p>"/"的快捷下拉组与工具栏"插入图片、表格、代码块、附件等"，允许配置 <b>toolbarDropdownPlugin</b> 嵌入新的功能</p>
            <p>尝试在快捷下拉组中嵌入一个"本地视频"</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :toolbarDropdownPlugin="toolbarDropdownPlugin"
                :defaultValue="'## Embed Dropdown Groups\nEmbed local video in the dropdown group'"
                contentClass="edit-container" />
            <search-code :code="CodeEmbedDropdownGroups"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeEmbedDropdownGroups } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "EmbedDropdownGroupsDoc",
        data() {
            return {
                CodeEmbedDropdownGroups,
                toolbarDropdownPlugin: Object.freeze([{name: '本地视频', handler: () => {}}]),
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
