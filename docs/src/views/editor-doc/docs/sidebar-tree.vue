<template>
    <div class="page-box">
        <!-- 左侧边栏文档树 -->
        <div class="detail-box" id="sidebar-tree">
            <h2>左侧边栏文档树</h2>
            <p>项目开发中，编辑器更多的是配合文档树，实现文章显示、切换、保存等功能</p>
            <p>组件提供了 <b>sidebar</b> 作用域插槽，接收 <b>isEditView</b> 判断是否为编辑状态，方便在编辑区的左侧放置导航树</p>
            <p>文档的编写通常伴随着保存操作，组件提供了 <b>save</b> 事件反馈编辑后的文本内容</p>
            <p>尝试操作导航树切换文档，修改文档内容并点击保存按钮(工具栏右侧第一个按钮)</p>
            <p>在没有保存的情况下切换文档，将会收到提示信息</p>
            <p class="code-left-line">Demo</p>
            <km-editor v-model="nodeText" @save="save" contentClass="edit-container">
                <template #sidebar="{isEditView}" >
                    <div class="sidebar scroll-bar">
                        <sl-tree
                            :expandedKeys.sync="expandedKeys"
                            :treeData="treeData"
                            :selectedKeys.sync="selectedKeys">
                            <template #title="node">
                                <span class="title-wrapper" :class="{isFolder: node.type === 'folder'}" @click="selectTreeNode(node)">
                                    {{node.title}}
                                </span>
                            </template>
                        </sl-tree>
                    </div>
                </template>
            </km-editor>
            <search-code :code="CodeSidebarTree"></search-code>
        </div>
    </div>
</template>

<script>
    import { CodeSidebarTree } from  '@/views/editor-doc/codes';
    import SearchCode from '@/components/common/searchCode';
    import treeData from '@/views/editor-doc/datas/tree-data';

    export default {
        name: "SidebarTreeDoc",
        data() {
            return {
                CodeSidebarTree,
                treeData,
                expandedKeys: [], // 当前展开节点keys
                selectedKeys: [], // 当前选中节点keys
                selectNode: null, // 当前选中节点
                nodeText: '', // 当前节点文本
            }
        },
        components: {
            SearchCode,
        },
        created() {
            // 初始化，默认显示与展开第一个节点
            this.selectNode = this.treeData[0].children[0].children[0];
            this.expandedKeys = [this.selectNode.key];
            this.selectedKeys = [this.selectNode.key];
            this.nodeText = this.selectNode.content;
        },
        methods: {
            selectTreeNode(node) {
                if(node.type === 'folder') return;
                this.nodeText !== this.selectNode.content ?
                    this.$confirm({
                        title: '文档尚未保存，是否确认要离开该页面?',
                        content: '点击确认后文档编辑内容将丢失',
                        onOk: () => {
                            this.selectNode = node;
                            this.nodeText = node.content;
                        },
                        okText: '确认',
                        cancelText: '取消',
                        onCancel: () => {this.selectedKeys = [this.selectNode.key]},
                    })
                    :
                    (this.selectNode = node, this.nodeText = node.content);
            },
            save(text) {
                this.selectNode.content = text;
                this.$message['success'](`保存成功`, {
                    pos: 'topCenter',
                });
            },
        },
    }
</script>

<style lang="scss">
</style>
