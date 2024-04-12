import Component from "./component.js"
// Component list permettant de creer un element List
export default class List extends Component {
    constructor(props) {
        super("ul", props)
    }
    addElement(content) {
        if (typeof content === "string") {
            this.addChild(new ListElement(content))
        } else {
            this.addChild(content)
        }
    }
    update(){

    }
}

class ListElement extends Component {
    constructor(content) {
        super("li")
        this.children = content;
    }
}