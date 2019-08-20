/* @kealm/vue-components */
import '@/assets/styles/kealm-components/index.min.css';
import {
    Tooltip,
    Button,
    Modal,
    Form,
    InputNumber,
    Radio,
    Dropdown,
    Menu,
    Input,
    Anchor,
    Alert,
    message,
} from '@kealm/vue-components'

const Components = [
    Tooltip,
    Button,
    Modal,
    Form,
    InputNumber,
    Radio,
    Dropdown,
    Menu,
    Input,
    Anchor,
    Alert
]

export default {
    install: (Vue) => {
        Components.forEach(item => Vue.use(item));
        Vue.prototype.$message = message;
    },
}
