<template>
    <div class="page-box">
        <!-- 文件上传回调 -->
        <div class="detail-box" id="file-upload-callback">
            <h2>文件上传回调</h2>
            <p>上传图片、附件时，编辑器只是开辟临时内存空间存储文件，生成的也是 <b>临时的Blob URL</b></p>
            <p>在实际应用中，上传过程应该是与后端衔接的</p>
            <p>编辑器提供了 <b>imgUpload、affixUpload</b> 作为文件上传的回调函数，<b>接收file对象与传递进度的函数，需要返回Promise对象</b></p>
            <p>回调第二个参数 <b>setProgress</b>(传递进度函数)，一般用在请求(如axios)的onprogress进度函数中，计算当前百分比，执行setProgress函数并将<b>当前进度数值传入</b></p>
            <p>尝试模拟图片上传的操作(此处没有真实调用接口，而是简单封装虚拟上传类)</p>
            <p class="code-left-line">Demo</p>
            <p>
                <sl-radio-group v-model="uploadStatus">
                    <sl-radio :value="true">上传成功</sl-radio>
                    <sl-radio :value="false">上传失败</sl-radio>
                </sl-radio-group>
            </p>
            <km-editor
                :imgUpload="imgUpload"
                :defaultValue="'## File Upload\nTry toggling upload status and then upload image'"
                contentClass="edit-container" />
            <search-code :code="CodeFileUpload"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeFileUpload } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';

    /* 虚拟上传类 */
    class VirtualUpload {
        constructor(props) {
            Object.assign(this, {
                file: null,
                duration: 2000,
                error: false,
                abortTime: 1000,
                onprogress: () => {},
            }, props);
        }
        virtualProgress(startTime, resolve, reject) {
            requestAnimationFrame(() => {
                const currentDuration = Date.now() - startTime;
                const rate = currentDuration / this.duration;
                this.onprogress && this.onprogress(Math.floor(Math.min(rate, 1) * 100));
                if(this.error && currentDuration >= this.abortTime) {
                    reject('上传失败');
                    return;
                }
                rate < 1 ? this.virtualProgress(startTime, resolve, reject) : resolve(window.URL.createObjectURL(this.file));
            })
        }
        start() {
            return new Promise((resolve, reject) => {
                this.virtualProgress(Date.now(), resolve, reject);
            })
        }
    }

    export default {
        name: "FileUploadCallbackDoc",
        data() {
            return {
                CodeFileUpload,
                uploadStatus: true, // 上传状态
            }
        },
        components: {
            SearchCode,
        },
        methods: {
            imgUpload(file, setProgress) {
                const upload =  new VirtualUpload({
                    file,
                    error: !this.uploadStatus,
                    onprogress: setProgress,
                })
                return upload.start();
            },
        },
    }
</script>

<style lang="scss">
</style>
