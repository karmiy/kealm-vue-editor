<template>
    <div class="page-box">
        <!-- 虚拟上传进度 -->
        <div class="detail-box" id="virtual-progress">
            <h2>虚拟上传进度</h2>
            <p>上传图片、附件时，点击上传按钮默认是没有进度显示的</p>
            <p>可以通过配置 <b>isVirtualProgress</b> 呈现虚拟进度，开启后默认的虚拟进度时长是2000ms，可以通过 <b>virtualProgressTime</b> 进行调整</p>
            <p>当进度达到100%时，窗口会立即关闭，可以配置 <b>closeDelay</b> 属性实现延迟关闭</p>
            <p>尝试开启虚拟进度条，时长5s，达到100%后延迟1s再关闭窗口</p>
            <p class="code-left-line">Demo</p>
            <km-editor
                :isVirtualProgress="true"
                :virtualProgressTime="5000"
                :closeDelay="1000"
                :defaultValue="'## Virtual Progress\nTry uploading an image and a virtual progress bar will appear'"
                contentClass="edit-container" />
            <search-code :code="CodeVirtualProgress"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeVirtualProgress } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "VirtualProgressDoc",
        data() {
            return {
                CodeVirtualProgress,
            }
        },
        components: {
            SearchCode,
        },
    }
</script>

<style lang="scss">
</style>
