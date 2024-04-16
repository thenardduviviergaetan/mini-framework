import Component from "./component.js"
import { render, diff, patch, getFormValues } from "../framework/engine.js"
import { useState } from "../framework/hooks.js"
import Input from "./input.js"
import Form from "./form.js"
import Counter from "./counter.js"

// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
        this.props.className = "list"
        this.memoryChildren = [];
        this.domNode = render(this)
        this.counter = new Counter({id: "counter"})
    }

    async updateDOM(callback) {
        this.oldNode = this.domNode;
        callback();
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById(this.props.id);
        await patch(rootNode, patches);
        this.domNode = render(this);
        this.counter.updateCount(this.memoryChildren.filter((element) => {
            return !element.checked()
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

    checkAll() {
        const [checkState, setCheck] = useState(false)
        
        if (this.children.some(element => !element.props.className.includes("completed"))) {
            this.children.forEach((element) => {
                if (!element.props.className.includes("completed")) {
                    setCheck(!element.checked())
                    element.setChecked(checkState())
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
            setCheck(!element.checked());
            const arr = element.props.className.split(' ');
            element.setChecked(checkState());
            // element.state = checkState();
            checkState() ? element.checked() ? arr.push("completed"):arr.pop() : !element.checked() ? arr.pop() : arr.push("completed");

            
            element.props.className = arr.join(' ');
            element.children.forEach(child => child.children.forEach(input => { if (input.props.type = "checkbox") input.props.checked = element.state }))
            element.parent.refresh()
        })
    }

    checkAll() {
        const [checkState, setCheck] = useState(false)
        
        if (this.children.some(element => !element.props.className.includes("completed"))) {
            this.children.forEach((element) => {
                if (!element.props.className.includes("completed")) {
                    setCheck(!element.checked())
                    element.setChecked(checkState())
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
            setCheck(!element.checked());
            const arr = element.props.className.split(' ');
            element.setChecked(checkState());
            // element.state = checkState();
            checkState() ? element.checked() ? arr.push("completed"):arr.pop() : !element.checked() ? arr.pop() : arr.push("completed");

            
            element.props.className = arr.join(' ');
            element.children.forEach(child => child.children.forEach(input => { if (input.props.type = "checkbox") input.props.checked = element.state }))
            element.parent.refresh()
        })
    }

    async filterChild(filtersState) {
        this.updateDOM(() => {
            this.oldNode = this.domNode;
            this.children = [];
            if (filtersState !== "all") {
                this.memoryChildren.forEach((element) => {
                    if (element.checked() === filtersState) {
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
                if (element.checked() === true) {
                    element.destroy();
                }
            })
        })
    }

    all() {
        console.log("ALL =", this);
        this.filterChild('all')
    }

    completed() {
        console.log("Completed =", this);
        this.filterChild(true)
    }

    active() {
        console.log("Active =", this);
        this.filterChild(false)
    }
}

class ListElement extends Component {
    constructor(content, parent) {
        super("li")
        this.props.className = "list_element"
        this.content = content;
        this.children = this.render(content, parent);
        this.domNode = render(this)
        this.parent = parent;
        [this.checked, this.setChecked] = useState(false)
        this.init()
    }
    init() {
        this.actionListener("dblclick", () => {
            console.log("test")
            const input = new Input({ type: "text", name: "liUpdate", value: this.content })
            const form = new Form({ id: "update" }, input)
            form.actionListener("submit", (e) => {
                const liUpdate = getFormValues(e).liUpdate;
                this.content = liUpdate;
                this.children = this.render(liUpdate);
                this.parent.refresh();
            })
            this.children = [form]
            this.parent.refresh();
        })
    }

    render(content) {
        // const [state, setState] = useState(this.state)
        console.log(content)
        const div = new Component("div", { className: "view" })
        const input = new Component("input", { className: "toggle", type: "checkbox" })
        const label = new Component("label", { checked: false }, [content])
        input.actionListener('click', async (e) => {
            this.setChecked(!this.checked());
            // this.state = state();
            const arr = this.props.className.split(' ');
            if (this.checked()) {
                //want to check one
                if (this.checked()) {
                    // if not already checked
                    arr.push("completed")
                } else {
                    // if already checked
                    arr.pop()
                }
            } else {
                //want to un-check one
                if (this.checked()) {
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
        input.props.checked = typeof this.checked === "function" ? this.checked() : false;
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