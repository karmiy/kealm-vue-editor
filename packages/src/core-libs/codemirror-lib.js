/* codemirror */
import Codemirror from 'codemirror/lib/codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/railscasts.css';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/addon/edit/continuelist'; // 列表enter换行自动补上-
import 'codemirror/addon/edit/matchbrackets'; // 鼠标点到某个括号时，自动高亮与之匹配的那个括号
import 'codemirror/addon/edit/closebrackets'; // 打(，自动补全)
import 'codemirror/keymap/sublime';

export default {
    install: Vue => Vue.prototype.CodeMirror = Codemirror,
}
