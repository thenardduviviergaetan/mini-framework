import Component from "./component.js"
import { render, diff, patch, getFormValues } from "../framework/engine.js"
import { useState } from "../framework/hooks.js"
import Input from "./input.js"
import Form from "./form.js"
import Counter from "./counter.js"
import Link from "./link.js"

/**
 * Represents a List component.
 * @class
 * @extends Component
 */
export default class List extends Component {
    /**
     * Creates an instance of List.
     * @constructor
     * @param {Object} props - The properties for the List component.
     */
    constructor(props) {
        super("ul", props);
        this.props.className = "list";
        this.memoryChildren = [];
        this.domNode = render(this);
        this.counter = new Counter({ id: "counter", className: "todo-count"  });
        this.footer = { displayed: false, node: null }
    }

    /**
     * Updates the DOM with the changes made to the List component.
     * @async
     * @param {Function} callback - The callback function to be executed before updating the DOM.
     */
    async updateDOM(callback) {
        this.oldNode = this.domNode;
        callback();
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById(this.props.id);

        if (!this.footer.displayed && this.memoryChildren.length > 0) {
            rootNode.after(this.footer.node)
            this.footer.displayed = true
        }else if (this.memoryChildren.length === 0) {
            this.footer.node.remove()
            this.footer.displayed = false
        }

        await patch(rootNode, patches);
        this.domNode = render(this);
        if (this.footer.displayed) {
            this.counter.updateCount(this.memoryChildren.filter((element) => {
                return !element.checked();
            }).length);
        }
    }

    /**
     * Updates the List component with a new task and counter.
     * @async
     * @param {Object} task - The new task to be added to the List component.
     * @param {Object} counter - The new counter to be used in the List component.
     */
    async update(task, counter) {
        this.counter = counter;
        this.updateDOM(() => {
            const element = new ListElement(task, this);
            this.children.push(element);
            this.memoryChildren.push(element);
        });
    }

    addFooter(footer) {
        this.footer.node = footer
    }

    /**
     * Refreshes the List component by updating the DOM without any changes.
     * @async
     */
    async refresh() {
        this.updateDOM(() => { });
    }

    /**
     * Checks all the List elements.
     */
    checkAll() {
        const [checkState, setCheck] = useState(false);


        if (this.children.some(element => !element.props.className.includes("completed"))) {
            this.children.forEach((element) => {
                if (!element.props.className.includes("completed")) {
                    setCheck(!element.checked());
                    element.setChecked(checkState());
                    const arr = element.props.className.split(' ');
                    arr.push("completed");
                    element.props.className = arr.join(' ');

                    element.children.forEach(child => child.children.forEach(input => { if (input.props.type = "checkbox") input.props.checked = true; }));
                    element.parent.refresh();
                }
            });
            return;
        }
        this.children.forEach(element => {
            setCheck(!element.checked());
            const arr = element.props.className.split(' ');
            element.setChecked(checkState());
            checkState() ? element.checked() ? arr.push("completed") : arr.pop() : !element.checked() ? arr.pop() : arr.push("completed");


            element.props.className = arr.join(' ');
            element.children.forEach(child => child.children.forEach(input => {
                if (input.props.type = "checkbox") input.props.checked = element.state;
            }));
            element.parent.refresh();
        });
    }

    /**
     * Filters the List elements based on the given filters state.
     * @async
     * @param {string} filtersState - The state of the filters to be applied.
     */
    async filterChild(filtersState) {
        if (this.memoryChildren.length === 0) return

        this.updateDOM(() => {
            this.oldNode = this.domNode;
            this.children = [];
            if (filtersState !== "all") {
                this.memoryChildren.forEach((element) => {
                    if (element.checked() === filtersState) {
                        this.children.push(element);
                    }
                });
            } else {
                this.children = [...this.memoryChildren];
            }
        });
    }

    /**
     * Clears all the completed List elements.
     * @async
     */
    async clearCompleted() {
        this.updateDOM(() => {
            this.oldNode = this.domNode;
            this.children = [...this.memoryChildren];
            this.memoryChildren.forEach((element) => {
                if (element.checked() === true) {
                    element.destroy();
                }
            });
        });
    }

    /**
     * Filters the List elements to show all elements.
     */
    all() {
        this.filterChild('all');
    }

    /**
     * Filters the List elements to show completed elements.
     */
    completed() {
        this.filterChild(true);
    }

    /**
     * Filters the List elements to show active elements.
     */
    active() {
        this.filterChild(false);
    }
}

/**
 * Represents a list element component.
 * @class
 * @extends Component
 */
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
        const div = new Component("div", { className: "view" })
        const input = new Component("input", { className: "toggle", type: "checkbox", "data-testid": "todo-item-toggle" })
        const label = new Component("label", { checked: false, "data-testid": "todo-item-label" }, [content])
        input.actionListener('click', async (e) => {
            this.setChecked(!this.checked());
            const arr = this.props.className.split(' ');
            if (this.checked()) {
                if (this.checked()) {
                    arr.push("completed")
                } else {
                    arr.pop()
                }
            } else {
                if (this.checked()) {
                    arr.push("completed")
                } else {
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