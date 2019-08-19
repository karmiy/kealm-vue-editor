/* code-prettify */
import 'code-prettify';
import 'code-prettify/src/prettify.css';

export default {
    install: Vue => Vue.prototype.prettify = PR.prettyPrint,
}
