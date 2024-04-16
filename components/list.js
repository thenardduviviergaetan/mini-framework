import Component from "./component.js"
import Counter from "./counter.js"
import { render, diff, patch } from "../framework/engine.js"
import { useState } from "../framework/hooks.js"

// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
        this.props.className = "list"
        this.domNode = render(this)
    }

    async updateDOM(callback) {
        this.oldNode = this.domNode;
        callback();
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById(this.props.id);
        await patch(rootNode, patches);
        this.domNode = render(this);
        this.counter.updateCount(this.children.length);
    }

    async update(task, counter) {
        this.counter = counter
        this.updateDOM(() => {
            const element = new ListElement(task, this);
            this.children.push(element);
        });
    }

    async refresh() {
        this.updateDOM(() => { });
    }

    checkAll() {
        const [checkState, setCheck] = useState(false)
        
        if (this.children.some(element => !element.props.className.includes("completed"))) {
            this.children.forEach((element) => {
                if (!element.props.className.includes("completed")) {
                    setCheck(!element.state)
                    element.state = checkState()
                    const arr = element.props.className.split(' ');
                    arr.push("completed")
                    element.props.className = arr.join(' ');

                    element.children.forEach(child => child.children.forEach(input => { if (input.props.type = "checkbox") input.props.checked = true }))
                    element.parent.refresh()
                }
            })
            return
        }
        this.children.forEach(element => {
            setCheck(!element.state);
            const arr = element.props.className.split(' ');
            element.state = checkState();
            checkState() ? element.state ? arr.push("completed"):arr.pop() : !element.state ? arr.pop() : arr.push("completed");

            
            element.props.className = arr.join(' ');
            element.children.forEach(child => child.children.forEach(input => { if (input.props.type = "checkbox") input.props.checked = element.state }))
            element.parent.refresh()
        })
    }

    all() {

    }

    completed() {
    }

    active() {

    }

    clearCompleted() {

    }
}

class ListElement extends Component {
    constructor(content, parent) {
        super("li")
        this.props.className = "list_element"
        this.children = this.render(content, parent);
        this.domNode = render(this)
        this.parent = parent;
    }

    render(content) {
        const [state, setState] = useState(this.state)

        const div = new Component("div", { className: "view" })
        const input = new Component("input", { className: "toggle", type: "checkbox" })
        const label = new Component("label", { checked: false }, [content])
        input.actionListener('click', async (e) => {
            setState(!this.state);
            this.state = state();
            const arr = this.props.className.split(' ');
            if (state()) {
                //want to check one
                if (this.state) {
                    // if not already checked
                    arr.push("completed")
                } else {
                    // if already checked
                    arr.pop()
                }
            } else {
                //want to un-check one
                if (this.state) {
                    // if not-already checked
                    arr.push("completed")

                } else {
                    // if already checked
                    arr.pop()
                }
            }
            this.props.className = arr.join(' ');
            input.props.checked = !input.props.checked;
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
            await this.parent.refresh();
        }
    }
}