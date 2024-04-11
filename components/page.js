import { vNode } from "../framework/engine.js";
import Component from "./component.js";
//Simple default Home Page
export class Page extends Component {
    constructor(win) {
        super("main")
        this.children = []
        this.win = win
        this.root = vNode("main", { id: "container" })
    }
    addElement(content) {
        if (typeof content === "string") {
            console.log(content)
            this.appendChild(content)
        } else {
            this.appendChild(content)
        }
    }
    appendChild(child) {
        this.children.push(child);
    }
    render(){
        return vNode(this.type, this.props, ...this.children)
    }
}