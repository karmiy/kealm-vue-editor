<template>
    <!-- 上传图片的modal -->
    <sl-modal class="km-upload-file-modal" :visible="visible"
              title="插入附件"
              :width="600" @cancel="handleCancel" :bodyStyle="{minHeight: '130px'}">
        <sl-button slot="footer" @click="handleCancel">取消</sl-button>
        <div class="upload-file-container">
            <input class="file-upload" type="file" title="请选择附件" ref="file-upload" @change="handleFile($event)">
            <sl-button class="choose-file">选择附件</sl-button>
            <sl-input class="file-name" v-model="fileName" />
            <sl-button type="primary" class="upload-file" @click="handleUpload(uploadOptions)">上传{{loaded !== null ? `${loaded}%` : ''}}</sl-button>
        </div>
        <p class="tip-info"><template v-if="Object.keys(fileTypes).length">支持：{{Object.keys(fileTypes).join('、')}}，</template>大小不超过 {{affixSize}}{{affixUnit}}</p>
        <p class="warning-info" v-show="fileOverSize">
            <i class="salus-icon-sign-mark"></i>
            <span>文件大小超出，请上传{{affixSize}}{{affixUnit}}内的文件</span>
        </p>
        <p class="format-info" v-show="fileTypeError">
            <i class="salus-icon-sign-mark"></i>
            <span>上传格式不符合，建议将此文件压缩为ZIP文件上传</span>
        </p>
    </sl-modal>
</template>

<script>
    import { uploadAffixModalProps } from "@/components/editor/interface";
    import fileMixins from "@/components/editor/mixins/file.mixin";

    export default {
        name: "UploadAffixModal",
        mixins: [fileMixins],
        props: uploadAffixModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        data() {
            return {
                fileSize: this.affixSize,
                fileTypes: Object.freeze(this.$props.affixType || {}),
                fileUnit: this.affixUnit,
            }
        },
        computed: {
            uploadOptions() {
                return {
                    fileEmptyWarning: '请先选择附件',
                    upload: this.$props.affixUpload,
                }
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/components/editor/toolbar/upload-file-modal";
</style>
