import diff_match_patch from 'diff-match-patch';

const dmp = new diff_match_patch();

/**
 * diff 行差异
 * @param text1
 * @param text2
 * @returns {*|*}
 */
export function diff_lineMode(text1, text2) {
    const a = dmp.diff_linesToChars_(text1, text2);
    const lineText1 = a.chars1;
    const lineText2 = a.chars2;
    const lineArray = a.lineArray;
    const diffs = dmp.diff_main(lineText1, lineText2, false);
    dmp.diff_charsToLines_(diffs, lineArray);
    return diffs;
}

/**
 * diff渲染HTML文本
 * @param diff
 */
export function diff_prettyHTML(diff) {
    dmp.diff_cleanupSemantic(diff);
    return dmp.diff_prettyHtml(diff);
}