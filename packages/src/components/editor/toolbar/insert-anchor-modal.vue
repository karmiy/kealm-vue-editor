<template>
    <sl-modal :visible="visible"
              title="操作记录"
              :width="600" @cancel="handleCancel">
        <sl-form :form="quoteRefForm">
            <sl-form-item
                    v-bind="quoteRefFormLayout" label="链接名称"
                    explainOutside hasFeedback
                    :help="fieldError('quoteName') || ''"
                    :validateStatus="fieldError('quoteName') ? 'error' : ''">
                <sl-input v-decorator="['quoteName',{rules: [{required: true, message: '请填写链接名称!'}]}]"></sl-input>
            </sl-form-item>
            <sl-form-item
                    v-bind="quoteRefFormLayout" label="引用ID"
                    explainOutside hasFeedback
                    :validateStatus="fieldError('quoteId') ? 'error' : ''"
                    :help="fieldError('quoteId') || ''">
                <sl-input
                        v-decorator="['quoteId',{rules: [{required: true, message: '请填写引用ID!'}]}]"
                ></sl-input>
            </sl-form-item>
            <sl-form-item
                    v-bind="quoteRefFormLayout" label="引用地址"
                    explainOutside hasFeedback
                    :validateStatus="fieldError('quoteUrl') ? 'error' : ''"
                    :help="fieldError('quoteUrl') || ''">
                <sl-input v-decorator="['quoteUrl', {initialValue: 'http://', rules: [{required: true, message: '请填写引用地址!'},{validator: validateUrl}]}]"></sl-input>
            </sl-form-item>
            <sl-form-item v-bind="quoteRefFormLayout"
                    label="引用标题">
                <sl-input v-decorator="['quoteTitle']"></sl-input>
            </sl-form-item>
        </sl-form>
        <template slot="footer">
            <sl-button @click="onAdd" :disabled="validErrors()" type="primary">添加</sl-button>
            <sl-button @click="handleCancel">取消</sl-button>
        </template>
    </sl-modal>
</template>

<script>
    import { insertAnchorModalProps } from "@/components/editor/interface";

    export default {
        name: "InsertAnchorModal",
        props: insertAnchorModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        data() {
          return {
              quoteRefForm: this.$form.createForm(this),
              quoteRefFormLayout: {
                  labelCol: {span: 3},
                  wrapperCol: {span: 12},
              },
          }
        },
        methods: {
            onAdd() {
                this.quoteRefForm.validateFields((err, values) => {
                    if (!err) {
                        this.$emit('ok', values);
                        this.handleCancel();
                    }
                })
            },
            handleCancel() {
                this.$emit('change', false);
            },
            validateUrl(rule, value, callback) {
                if (value == 'http://') {
                    callback('请填写引用地址！');
                } else {
                    callback();
                }
            },
            fieldTouched(name) {
                return this.quoteRefForm.isFieldTouched(name);
            },
            fieldError(name) {
                return this.fieldTouched(name) && this.quoteRefForm.getFieldError(name);
            },
            validErrors() {
                const fieldsError = this.quoteRefForm.getFieldsError();
                let flag = false;
                if (Object.keys(this.quoteRefForm.getFieldsValue()).every(field => !this.fieldTouched(field))) {
                    return true;
                }
                Object.keys(this.quoteRefForm.getFieldsValue()).forEach(field => {
                    if (field != 'quoteTitle' && !this.fieldTouched(field)) {
                        flag = true;
                    }
                });
                return flag ? true : Object.keys(fieldsError).some(field => fieldsError[field]);
            },
        }
    }
</script>

<style lang="scss">

</style>
