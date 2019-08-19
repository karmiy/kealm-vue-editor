import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const routes = [
    {
        path: '/',
        redirect: '/editor-doc'
    },
    {
        path: '/editor-doc',
        component: () => import(/* webpackChunkName: "editor-doc" */ '@/views/editor-doc'),
        children: [
            {
                path: '',
                redirect: '/editor-doc/quick-start',
            },
            {
                path: 'quick-start',
                component: () => import(/* webpackChunkName: "editor-doc-quick-start" */ '@/views/editor-doc/docs/quick-start'),
            },
            {
                path: 'base-use',
                component: () => import(/* webpackChunkName: "editor-doc-base-use" */ '@/views/editor-doc/docs/base-use'),
            },
            {
                path: 'img-preview',
                component: () => import(/* webpackChunkName: "editor-doc-img-preview" */ '@/views/editor-doc/docs/img-preview'),
            },
            {
                path: 'v-model',
                component: () => import(/* webpackChunkName: "editor-doc-v-model" */ '@/views/editor-doc/docs/v-model'),
            },
            {
                path: 'manual-assignment',
                component: () => import(/* webpackChunkName: "editor-doc-manual-assignment" */ '@/views/editor-doc/docs/manual-assignment'),
            },
            {
                path: 'manual-value',
                component: () => import(/* webpackChunkName: "editor-doc-manual-value" */ '@/views/editor-doc/docs/manual-value'),
            },
            {
                path: 'codeMirror-option',
                component: () => import(/* webpackChunkName: "editor-doc-codeMirror-option" */ '@/views/editor-doc/docs/codeMirror-option'),
            },
            {
                path: 'marked-option',
                component: () => import(/* webpackChunkName: "editor-doc-marked-option" */ '@/views/editor-doc/docs/marked-option'),
            },
            {
                path: 'markdown-pipe',
                component: () => import(/* webpackChunkName: "editor-doc-markdown-pipe" */ '@/views/editor-doc/docs/markdown-pipe'),
            },
            {
                path: 'html-pipe',
                component: () => import(/* webpackChunkName: "editor-doc-html-pipe" */ '@/views/editor-doc/docs/html-pipe'),
            },
            {
                path: 'contrast-diff',
                component: () => import(/* webpackChunkName: "editor-doc-contrast-diff" */ '@/views/editor-doc/docs/contrast-diff'),
            },
            {
                path: 'embed-dropdown-groups',
                component: () => import(/* webpackChunkName: "editor-doc-embed-dropdown-groups" */ '@/views/editor-doc/docs/embed-dropdown-groups'),
            },
            {
                path: 'custom-toolbars',
                component: () => import(/* webpackChunkName: "editor-doc-custom-toolbars" */ '@/views/editor-doc/docs/custom-toolbars'),
            },
            {
                path: 'file-upload-limit',
                component: () => import(/* webpackChunkName: "editor-doc-file-upload-limit" */ '@/views/editor-doc/docs/file-upload-limit'),
            },
            {
                path: 'virtual-progress',
                component: () => import(/* webpackChunkName: "editor-doc-virtual-progress" */ '@/views/editor-doc/docs/virtual-progress'),
            },
            {
                path: 'file-upload-callback',
                component: () => import(/* webpackChunkName: "editor-doc-file-upload-callback" */ '@/views/editor-doc/docs/file-upload-callback'),
            },
            {
                path: 'sidebar-tree',
                component: () => import(/* webpackChunkName: "editor-doc-sidebar-tree" */ '@/views/editor-doc/docs/sidebar-tree'),
            },
            {
                path: 'api',
                component: () => import(/* webpackChunkName: "editor-doc-api" */ '@/views/editor-doc/docs/api'),
            },
        ],
    },
];

const router = new Router({
    linkActiveClass: 'active',
    routes
})
export default router
