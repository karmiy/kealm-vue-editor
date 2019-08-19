<template>
    <div>
        <!-- 标题 -->
        <p class="code-left-line" v-if="visibleTitle">{{ title }}</p>
        <!-- 收缩代码块 -->
        <sl-collapse v-if="!expand">
            <sl-collapse-panel :header="header" :codeBox="trueVal" :active="falseVal">
                <pre v-highlightjs="code"><code class="xml"></code></pre>
            </sl-collapse-panel>
        </sl-collapse>
        <!-- 直接展示的代码块 -->
        <pre v-highlightjs="code" v-if="expand"><code class="xml"></code></pre>
    </div>
</template>
<script>
    export default {
        name: 'SearchCode',
        props:{
            title: {
                type: String,
                default: 'Code'
            },
            header: {
                default: '展开查看Code'
            },
            code: {
                type: String
            },
            visibleTitle: {
                type: Boolean,
                default: true
            },
            expand: {
                type: Boolean
            }
        },
        data () {
            return {
                trueVal: true,
                falseVal: false
            }
        },
        watch: {
            activeKey(key){
                console.log(key)
            }
        },
    }
</script>
<style scoped>
    .code-left-line{
        margin-top: 16px;
        margin-bottom: 16px;
    }
</style>