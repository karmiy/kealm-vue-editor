import Vue from 'vue';
import { transform, isEqual, isObject } from 'lodash-es';
import {getParent} from "@/utils/common/tree";

const toString = Object.prototype.toString;

/**
 * 是否为数组
 */
export const isArray = Array.isArray || function(value) {
    return toString.call(value) === '[object Array]';
}

/**
 * 是否为函数
 */
export const isFunction = value => toString.call(value) === '[object Function]';

/**
 * 是否为整数
 */
export const isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

/**
 * 是否为IE
 */
export const isIE = function() {
    return !Vue.prototype.$isServer && !isNaN(Number(document.documentMode));
};

/**
 * 是否为Edge
 */
export const isEdge = function() {
    return !Vue.prototype.$isServer && navigator.userAgent.indexOf('Edge') > -1;
};

/**
 * 修改对象的属性名（用于调整后台传来的属性名）
 * @param obj: 对象 -- object
 * @param propNames：-- Array，如：[['uid', 'id'], ['uname': 'name']]，uid属性名转id，uname属性名转name
 */
export const adjustPropName = (obj, propNames) => {
    if(!isArray(propNames))
        return;
    propNames.forEach(propArr => {
        const [fromPropName, toPropName] = propArr;
        if(obj[fromPropName]) {
            obj[toPropName] = obj[fromPropName];
            delete obj[fromPropName];
        }
    })
}

/**
 * 批量调整树数据节点属性名
 * @param tree
 * @param propNames
 * @param each
 */
export const adjustTreePropBatch = (tree, propNames, each) => {
    tree.forEach(item => {
        adjustPropName(item, propNames);
        each && each(item);
        if(item.children) {
            adjustTreePropBatch(item.children, propNames, each);
        }
    })
}

/**
 * 深度对比两个对象差异
 * @param object
 * @param base
 */
export const deepDifference = (object, base) => {
    function changes(object, base) {
        return transform(object, function(result, value, key) {
            if (!isEqual(value, base[key])) {
                result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value;
            }
        });
    }
    return changes(object, base);
}
/**
 * diff children，找到每个child有变化的进行回调
 * @param target
 * @param source
 */
export const differenceChildren = (target, source, {beforeCallback, afterCallback, isDeep = false, key = 'id'}) => {
    target.forEach(child => {
        const sChild = source.find(item => item[key] === child[key]);
        // 如果有先进行处理，则使用处理返回的2个对象进行比较
        const [compareChild, compareSChild] = beforeCallback ? beforeCallback(child, sChild) : [child, sChild];
        isDeep ?
            afterCallback && afterCallback(child, sChild, deepDifference(compareChild, compareSChild))
            :
            afterCallback && afterCallback(child, sChild, !isEqual(compareChild, compareSChild));
    })
}

/**
 * 数据缓存驱动
 */
export const dataTickStorage = ($vue, vDataName, storageName, api, params, callback) => {
    const storage = window.localStorage.getItem(storageName);
    // 如果有缓存数据，先取缓存再另外请求查看是否有变化，没有缓存直接请求
    storage ?
        ($vue[vDataName] = JSON.parse(storage), requestTickStorage(storageName, api, params, (data, isDiff) => { isDiff && ($vue[vDataName] = data); callback && callback(data); }))
        :
        requestTickStorage(storageName, api, params, data => { $vue[vDataName] = data; callback && callback(data); });
}

/**
 * 请求缓存驱动
 */
export const requestTickStorage = (storageName, api, params, callback) => {
    api(params).then(data => {
        if(data.returnCode === 1) {
            // 缓存数据与请求数据不一样则重新给缓存赋值
            const storage = JSON.parse(window.localStorage.getItem(storageName));
            const isDiff = !isEqual(storage, data.content);
            if(isDiff) {
                window.localStorage.setItem(storageName, JSON.stringify(data.content));
                callback && callback(data.content, true);
            }else {
                callback && callback(data.content, false);
            }
        }else {
            Vue.prototype.$message['error'](data.returnMsg, {pos: 'topCenter'});
        }
    }).catch(err => {
        console.log(err);
        Vue.prototype.$message['error']('请求出错!', {pos: 'topCenter'});
    })
}

/**
 * 根据name获取父组件实例
 */
export const getParentComponent = (self, name) => {
    if(!self.$parent) return null;
    let parent = self.$parent;
    if(parent && parent.$options.name === name) return parent;
    return getParentComponent(parent, name);
}
