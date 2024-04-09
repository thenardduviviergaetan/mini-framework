import List from "./components/list.js"

// Create virtual node
const vNode = (type, props, ...children) => ({ type, props, children });

// Render virtual node
const render = (vNode) => {
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
const diff = (v1, v2) => {
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
const patch = (node, patches) => {
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


// // Create a new list
// let myList = new List();

// // Add elements to the list
// myList.addElement("First item");
// myList.addElement("Second item");
// myList.addElement("Third item");

// // Render the list
// let renderedList = render(myList);

// // Append the list to the body of the document
// document.body.appendChild(renderedList);

// // Create a new list
// let myList2 = new List();

// // Add elements to the list
// myList2.addElement("First item");
// myList2.addElement("Second item");
// myList2.addElement("Third item");
// myList2.addElement("Fourth item");

// // Render the list
// let renderedList2 = render(myList2);
// console.log(renderedList2);

// // Compare the two lists
// const patches = diff(myList, myList2);

// // Apply the patches to the real DOM
// patch(renderedList, patches);

// const v1 = vNode('div', {id: 'app'}, "hello")

// const node = render(v1)

// document.body.appendChild(node)

// const v2 = vNode('div', {id: 'app2'}, "Bye", "aaaaa")

// const patches = diff(v1, v2)

// patch(node, patches)


// const p = vNode('p', { id: 'p' }, "Hello")
// const pp = vNode('pp', { id: 'pp' }, "world", "test")

// const container = vNode('div', { id: 'container' }, pp, p)
// const c = vNode('div', { id: 'a' }, "aaaaaaaaaaaaaaa")

// const v1 = vNode('div', { id: 'app' }, container, "Hello", vNode('a', {href: "https://google.com"}, 'link'))

// const node = render(v1)

// document.body.appendChild(node)

// const p2 = vNode('p', { id: 'p' }, "Bye")

// const container2 = vNode('div', { id: 'container' }, p2)

// const v2 = vNode('div', { id: 'app' }, "tres", container2)

// const patches = diff(v1, v2)

// patch(node, patches)