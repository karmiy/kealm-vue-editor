/* marked */
import Marked from 'marked';

export default {
    install: Vue => Vue.prototype.Marked = Marked,
}
