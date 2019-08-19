import { trim } from './base';
/**
 * polyfill getComputedStyle
 * @param dom: DOMElement
 * @returns {function}
 */
export function DOMComputedStyle(dom) {
    return getComputedStyle ? getComputedStyle(dom) : dom.currentStyle;
}

/**
 * 添加样式
 * @param el: DOMElement
 * @param cls: string，如'k kk kkk'
 */
export function addClass(el, cls) {
    if (!el) return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');

    for (var i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.add(clsName);
        } else if (!hasClass(el, clsName)) {
            curClass += ' ' + clsName;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}

/**
 * 移除样式
 * @param el: DOMElement
 * @param cls: string，如'k kk'
 */
export function removeClass(el, cls) {
    if (!el || !cls) return;
    const classes = cls.split(' ');
    let curClass = ' ' + el.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName) continue;

        if (el.classList) {
            el.classList.remove(clsName);
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(' ' + clsName + ' ', ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}

/**
 * 是否包含某样式
 * @param el: DOMElement
 * @param cls: string
 * @returns {boolean}
 */
export function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    } else {
        return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }
};

/**
 * 获取元素到body顶部的距离
 * @param dom
 * @returns {{top: number, left: number}}
 */
export function getOffset(dom){
    let o = {left:0 ,top: 0};
    while(dom !== document.body){
        o.top  += dom.offsetTop;
        o.left += dom.offsetLeft;
        dom = dom.offsetParent;
    }
    return o;
};

/**
 * 全屏显示
 * @param el，要全屏显示的dom
 */
export function fullScreen(el) {
    const isFullscreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
    if(!isFullscreen) {
        (el.requestFullscreen && el.requestFullscreen()) ||
        (el.mozRequestFullScreen && el.mozRequestFullScreen()) ||
        (el.webkitRequestFullscreen && el.webkitRequestFullscreen()) || (el.msRequestFullscreen && el.msRequestFullscreen());
    }else {
        document.exitFullscreen ?
            document.exitFullscreen():
            document.mozCancelFullScreen ? document.mozCancelFullScreen():
                document.webkitExitFullscreen ? document.webkitExitFullscreen() : '';
    }
}

/**
 * 获取translate
 * @param dom
 * @returns {{x: number, y: number}}
 */
export const getTranslate = dom => {
    const transform = DOMComputedStyle(dom).transform;
    if(transform === 'none') return {x: 0, y: 0};
    const trans = transform.slice(7, -1).split(',');
    return {
        x: +trans[4],
        y: +trans[5],
    }
}

/**
 * 设置translate
 * @param dom
 * @param options
 */
export const setTranslate = (dom, options = {}) => {
    const { x, y } = options;
    const transform = DOMComputedStyle(dom).transform;
    const trans = transform === 'none' ? [1, 0, 0, 1, 0, 0] : transform.slice(7, -1).split(',');
    x !== undefined && (trans[4] = x);
    y !== undefined && (trans[5] = y);
    dom.style.transform = `matrix(${trans.toString()})`
}
