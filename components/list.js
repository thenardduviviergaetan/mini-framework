import Component from "./component.js"
import {render, diff, patch} from "../framework/engine.js"
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

    update(task){
        const newList = new List(this.props);
        newList.children = [...this.children];
        newList.addElement(task);
        const patches = diff(this, newList);
        // console.log("render(this)",this)
        // console.log("render(new)",newList)
        // console.log("🚀 ~ List ~ update ~ patches:", patches)
        patch(render(this), patches);
        this.addElement(task)
        // document.getElementById(this.props.id).appendChild(render(new ListElement(task)))
    }

}

class ListElement extends Component {
    constructor(content) {
        super("li")
        this.props.className = "list_element"
        this.children = content;
    }
}