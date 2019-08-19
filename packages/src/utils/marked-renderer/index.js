const baseUrls = {};
const originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function resolveUrl(base, href) {
    if (!baseUrls[' ' + base]) {
        // we can ignore everything in base after the last slash of its path component,
        // but we might need to add _that_
        // https://tools.ietf.org/html/rfc3986#section-3
        if (/^[^:]+:\/*[^/]*$/.test(base)) {
            baseUrls[' ' + base] = base + '/';
        } else {
            baseUrls[' ' + base] = rtrim(base, '/', true);
        }
    }
    base = baseUrls[' ' + base];
    const relativeBase = base.indexOf(':') === -1;

    if (href.slice(0, 2) === '//') {
        if (relativeBase) {
            return href;
        }
        return base.replace(/^([^:]+:)[\s\S]*$/, '$1') + href;
    } else if (href.charAt(0) === '/') {
        if (relativeBase) {
            return href;
        }
        return base.replace(/^([^:]+:\/*[^/]*)[\s\S]*$/, '$1') + href;
    } else {
        return base + href;
    }
}
function cleanUrl(sanitize, base, href) {
    if (sanitize) {
        let prot = '';
        try {
            prot = decodeURIComponent(unescape(href))
                .replace(/[^\w:]/g, '')
                .toLowerCase();
        } catch (e) {
            return null;
        }
        if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
            return null;
        }
    }
    if (base && !originIndependentUrl.test(href)) {
        href = resolveUrl(base, href);
    }
    try {
        href = encodeURI(href).replace(/%25/g, '%');
    } catch (e) {
        return null;
    }
    return href;
}
/**
 * 任务代办
 * @param renderer
 */
const taskToDo = (renderer) => {
    // renderer.list = (body, ordered, start) => {
    //     if(!ordered) {
    //         // 替换图标
    //         body = body.replace(/<li><input checked="" disabled="" type="checkbox">((.|\n)*)<\/li>/, '<li style="list-style: none;"><i class="salus-icon-setting-o"></i>$1</li>');
    //         // 截取task todo的li
    //         const startTodoIndex = body.indexOf('<li style="list-style: none;">');
    //         const endTodoIndex = body.indexOf('</li>', startTodoIndex);
    //         const storeToDoBody = body.slice(startTodoIndex, endTodoIndex + 5);
    //         const storeBodyForBr = storeToDoBody.replace(/\n/g, (item, index) => {
    //             if(storeToDoBody.slice(index + 1) === '</li>') {
    //                 return '';
    //             }else {
    //                 return '<br>';
    //             }
    //         });
    //         body = body.replace(storeToDoBody, storeBodyForBr);
    //     }
    //     const type = ordered ? 'ol' : 'ul',
    //         start_at = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    //     return '<' + type + start_at + '>\n' + body + '</' + type + '>\n';
    // }
    /*renderer.listitem = function(text) {
        text = text.replace(/<input checked="" disabled="" type="checkbox">/, '<li style="list-style: none;"><i class="salus-icon-setting-o"></i>$1</li>');
        // 截取task todo的li
        const startTodoIndex = body.indexOf('<li style="list-style: none;">');
        const endTodoIndex = body.indexOf('</li>', startTodoIndex);
        const storeToDoBody = body.slice(startTodoIndex, endTodoIndex + 5);
        const storeBodyForBr = storeToDoBody.replace(/\n/g, (item, index) => {
            if(storeToDoBody.slice(index + 1) === '</li>') {
                return '';
            }else {
                return '<br>';
            }
        });
        body = body.replace(storeToDoBody, storeBodyForBr);
        return '<li>' + text + '</li>\n';
    }*/
}

/**
 * li列表
 * @param renderer
 */
const listItem = (renderer) => {
    renderer.listitem = function(text) {
        if(text.includes('<input checked="" disabled="" type="checkbox">'))
            return '<li class="task">' + text + '</li>\n';
        return '<li>' + text + '</li>\n';
    }
}

/**
 * 图表
 * @param renderer
 */
const code = (renderer) => {
    renderer.code = function(code, infoString, escaped) {
        const lang = (infoString || '').match(/\S*/)[0];
        if (this.options.highlight) {
            const out = this.options.highlight(code, lang);
            if (out != null && out !== code) {
                escaped = true;
                code = out;
            }
        }
        if (!lang) {
            return '<pre class="prettyprint linenums"><code>'
                + code
                + '</code></pre>';
        }

        // 流程图、时序图
        if(lang === 'flow' || lang === 'sequence') {
            return '<div class="mermaid">'
                + code
                + '</div>\n';
        }

        return '<pre><code class="'
            + this.options.langPrefix
            + lang
            + '">'
            + code
            + '</code></pre>\n';
    }
}

/**
 * 链接
 * @param renderer
 */
const link = (renderer) => {
    renderer.link = function(href, title, text) {
        if(title) {
            return `${text.includes('.') ? '<i class="link-icon salus-icon-link-o"></i>' : ''}<a href="${href}" title="${title}" target="_blank" download="${text}">${text}</a>`;
        }
        return `${text.includes('.') ? '<i class="link-icon salus-icon-link-o"></i>' : ''}<a href="${href}" target="_blank" download="${text}">${text}</a>`;
    }
}

/**
 * 段落
 * @param renderer
 */
const paragraph = (renderer) => {
    function splitImage(text) {
        const matchGroup = text.match(/^(.+)<br>(<img.+)$/);
        if(!matchGroup)
            return '<p>' + text + '</p>';
        return splitImage(matchGroup[1]) + '<p>' + matchGroup[2] + '</p>';
    }
    renderer.paragraph = function(text) {
        // 段落中有图片特殊处理：图片与之上方的文本，原本是<br>换行，现拆为2个<p>分割
        const _text = splitImage(text);
        // return '<p>' + text + '</p>\n';
        return _text + '\n';
    }
}

/**
 * 图片
 * @param renderer
 */
const image = (renderer) => {
    renderer.image = function(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
            return text;
        }

        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? '/>' : '>';
        return out;
    }
}

const renderPlugins = renderer => {
    // taskToDo(renderer);
    code(renderer);
    link(renderer);
    listItem(renderer);
    paragraph(renderer);
    // image(renderer);
}

export default renderPlugins;