const treeData = [
    {
        title: 'doc',
        key: '1',
        type: 'folder',
        scopedSlots: {title: 'title'},
        children: [
            {
                title: 'props',
                key: '10',
                type: 'folder',
                scopedSlots: {title: 'title'},
                children: [
                    { title: 'defaultValue', key: '99', type: 'article', scopedSlots: {title: 'title'}, content: '## defaultValue' },
                    { title: 'value', key: '100', type: 'article', scopedSlots: {title: 'title'}, content: '## value' },
                    { title: 'codeMirrorOptions', key: '101', type: 'article', scopedSlots: {title: 'title'}, content: '## codeMirrorOptions' },
                    { title: 'markedOptions', key: '102', type: 'article', scopedSlots: {title: 'title'}, content: '## markedOptions' },
                    { title: 'markdownPipe', key: '103', type: 'article', scopedSlots: {title: 'title'}, content: '## markdownPipe' },
                    { title: 'htmlPipe', key: '104', type: 'article', scopedSlots: {title: 'title'}, content: '## htmlPipe' },
                    { title: 'toolbarClass', key: '105', type: 'article', scopedSlots: {title: 'title'}, content: '## toolbarClass' },
                    { title: 'contentClass', key: '106', type: 'article', scopedSlots: {title: 'title'}, content: '## contentClass' },
                    { title: 'prevMarkedString', key: '107', type: 'article', scopedSlots: {title: 'title'}, content: '## prevMarkedString' },
                    { title: 'nextMarkedString', key: '108', type: 'article', scopedSlots: {title: 'title'}, content: '## nextMarkedString' },
                    { title: 'imgSize', key: '109', type: 'article', scopedSlots: {title: 'title'}, content: '## imgSize' },
                    { title: 'imgType', key: '110', type: 'article', scopedSlots: {title: 'title'}, content: '## imgType' },
                    { title: 'imgUnit', key: '111', type: 'article', scopedSlots: {title: 'title'}, content: '## imgUnit' },
                    { title: 'affixSize', key: '112', type: 'article', scopedSlots: {title: 'title'}, content: '## affixSize' },
                    { title: 'affixType', key: '113', type: 'article', scopedSlots: {title: 'title'}, content: '## affixType' },
                    { title: 'affixUnit', key: '114', type: 'article', scopedSlots: {title: 'title'}, content: '## affixUnit' },
                    { title: 'isVirtualProgress', key: '115', type: 'article', scopedSlots: {title: 'title'}, content: '## isVirtualProgress' },
                    { title: 'virtualProgressTime', key: '116', type: 'article', scopedSlots: {title: 'title'}, content: '## virtualProgressTime' },
                    { title: 'closeDelay', key: '117', type: 'article', scopedSlots: {title: 'title'}, content: '## closeDelay' },
                    { title: 'setMarkdown', key: '118', type: 'article', scopedSlots: {title: 'title'}, content: '## setMarkdown' },
                    { title: 'getMarkdown', key: '119', type: 'article', scopedSlots: {title: 'title'}, content: '## getMarkdown' },
                    { title: 'toolbarDropdownPlugin', key: '120', type: 'article', scopedSlots: {title: 'title'}, content: '## toolbarDropdownPlugin' },
                    { title: 'imgUpload', key: '121', type: 'article', scopedSlots: {title: 'title'}, content: '## imgUpload' },
                    { title: 'affixUpload', key: '122', type: 'article', scopedSlots: {title: 'title'}, content: '## affixUpload' },
                ],
            },
            {
                title: 'events',
                key: '20',
                type: 'folder',
                scopedSlots: {title: 'title'},
                children: [
                    { title: 'change', key: '200', type: 'article', scopedSlots: {title: 'title'}, content: '## change' },
                    { title: 'save', key: '201', type: 'article', scopedSlots: {title: 'title'}, content: '## save' },
                ],
            },
        ],
    },
]
export default treeData;