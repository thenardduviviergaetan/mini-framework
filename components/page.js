import { vNode } from "../framework/engine.js";
import Component from "./component.js";
//Simple default Home Page
export class Page extends Component {
    constructor() {
    // constructor(win) {
        super("main")
        this.children = []
        // this.win = win
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
    // render() {
    //     return vNode("div", { className: "home" }, "Welcome to the home page")
    // }
    // createComponent() {
    // }
    // render(path, component) {
        // this.addElement(component)
        // this.win.addRoute(path, this)
        // this.win.router.navigateTo(path)
    // }

    render(){
        return vNode(this.type, this.props, ...this.children)
    }


}
//TODO Automatiser la gestion de render de component avec le file system