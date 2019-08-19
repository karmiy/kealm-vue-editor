<template>
    <div class="page-box">
        <!-- 图片预览 -->
        <div class="detail-box" id="img-preview">
            <h2>图片预览</h2>
            <p>编辑器除了Ctrl + V粘贴图片，还支持图片的预览</p>
            <p>尝试单击HTML区的图片，体验预览效果</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :defaultValue="'## Img Preview\nTry clicking on the image in the preview area to experience the image preview\n\n![](' + require('../imgs/cat.png') + ')'"
                contentClass="edit-container" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "ImgPreviewDoc",
    }
</script>

<style lang="scss">
</style>
