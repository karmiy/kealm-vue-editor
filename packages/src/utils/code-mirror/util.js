/**
 * 获取当前行的数据
 */
export function getCurLineContent(mirror) {
    return mirror.getLine(mirror.lineCount() - 1);
}

/**
 * 判断当前行是否为空行
 */
export function curLineEmpty(mirror) {
    return getCurLineContent(mirror) === '';
}