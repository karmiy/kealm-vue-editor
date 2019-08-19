import { DOMComputedStyle, getTranslate, setTranslate, addClass, removeClass, hasClass } from './dom';

/**
 * 获取元素滚动量
 * @param target: DOMElement
 * @param top: boolean 垂直/水平
 * @returns {number}
 */
export function getScroll(target, top) {
    if (typeof window === 'undefined') {
        return 0;
    }

    const prop = top ? 'pageYOffset' : 'pageXOffset';
    const method = top ? 'scrollTop' : 'scrollLeft';
    const isWindow = target === window;

    let ret = isWindow ? target[prop] : target[method];
    // ie6,7,8 standard mode
    if (isWindow && typeof ret !== 'number') {
        ret = window.document.documentElement[method];
    }

    return ret;
}

/**
 * 判断元素是否是滚动元素
 * @param target: DOMElement
 * @param direction: 'X' | 'Y' | undefined，方向
 * @returns {boolean}
 */
export function isScrollTarget(target, direction = '') {
    if(!target)
        return false;
    const overflow = DOMComputedStyle(target)[`overflow${direction}`];
    return (overflow.indexOf('auto') !== -1 || overflow.indexOf('scroll') !== -1) && (target.scrollHeight > target.clientHeight);
}

/**
 * 获取浏览器的滚动条宽度
 * @param fresh: boolean，true重新计算滚动条宽度，false取缓存值
 * @returns {number}
 */
let cached;

export function getScrollBarSize(fresh) {
    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
}

/**
 * 滚动条到可视区域
 * @param container: DOMElement，滚动容器
 * @param selected: DOMElement，容器的某个子元素，selected为undefined时container滚动到0的位置，否则滚动到使selected可视的区域
 */
export function scrollIntoView(container, selected) {
    if (!selected) {
        container.scrollTop = 0;
        return;
    }
    let transientPosition = false;
    if (getComputedStyle(container).position === 'static') {
        container.style.position = 'relative';
        transientPosition = true;
    }
    const offsetParents = [];
    let pointer = selected.offsetParent;
    while (pointer && container !== pointer && container.contains(pointer)) {
        offsetParents.push(pointer);
        pointer = pointer.offsetParent;
    }
    const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0);
    const bottom = top + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;

    if (top < viewRectTop) {
        container.scrollTop = top;
    } else if (bottom > viewRectBottom) {
        container.scrollTop = bottom - container.clientHeight;
    }
    if (transientPosition) {
        container.style.position = '';
    }
}

/**
 * 绑定滚动事件
 * @param ele
 * @param eFn
 */
export function mouseWheel(ele, eFn) {
    function fn(e){
        e = e || window.event;
        //让滚动方向统一 （向上滚动>0、向下滚动<0）
        let direction = e.wheelDelta / 120 || -e.detail / 3;
        eFn.call(ele, e, direction);
    }
    //判断是否是火狐浏览器
    let type = document.onmousewheel === null? 'mousewheel' : 'DOMMouseScroll';
    //判断是否是IE8
    window.addEventListener ? ele.addEventListener(type, fn)
        : ele.attachEvent('on' + type, fn);
}


/**
 * 判断浏览器是否有滚动条
 * @returns {boolean}
 */
export function windowScroll() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
}

/**
 * 自适应滚动效果
 * @param container 放置2个按钮、滚动容器的元素
 * @param prev_tab 滚动控制器prev，要求绝对定位
 * @param next_tab 滚动控制器next，要求绝对定位
 * @param scroll_wrap 滚动容器
 * @param options 配置: {position?, speed?}
 */
export function scrollAdaptation(container, prev_tab, next_tab, scroll_wrap, options = { position: 'horizontal', speed: 70 }) {
    const { speed, position } = options;
    const isHoriz = position === 'horizontal';
    const _pos = isHoriz ? ['Left', 'Right'] : ['Top', 'Bottom'],
        _attr = isHoriz ? 'Width' : 'Height';
    const tabArea = prev_tab[`offset${_attr}`]; // 按钮宽/高，用于填充container padding
    const inner_wrap = scroll_wrap.children[0]; // 真实宽高容器
    const scope = {
        get max() {
            return 0
        },
        get min() {
            return scroll_wrap[`client${_attr}`] - inner_wrap[`offset${_attr}`];
        },
        get hasScroll() {
            return inner_wrap[`offset${_attr}`] - container[`client${_attr}`] > 0;
        }
    }
    // tab dom 绑定自定义状态切换属性
    prev_tab.toggleStatus = next_tab.toggleStatus = function(status) {
        switch (status) {
            case 'show':
                Object.assign(this.style, { [_attr.toLocaleLowerCase()]: ``, opacity: '1' });
                addClass(this, 'show');
                removeClass(this, 'hidden');
                break;
            case 'hidden':
                Object.assign(this.style, { [_attr.toLocaleLowerCase()]: '0', opacity: '0' });
                addClass(this, 'hidden');
                removeClass(this, 'show');
                break;
        }
    }
    prev_tab.toggleDisabled = next_tab.toggleDisabled = function(isDisabled) {
        isDisabled ? addClass(this, 'disabled') : removeClass(this, 'disabled');
    }
    // inner_wrap.style.transform = 'matrix(1, 0, 0, 1, -20, 0)';
    const init = () => {
        // 外层容器padding过渡效果
        container.style.transition = 'padding .5s';

        // 真实滑块容器translate过渡效果
        inner_wrap.style.transition = 'transform .5s';

        // 按钮设置宽度0，透明度0
        prev_tab.toggleStatus('hidden');
        prev_tab.toggleDisabled(true);
        next_tab.toggleStatus('hidden');

        // 滚动容器超出隐藏
        DOMComputedStyle(scroll_wrap).overflow === 'hidden' && (scroll_wrap.style.overflow = 'hidden');
        // 如果内容超出，显示控制按钮，
        if(scope.hasScroll) {
            setTimeout(() => {
                // 按钮宽高、透明度过渡效果
                prev_tab.style.transition = next_tab.style.transition = `${_attr.toLocaleLowerCase()} .5s, opacity .5s`;
                prev_tab.toggleStatus('show');
                next_tab.toggleStatus('show');
                Object.assign(container.style, { [`padding${_pos[0]}`]: `${tabArea}px`, [`padding${_pos[1]}`]: `${tabArea}px` });
            })
        }
    }
    const initTabsEvent = () => {
        [prev_tab, next_tab].forEach((item, index) => {
            item.index = index;
            item.sibling = index === 0 ? next_tab : prev_tab;
            item.onclick = function () {
                if(hasClass(this, 'disabled')) return;
                const _value = this.index === 0 ?
                    Math.min(getTranslate(inner_wrap)[isHoriz ? 'x' : 'y'] + speed, scope.max)
                    :
                    Math.max(getTranslate(inner_wrap)[isHoriz ? 'x' : 'y']  - speed, scope.min);
                setTranslate(inner_wrap, {
                    x: isHoriz ? _value : 0,
                    y: !isHoriz ? _value : 0,
                });
                if(_value === scope.max || _value === scope.min) {
                    this.toggleDisabled(true);
                    this.sibling.toggleDisabled(false);
                }else {
                    this.toggleDisabled(false);
                    this.sibling.toggleDisabled(false);
                }
            }
        })
    }
    const initContainerEvent = () => {
        // 点击容器时，发现不需要滑块时则隐藏，需要则打开
        container.onclick = function() {
            if(scope.hasScroll && hasClass(prev_tab, 'hidden')) {
                prev_tab.toggleStatus('show');
                prev_tab.toggleDisabled(true);
                next_tab.toggleStatus('show');
                next_tab.toggleDisabled(false);
                setTranslate(inner_wrap, { x: 0, y: 0, });
                Object.assign(container.style, { [`padding${_pos[0]}`]: `${tabArea}px`, [`padding${_pos[1]}`]: `${tabArea}px` });
            }else if(!scope.hasScroll && hasClass(prev_tab, 'show')) {
                prev_tab.toggleStatus('hidden');
                prev_tab.toggleDisabled(false);
                next_tab.toggleStatus('hidden');
                next_tab.toggleDisabled(false);
                setTranslate(inner_wrap, { x: 0, y: 0, });
                Object.assign(container.style, { [`padding${_pos[0]}`]: '0', [`padding${_pos[1]}`]: '0' });
            }
        }
    }
    // 初始化控件
    init();
    // 初始化按钮点击事件
    initTabsEvent();
    // 初始化容器点击事件
    initContainerEvent();
}
