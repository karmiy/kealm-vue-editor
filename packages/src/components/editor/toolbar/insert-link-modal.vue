<template>
    <!-- 插入链接的modal -->
    <sl-modal :visible="visible"
              title="添加链接"
              @ok="handleOk" @cancel="handleCancel">
        <sl-input v-model="url" placeholder="请输入链接地址"></sl-input>
    </sl-modal>
</template>

<script>
    import { insertLinkModalProps } from "@/components/editor/interface";

    export default {
        name: "InsertLinkModal",
        props: insertLinkModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        data() {
            return {
                url: '',
            }
        },
        watch: {
        },
        methods: {
            /**
             * 重置数据
             */
            reset() {
                this.url = '';
            },
            /**
             * 取消按钮
             */
            handleCancel() {
                this.reset();
                this.$emit('change', false);
            },
            /**
             * 确认按钮
             */
            handleOk() {
                this.$emit('ok', this.url)
                this.handleCancel();
            },
        },
    }
</script>

<style lang="scss">
</style>