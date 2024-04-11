import Component from "./component.js"
// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
    }
    addElement(content) {
        if (typeof content === "string") {
            this.appendChild(new ListElement(content))
        } else {
            this.appendChild(content)
        }
    }
}

class ListElement extends Component {
    constructor(content) {
        super("li")
        this.children = content;
    }
}