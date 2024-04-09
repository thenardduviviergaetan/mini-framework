import { vNode } from "../framework/engine.js";

export class Home{
    constructor() {
        this.children = []
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
        return vNode("div", {className: "home"}, "Welcome to the home page")
    }
}