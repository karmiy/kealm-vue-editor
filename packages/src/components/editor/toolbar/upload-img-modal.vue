<template>
    <!-- 上传图片的modal -->
    <sl-modal class="km-upload-file-modal" :visible="visible"
              title="插入图片"
              :width="600" @cancel="handleCancel" :bodyStyle="{minHeight: '130px'}">
        <sl-button slot="footer" @click="handleCancel">取消</sl-button>
        <div class="upload-file-container">
            <input class="file-upload" type="file" accept="image/*" title="请选择图片" ref="file-upload" @change="handleFile($event)">
            <sl-button class="choose-file">选择图片</sl-button>
            <sl-input class="file-name" v-model="fileName" />
            <sl-button type="primary" class="upload-file" @click="handleUpload(uploadOptions)">上传{{loaded !== null ? `${loaded}%` : ''}}</sl-button>
        </div>
        <p class="tip-info">支持：{{Object.keys(fileTypes).join('、')}}，大小不超过{{imgSize}}{{imgUnit}}</p>
        <p class="warning-info" v-show="fileOverSize">
            <i class="salus-icon-sign-mark"></i>
            <span>图片大小超出，请上传{{imgSize}}{{imgUnit}}内的图片</span>
        </p>
        <p class="warning-info" v-show="fileTypeError">
            <i class="salus-icon-sign-mark"></i>
            <span>上传格式不符合</span>
        </p>
    </sl-modal>
</template>

<script>
    import { uploadImgModalProps } from "@/components/editor/interface";
    import fileMixins from "@/components/editor/mixins/file.mixin";

    const fileTypes = {
        png: 'image/png',
        jpeg: 'image/jpeg',
        gif: 'image/gif',
        jpg: 'image/jpg',
        svg: 'image/svg+xml',
    };

    export default {
        name: "UploadImgModal",
        mixins: [fileMixins],
        props: uploadImgModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        data() {
            // 合并图片类型限制，并过滤value为null的项
            /*const mixinTypes = Object.assign(fileTypes, this.$props.imgType || {});
            for(let key in mixinTypes) {
                if(!mixinTypes[key]) delete mixinTypes[key];
            }*/
            return {
                fileSize: this.imgSize,
                // fileTypes: Object.freeze(mixinTypes),
                fileTypes: Object.freeze(this.$props.imgType || fileTypes),
                fileUnit: this.imgUnit,
            }
        },
        computed: {
            uploadOptions() {
                return {
                    fileEmptyWarning: '请先选择图片',
                    upload: this.$props.imgUpload,
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "~@/assets/styles/components/editor/toolbar/upload-file-modal";
</style>
