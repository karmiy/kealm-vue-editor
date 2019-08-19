import KealmLib from './kealm-lib';
import CodeMirrorLib from './codemirror-lib';
import MarkedLib from './marked-lib';
import CodePrettifyLib from './code-prettify-lib'
import MermaidLib from './mermaid-lib'
import EditorLib from './editor-lib';

const libs = [
    KealmLib,
    CodeMirrorLib,
    MarkedLib,
    CodePrettifyLib,
    MermaidLib,
    EditorLib,
]

export default {
    install: Vue => {
        libs.forEach(item => Vue.use(item));
    }
}
