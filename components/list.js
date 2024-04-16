import Component from "./component.js"
// import Counter from "./counter.js"
import { render, diff, patch } from "../framework/engine.js"
import { useState } from "../framework/hooks.js"
// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
        this.props.className = "list"
        this.domNode = render(this)
        this.memoryChildren = [];
        // this.counter = new Counter({ id: "counter" }, this.children.length)
    }
    async update(task) {
        this.oldNode = this.domNode;
        const element = new ListElement(task, this);
        this.children.push(element);
        this.memoryChildren.push(element);
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById('list');
        await patch(rootNode, patches);
        this.domNode = render(this);
        // this.counter.updateCount(this.children.length)
    }
    async filter(etats) {
        this.oldNode = this.domNode;
        this.children = [];
        if (etats !== "all") {
            this.memoryChildren.forEach((element) => {
                if (element.state() === etats) {
                    this.children.push(element)
                }
            })
        } else {
            this.children = [...this.memoryChildren]
        }
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById('list');
        await patch(rootNode, patches);
        this.domNode = render(this);
    }
    async clearCompleted() {
        this.oldNode = this.domNode;
        this.children = [...this.memoryChildren]
        this.memoryChildren.forEach((element) => {
            if (element.state() === true) {
                element.destroy();  
            }
        })
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById('list');
        await patch(rootNode, patches);
        this.domNode = render(this);
    }
}

class ListElement extends Component {
    constructor(content, parent) {
        super("li")
        this.props.className = "list_element"
        this.children = this.render(content, parent);
        // this.state = this.initState();
        this.domNode = render(this)
        this.parent = parent;
        [this.state, this.setState] = useState(false)
    }

    // initState() {
    //     return { checked: false}
    // }

    // async setState(newState) {
    //     this.state = { ...this.state, ...newState };
    //   
    // }

    render(content) {
        // const [state,setState] = useState(false)

        const div = new Component("div", { className: "view" })
        const input = new Component("input", { className: "toggle", type: "checkbox" })
        const label = new Component("label", {}, [content])
        input.actionListener('click', async (e) => {
            this.setState(!this.state());
            const arr = this.props.className.split(' ');
            this.state() ? arr.push('completed') : arr.pop()
            input.props.checked = this.state();
            this.props.className = arr.join(' ');
            this.updateParent();
        })
        const button = new Component("button", { className: "destroy" }, ["X"])
        button.actionListener('click', async (e) => { await this.destroy() })
        div.addElement(input, label, button)
        return [div]
    }

    async destroy() {
        this.domNode.remove();
        const index = this.parent.children.indexOf(this);
        if (index > -1) {
            this.parent.children.splice(index, 1);
            this.parent.memoryChildren.splice(index, 1);
            await this.updateParent();
        }
    }

    async updateParent() {
        const patches = diff(this.parent.domNode, this.parent);
        const rootNode = document.getElementById('list');
        await patch(rootNode, patches);
    }
}