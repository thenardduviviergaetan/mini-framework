import Component from "./component.js"
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
    update(){

    }
}

class ListElement extends Component {
    constructor(content) {
        super("li")
        this.props.className = "list_element"
        this.children = content;
    }
}