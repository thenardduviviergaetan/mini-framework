import Component from "./component.js"
// import Counter from "./counter.js"
import { render, diff, patch } from "../framework/engine.js"
// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
        this.props.className = "list"
        this.domNode = render(this)
        // this.counter = new Counter({ id: "counter" }, this.children.length)
    }

    async update(task) {
        this.oldNode = this.domNode;
        const element = new ListElement(task, this);
        this.children.push(element);
        this.children = [...this.children];
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById('list');
        await patch(rootNode, patches);
        this.domNode = render(this);
        // this.counter.updateCount(this.children.length)
    }
}

class ListElement extends Component {
    constructor(content, parent) {
        super("li")
        this.props.className = "list_element"
        this.children = this.render(content, parent);
        this.state = this.initState();
        this.domNode = render(this)
        this.parent = parent;
    }

    render(content) {
        const div = new Component("div", { className: "view" })
        const input = new Component("input", { className: "toggle", type: "checkbox" })
        const label = new Component("label", {}, [content])
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
            await this.updateParent();
        }
    }

    async updateParent() {
        const patches = diff(this.parent.domNode, this.parent);
        const rootNode = document.getElementById('list');
        await patch(rootNode, patches);
    }
}
