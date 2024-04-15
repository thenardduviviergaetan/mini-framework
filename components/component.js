// Component de bas extends de tout les component
import { diff, patch, render } from '../framework/engine.js';
export default class Component {
    constructor(tag, props = {}, children = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
        this.state = this.initState();
        this.domNode = render(this);
    }

    className(...classList) {
        this.props.className += ' ' + classList.join(" ")
    }

    addElement(...children) {
        this.children.push(...children);
    }

    initState() {
        // Override this method in subclasses to initialize state
        return {};
    }

    render() {
        // Override this method in subclasses to define what the component renders
        return '';
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        // Re-render the component whenever state changes
        this.update();
    }

    update(data) {
        // Diff the old and new virtual nodes and patch the real DOM with the changes
        const oldVNode = this.vNode;
        this.vNode = this.render();
        const patches = diff(oldVNode, this.vNode);
        patch(this.domNode, patches);
    }

    // mount() {
    //     // Render the component for the first time and save the resulting virtual node and real DOM node
    //     this.vNode = this.render();
    //     this.domNode = render(this.vNode);
    // }

    actionListener(eventType, func) {
        this.props[`on${eventType}`] = (event) => {
            event.preventDefault();
            func(event.target);
            if (eventType === 'submit') {
                event.target.reset();
            }
        };
    }
}

