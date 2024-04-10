import { Page } from "../components/page.js";
import { vNode, createNestedChild } from "../framework/engine.js";

export default class HomePage extends Page{
    constructor(){
        super()
    }

    render(){
        const div = vNode("div", { id: "container" })
        const h1 = vNode("h1", { id: "test" }, "This is a Title")
        const p = vNode("p", { id: "test" }, "This is a text cool, you need to be prepared to all bugs")
        
        const test = createNestedChild(div, h1, p)
        
        return test
    }
}