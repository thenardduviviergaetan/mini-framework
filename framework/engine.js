// Create virtual node
export const vNode = (type, props, ...children) => ({ type, props, children });
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
    return vNode(vNodes[0].type, vNodes[0].props, ...children)
}
// Render virtual node
export const render = (vNode) => {
    if (typeof vNode === 'string') {
        return document.createTextNode(vNode);
    }
    const node = document.createElement(vNode.type);
    if (typeof vNode.props === 'object' && vNode.props !== null) {
        for (const [prop, value] of Object.entries(vNode.props)) {
            node[prop] = value;
        }
    }
    for (const child of vNode.children || []) {
        node.appendChild(render(child));
    }
    return node;
};
// Compare new virtual node with old virtual node
export const diff = (v1, v2) => {
    const patches = [];
    if (typeof v1 === 'string' || typeof v2 === 'string') {
        if (v1 !== v2) {
            patches.push({ type: 'TEXT', value: v2 });
        }
    } else if (v1.type !== v2.type) {
        patches.push({ type: 'REPLACE', value: v2 });
    } else if (v1.type === v2.type) {
        if (JSON.stringify(v1.props) !== JSON.stringify(v2.props)) {
            patches.push({ type: 'PROPS', value: v2.props });
        }
        if (JSON.stringify(v1.children) !== JSON.stringify(v2.children)) {
            patches.push({ type: 'CHILDREN', value: v2.children });
        }
    }
    return patches;
};
// Apply patches to the real DOM
export const patch = (node, patches) => {
    for (const patch of patches) {
        console.log(patch.type);
        switch (patch.type) {
            case 'REMOVE':
                node.remove();
                break;
            case 'TEXT':
                node.textContent = patch.value;
                break;
            case 'REPLACE':
                node.parentNode.replaceChild(render(patch.value), node);
                break;
            case 'PROPS':
                for (const [prop, value] of Object.entries(patch.value)) {
                    node[prop] = value;
                }
                break;
            case 'CHILDREN':

                node.textContent = '';
                patch.value.map((child) => {
                    node.appendChild(render(child));
                })
                break;
        }
    }
};
//automate the all engine system to create a component

