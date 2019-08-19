<template>
    <div class="page-box">
        <!-- 自定义工具栏 -->
        <div class="detail-box" id="custom-toolbars">
            <h2>自定义工具栏</h2>
            <p>除了工具栏默认的按钮组，还可以添加自定义按钮</p>
            <p>组建提供了4个方位的作用域插槽放置自定义按钮，接收 <b>isEditView</b> 判断是否为编辑状态</p>
            <p>
                左侧工具栏的前置<b>（tools-left-before）</b><br>
                左侧工具栏的后置<b>（tools-left-after）</b><br>
                右侧工具栏的前置<b>（tools-right-before）</b><br>
                右侧工具栏的后置<b>（tools-right-after）</b></p>
            <p class="code-left-line">Demo</p>
            <km-editor :defaultValue="'## Custom Toolbars\nAllows insertion of function items in 4 directions'" contentClass="edit-container">
                <template #tools-left-before="{isEditView}">
                    <sl-button v-if="!isEditView" class="button-tool">
                        <span class="button-wrap">左侧前预览</span>
                    </sl-button>
                    <sl-button v-if="isEditView" class="button-tool">
                        <span class="button-wrap">左侧前</span>
                    </sl-button>
                </template>
                <template #tools-left-after="{isEditView}">
                    <sl-button v-if="isEditView" style="margin-left: 20px" class="button-tool">
                        <span class="button-wrap">左侧后</span>
                    </sl-button>
                </template>
                <template #tools-right-before="{isEditView}">
                    <sl-button v-if="isEditView" class="button-tool">
                        <span class="button-wrap">右侧前</span>
                    </sl-button>
                </template>
                <template #tools-right-after="{isEditView}">
                    <sl-button v-if="isEditView" class="button-tool">
                        <span class="button-wrap">右侧后</span>
                    </sl-button>
                </template>
            </km-editor>
            <search-code :code="CodeCustomToolbars"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeCustomToolbars } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    export default {
        name: "CustomToolbarsDoc",
        data() {
            return {
                CodeCustomToolbars,
            }
        },
        components: {
            SearchCode,
        },
        methods: {
            markdownPipe(md) {
                return `## Markdown Pipe\n${md}`;
            },
        },
    }
</script>

<style lang="scss">
</style>
