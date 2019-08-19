<template>
    <div class="page-box">
        <h1>Kealm Markdown编辑器</h1>
        <div class="detail-box">
            <h2>说明</h2>
            <p>一款基于Vue、CodeMirror、Marked所开发的Markdown编辑器</p>
        </div>
        <div class="detail-box">
            <h2>安装</h2>
            <search-code :code="CodeInstall" :expand="true"></search-code>
        </div>
        <div class="detail-box">
            <h2>使用</h2>
            <search-code :code="CodeUse" :expand="true"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeInstall, CodeUse } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "QuickStartDoc",
        data() {
            return {
                CodeInstall,
                CodeUse,
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
