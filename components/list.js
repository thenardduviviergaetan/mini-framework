import Component from "./component.js"
import { render, diff, patch, vNode } from "../framework/engine.js"
// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
        this.props.className = "list"
    }
    addItem(content) {
        if (typeof content === "string") {
            this.addElement(new ListElement(content))
        } else {
            this.addElement(content)
        }
    }

    update(task) {
        if (this.oldNode === undefined) this.oldNode = new List(this.props);
        const t = vNode("li", { className: "list_element" }, task);
        this.children.push(t);
        const newList = new List(this.props);
        newList.children = [...this.children];
        const patches = diff(this.oldNode, newList);
        const rootNode = document.getElementById('list');
        patch(rootNode, patches);
        this.oldNode = newList;
    }

}

class ListElement extends Component {
    constructor(content) {
        super("li")
        this.props.className = "list_element"
        this.children = content;
    }
}