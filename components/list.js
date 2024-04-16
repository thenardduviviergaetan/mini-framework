import Component from "./component.js"
import Counter from "./counter.js"
import { render, diff, patch } from "../framework/engine.js"
import { useState } from "../framework/hooks.js"

// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
        this.props.className = "list"
        this.memoryChildren = [];
        this.domNode = render(this)
    }

    async updateDOM(callback) {
        this.oldNode = this.domNode;
        callback();
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById(this.props.id);
        await patch(rootNode, patches);
        this.domNode = render(this);
        this.counter.updateCount(this.memoryChildren.filter((element) => {
            return !element.state()
        }).length);
    }

    async update(task, counter) {
        this.counter = counter;
        this.updateDOM(() => {
            const element = new ListElement(task, this);
            this.children.push(element);
            this.memoryChildren.push(element);
        });
    }

    async refresh() {
        this.updateDOM(() => { });
    }

    async filter(filtersState) {
        this.updateDOM(() => {
            this.oldNode = this.domNode;
            this.children = [];
            if (filtersState !== "all") {
                this.memoryChildren.forEach((element) => {
                    if (element.state() === filtersState) {
                        this.children.push(element)
                    }
                })
            } else {
                this.children = [...this.memoryChildren]
            }
        })
    }

    async clearCompleted() {
        this.updateDOM(() => {
            this.oldNode = this.domNode;
            this.children = [...this.memoryChildren]
            this.memoryChildren.forEach((element) => {
                if (element.state() === true) {
                    element.destroy();
                }
            })
        })
    }


    all() {

    }

    completed() {
    }

    active() {

    }
}

class ListElement extends Component {
    constructor(content, parent) {
        super("li")
        this.props.className = "list_element"
        this.children = this.render(content, parent);
        this.domNode = render(this)
        this.parent = parent;
        [this.state, this.setState] = useState(false)
    }

    render(content) {
        const div = new Component("div", { className: "view" })
        const input = new Component("input", { className: "toggle", type: "checkbox" })
        const label = new Component("label", {}, [content])
        input.actionListener('click', async (e) => {
            this.setState(!this.state());
            const arr = this.props.className.split(' ');
            this.state() ? arr.push('completed') : arr.pop()
            input.props.checked = this.state();
            this.props.className = arr.join(' ');
            this.parent.refresh();
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
            this.parent.children = [
                ...this.parent.children.slice(0, index),
                ...this.parent.children.slice(index + 1)
            ];
            this.parent.memoryChildren = [
                ...this.parent.memoryChildren.slice(0, index),
                ...this.parent.memoryChildren.slice(index + 1)
            ]
            await this.parent.refresh();
        }
    }
}