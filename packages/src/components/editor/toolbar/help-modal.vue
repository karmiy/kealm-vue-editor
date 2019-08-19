<template>
    <sl-modal class="kmy-help-modal" :visible="visible"
              title="帮助说明" :bodyStyle="{height: '420px'}"
              :width="900" @cancel="handleCancel">
        <div class="help-body scroll-bar">
            <h5>
                <i class="salus-icon-link-o"></i> Markdown语法教程 (Markdown syntax tutorial)
            </h5>
            <ul>
                <li><a href="http://daringfireball.net/projects/markdown/syntax/" title="Markdown Syntax"
                       target="_blank">Markdown Syntax</a></li>
                <li><a href="https://guides.github.com/features/mastering-markdown/" title="Mastering Markdown"
                       target="_blank">Mastering Markdown</a></li>
                <li><a href="https://help.github.com/articles/markdown-basics/help-modal.vue" title="Markdown Basics" target="_blank">Markdown
                    Basics</a></li>
                <li><a href="https://help.github.com/articles/github-flavored-markdown/help-modal.vue"
                       title="GitHub Flavored Markdown" target="_blank">GitHub Flavored Markdown</a></li>
                <li><a href="http://www.markdown.cn/" title="Markdown 语法说明（简体中文）" target="_blank">Markdown
                    语法说明（简体中文）</a></li>
                <li><a href="http://markdown.tw/" title="Markdown 語法說明（繁體中文）" target="_blank">Markdown 語法說明（繁體中文）</a>
                </li>
            </ul>
            <h5>
                <i class="salus-icon-link-o"></i> 键盘快捷键 (Keyboard shortcuts)
            </h5>
            <sl-alert
                    :bodyStyle="{background: '#EBF6FF', 'border-color': '#c0e0fa', margin: '10px 0', 'font-size': '14px', padding: '10px 16px'}"
                    type="info"
                    message="If Editor.md code editor is on focus, you can use keyboard shortcuts."></sl-alert>
            <table>
                <thead>
                <tr>
                    <th>Keyboard shortcuts (键盘快捷键)</th>
                    <th>说明</th>
                    <th>Description</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(shortcut, index) in shortcuts" :key="index">
                    <td>{{shortcut.key}}</td>
                    <td>{{shortcut.des}}</td>
                    <td>{{shortcut.desEn}}</td>
                </tr>
                </tbody>
            </table>
            <h5>
                <i class="salus-icon-link-o"></i> 流程图 / 时序图参考 (Flowchart reference / SequenceDiagram reference)
            </h5>
            <p><a href="https://mermaidjs.github.io/" target="_blank">https://mermaidjs.github.io/</a></p>
        </div>
        <template slot="footer">
            <sl-button @click="handleCancel">取消</sl-button>
        </template>
    </sl-modal>
</template>

<script>
    import { helpModalProps } from "@/components/editor/interface";
    import { SHORT_CUTS } from './shortcuts';

    export default {
        name: "HelpModal",
        data() {
            return {
                shortcuts: Object.freeze(SHORT_CUTS),
            }
        },
        props: helpModalProps,
        model: {
            prop: 'visible',
            event: 'change',
        },
        methods: {
            handleCancel() {
                this.$emit('change', false);
            }
        }
    }
</script>

<style lang="scss">
    @import "~@/assets/styles/components/editor/toolbar/help-modal";
</style>
