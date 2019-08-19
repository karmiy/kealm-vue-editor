<template>
    <!-- 插入表格的modal -->
    <sl-modal :visible="visible"
              title="插入表格"
              :width="600" @ok="handleOk" @cancel="handleCancel">
        <sl-form>
            <sl-form-item label="表格行数">
                <sl-input-number v-model="row" :min="2" size="small" />
            </sl-form-item>
            <sl-form-item label="表格列数">
                <sl-input-number v-model="col" :min="1" size="small" />
            </sl-form-item>
            <sl-form-item label="文本对齐">
                <sl-radio-group v-model="type">
                    <sl-radio value="default" title="默认"><i class="salus-icon-histogram-o"></i></sl-radio>
                    <sl-radio value="left" title="左对齐"><i class="salus-icon-barchart-o"></i></sl-radio>
                    <sl-radio value="center" title="居中对齐"><i class="salus-icon-histogram-o"></i></sl-radio>
                    <sl-radio value="right" title="右对齐"><i class="salus-icon-barchart-o"></i></sl-radio>
                </sl-radio-group>
            </sl-form-item>
        </sl-form>
    </sl-modal>
</template>

<script>
    import { insertTableModalProps } from "@/components/editor/interface";

    export default {
        name: "InsertTableModal",
        props: insertTableModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        data() {
            return {
                row: 2, // 行
                col: 1, // 列
                type: 'default', // 文本对齐
            }
        },
        watch: {
        },
        methods: {
            /**
             * 重置数据
             */
            reset() {
                Object.assign(this, {
                    row: 2,
                    col: 1,
                    type: 'default',
                })
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
                this.$emit('ok', {
                    row: this.row,
                    col: this.col,
                    type: this.type,
                })
                this.handleCancel();
            },
        },
    }
</script>

<style lang="scss">
</style>