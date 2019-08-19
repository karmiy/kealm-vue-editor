<template>
    <div id="km-doc">
        <div class="doc-sidebar scroll-hidden" :class="{hidden: !showAnchor}">
            <div class="collapse" @click="showAnchor = !showAnchor">
                <i v-show="showAnchor" class="salus-icon-arrow-left-o"></i>
                <i v-show="!showAnchor" class="salus-icon-arrow-right-o"></i>
            </div>
            <div class="doc-sidebar-collapse">
                <ul class="doc-sidebar-container">
                    <li class="doc-sidebar-group">
                        <h2 class="doc-sidebar-title">开发指南
                            &nbsp;
                            <sl-tooltip v-model="showScrollTip" placement="right">
                                <template #default>
                                    <i class="salus-icon-sign-mark-o"></i>
                                </template>
                                <template #title>
                                    <p style="white-space: nowrap">导航菜单支持滚动</p>
                                </template>
                            </sl-tooltip>
                        </h2>
                        <ul>
                            <li class="doc-sidebar-item"><router-link to="./quick-start">快速上手</router-link></li>
                        </ul>
                    </li>
                    <li class="doc-sidebar-group">
                        <h2 class="doc-sidebar-title">功能示例</h2>
                        <ul>
                            <li class="doc-sidebar-item"><router-link to="./base-use">基本使用</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./img-preview">图片预览</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./v-model">双向绑定</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./manual-assignment">手动赋值</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./manual-value">手动取值</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./codeMirror-option">CodeMirror配置</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./marked-option">Marked配置</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./markdown-pipe">Markdown管道</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./html-pipe">HTML管道</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./contrast-diff">对比变更</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./embed-dropdown-groups">嵌入下拉组</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./custom-toolbars">自定义工具栏</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./file-upload-limit">文件上传条件限制</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./virtual-progress">虚拟上传进度</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./file-upload-callback">文件上传回调</router-link></li>
                            <li class="doc-sidebar-item"><router-link to="./sidebar-tree">左侧边栏文档树</router-link></li>
                        </ul>
                    </li>
                    <li class="doc-sidebar-group">
                        <h2 class="doc-sidebar-title">文档</h2>
                        <ul>
                            <li class="doc-sidebar-item"><router-link to="./api">API</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div class="doc-wrapper scroll-bar">
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditorDoc",
        data() {
            return {
                showScrollTip: true, // 是否显示导航滚动提示
                showAnchor: true, // 是否显示导航
            }
        },
        mounted() {
            this.initScrollTip();
        },
        methods: {
            initScrollTip() {
                // 5秒后提示自动消失
                let timer = null;
                const fn = () => {
                    this.showScrollTip = false;
                    clearTimeout(timer);
                    document.removeEventListener('click', fn);
                    document.removeEventListener('scroll', fn);
                }
                timer = setTimeout(fn, 5000)
                document.addEventListener('click', fn);
                document.addEventListener('scroll', fn, true);
            }
        }
    }
</script>

<style lang="scss">
    @import '~@/assets/styles/views/editor-doc/index';
    @import '~@/assets/styles/views/editor-doc/routeros';
</style>
