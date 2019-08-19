<template>
    <div class="page-box">
        <!-- 基本使用 -->
        <div class="detail-box" id="base-use">
            <h2>基本使用</h2>
            <p>可以通过 <b>defaultValue</b> 属性设置默认文本</p>
            <p>默认高度充满屏幕，即100vh。工具栏默认高度50px，可以通过设置 <b>toolbarClass</b>(工具栏类名)、 <b>contentClass</b>(内容区类名)来调整高度</p>
            <p>当我们利用一些软件如QQ、微信，使用 <b>Ctrl + Alt + A</b> 截图时，编辑器允许 <b>Ctrl + V</b> 直接粘贴图片</p>
            <p>支持快捷插入，可以在空行插入 <b>"/"</b> 弹出快速插入下拉窗口</p>
            <p>尝试删除第4行的"/"符号，再重新输入"/"，这时会弹出快捷下拉菜单</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :defaultValue="defaultValue"
                toolbarClass="edit-toolbar"
                contentClass="edit-container" />
            <search-code :code="CodeBasic"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeBasic } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';

    export default {
        name: "BaseUseDoc",
        data() {
            return {
                CodeBasic,
                defaultValue: '## Quick insert\nTry deleting the "/" symbol below and retyping "/"\n\n/',
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
