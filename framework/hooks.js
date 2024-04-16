import { vNode } from "./engine.js";

export const useState = (defaultValue) => {
    let value = defaultValue;
    const getValue = () => value
    const setValue = newValue => value = newValue
    return [getValue, setValue];
}


/**
 * Function to created nested components
 * The first element of each array will be the parent Node of the following elements in 
 * each array. 
 * @param {Array<VirtualNode>} vNodes - list of DOM virtual Nodes
*/
export const createNestedChild = (...vNodes) => {
    let children = [];
    for (let i = 1; i < vNodes.length; i++) {
        children.push(vNodes[i])
    }
    return vNode(vNodes[0].tag, vNodes[0].props, ...children)
}