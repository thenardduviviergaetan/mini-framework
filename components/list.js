import Component from "./component.js"
// Component list permettant de creer un element List
export default class List extends Component {
    constructor() {
        super("ul")
        this.children = []
    }
    addElement(content) {
        if (typeof content === "string") {
            console.log(content)
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