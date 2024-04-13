// Component de bas extends de tout les component
export default class Component {
    constructor(type, props, children) {
        this.type = type;
        this.props = props !== undefined ? props : {};
        this.children = children !== undefined ? children : [];
    }
    className(...classList) {
        this.props.className += ' ' + classList.join(" ")
    }
    addElement(child) {
        this.children.push(child);
    }

    clearChildren(){
        for (let child of this.children) {
            child.remove();
        }
    }


    onClick(func) {
        this.props.onclick = (event) => {
            event.preventDefault();
            func(event);
        };
    }
    onChange(func) {
        this.props.onchange = (event) => {
            event.preventDefault();
            func(event);
        };
    }
    ondblClick(func) {
        this.props.ondblclick = (event) => {
            event.preventDefault();
            func(event);
        };
    }
    onSubmit(func) {
        this.props.onsubmit = (event => {
            event.preventDefault();
            func(event.target);
            event.target.children[0].value = ''
        });
    }
}

// import { diff, patch, render } from '../framework/engine.js';
// export default class Component {
//     constructor(props) {
//         this.props = props;
//         this.state = this.initState();
//     }

//     initState() {
//         // Override this method in subclasses to initialize state
//         return {};
//     }

//     render() {
//         // Override this method in subclasses to define what the component renders
//         return '';
//     }

//     setState(newState) {
//         this.state = { ...this.state, ...newState };
//         // Re-render the component whenever state changes
//         this.update();
//     }

    // update() {
    //     // Diff the old and new virtual nodes and patch the real DOM with the changes
    //     const oldVNode = this.vNode;
    //     this.vNode = this.render();
    //     const patches = diff(oldVNode, this.vNode);
    //     patch(this.domNode, patches);
    // }

//     mount() {
//         // Render the component for the first time and save the resulting virtual node and real DOM node
//         this.vNode = this.render();
//         this.domNode = render(this.vNode);
//         return this.domNode;
//     }
// }

