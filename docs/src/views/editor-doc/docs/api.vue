<template>
    <div class="page-box">
        <!-- API -->
        <div class="detail-box">
            <h2>API</h2>
            <p class="row-in-round">km-editor</p>
            <table class="salus-table salus-table-striped salus-table-hover">
                <thead>
                    <tr>
                        <th width="15%">参数</th>
                        <th width="40%">描述</th>
                        <th width="30%">类型</th>
                        <th width="15%">默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>defaultValue</td>
                        <td>默认markdown文本</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>value(v-model)</td>
                        <td>markdown文本</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>codeMirrorOptions</td>
                        <td>codeMirror配置</td>
                        <td>Object</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>markedOptions</td>
                        <td>marked配置</td>
                        <td>Object</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>markdownPipe</td>
                        <td>markdown文本输出管道过滤</td>
                        <td>Function(md)</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>htmlPipe</td>
                        <td>html文本输出管道过滤</td>
                        <td>Function(html)</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>toolbarClass</td>
                        <td>工具栏class</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>contentClass</td>
                        <td>内容区class</td>
                        <td>String</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>prevMarkedString</td>
                        <td>对比变更使用，原始的markdown文本，在调用setMarkdown时变更</td>
                        <td>String</td>
                        <td>setMarkdown传递的值或初始值</td>
                    </tr>
                    <tr>
                        <td>nextMarkedString</td>
                        <td>对比变更使用，变更后的markdown文本，在修改markdown文本时实时变更</td>
                        <td>String</td>
                        <td>当前markdown文本</td>
                    </tr>
                    <tr>
                        <td>imgSize</td>
                        <td>图片大小限制，单位M</td>
                        <td>Number</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>imgType</td>
                        <td>图片可选类型</td>
                        <td>Object</td>
                        <td>{png: 'image/png', jpeg: 'image/jpeg', gif: 'image/gif', jpg: 'image/jpg', svg: 'image/svg+xml',}</td>
                    </tr>
                    <tr>
                        <td>imgUnit</td>
                        <td>图片可选单位: 'B'、'KB'、'MB'、'GB'、'TB'</td>
                        <td>String</td>
                        <td>'MB'</td>
                    </tr>
                    <tr>
                        <td>affixSize</td>
                        <td>附件大小限制，单位M</td>
                        <td>Number</td>
                        <td>500</td>
                    </tr>
                    <tr>
                        <td>affixType</td>
                        <td>附件可选类型</td>
                        <td>Object</td>
                        <td>{}</td>
                    </tr>
                    <tr>
                        <td>affixUnit</td>
                        <td>附件可选单位: 'B'、'KB'、'MB'、'GB'、'TB'</td>
                        <td>String</td>
                        <td>'MB'</td>
                    </tr>
                    <tr>
                        <td>isVirtualProgress</td>
                        <td>是否开启虚拟进度</td>
                        <td>Boolean</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>virtualProgressTime</td>
                        <td>虚拟进度时长，单位ms</td>
                        <td>Number</td>
                        <td>2000</td>
                    </tr>
                    <tr>
                        <td>closeDelay</td>
                        <td>进度至100%时或上传完成，不立即关闭窗口，延迟关闭的时长，单位ms</td>
                        <td>Number</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>setMarkdown</td>
                        <td>赋值markdown文本, 通过refs.XX.setMarkdown调用</td>
                        <td>Function</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>getMarkdown</td>
                        <td>获取markdown文本, 通过refs.XX.getMarkdown调用</td>
                        <td>Function</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>codeMirror</td>
                        <td>获取编辑器codeMirror实例，通过refs.XX.codeMirror调用，用于自定义操作</td>
                        <td>Function</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>toolbarDropdownPlugin</td>
                        <td>toolbar下拉菜单栏，会追加到"嵌入"区，如[ {name: '本地视频', handler: () => {}} ]</td>
                        <td>Array</td>
                        <td>[]</td>
                    </tr>
                    <tr>
                        <td>imgUpload</td>
                        <td>图片上传按钮回调，第二个参数接收一个函数，可执行传入进度条的百分比数</td>
                        <td>Function(file, setProgress?) => Promise(url)</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>affixUpload</td>
                        <td>附件上传按钮回调，第二个参数接收一个函数，可执行传入进度条的百分比数</td>
                        <td>Function(file, setProgress?) => Promise(url)</td>
                        <td>-</td>
                    </tr>
                </tbody>
            </table>
            <p class="row-in-round">事件</p>
            <div class="detail-block">
                <table class="salus-table salus-table-hover salus-table-striped">
                    <thead>
                        <tr>
                            <th width="15%">事件名称</th>
                            <th width="70%">说明</th>
                            <th width="15%">回调参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>change</td>
                            <td>markdown文本改变时调用</td>
                            <td>Function(text)</td>
                        </tr>
                        <tr>
                            <td>save</td>
                            <td>markdown文本保存时调用</td>
                            <td>Function(text)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "API",
    }
</script>

<style lang="scss">
</style>
