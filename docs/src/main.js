if (module.hot) {
    module.hot.accept();
}
import Vue from 'vue';
import App from './app.vue';
import router from './router'
import './assets/styles/common';
import './assets/styles/components/index.min.css'

// 安装组件库
import {
    Modal,
    Tabs, // doc
    Row,
    Col,
    Tree,
    Collapse,
} from '@kealm/vue-components'

const Components = [
    Tabs, // doc
    Row,
    Col,
    Tree,
    Collapse
]

Components.forEach(item => {
    Vue.use(item);
})
Vue.prototype.$confirm = Modal.confirm; // doc

// 安装编辑器
import KealmEditor from '@kealm/vue-editor';
import '@kealm/vue-editor/styles/index.min.css'
Vue.use(KealmEditor);

// 安装 highlight
import VueHighlightJS from 'vue-highlightjs'
Vue.use(VueHighlightJS)

new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    render: h => h(App),
})

