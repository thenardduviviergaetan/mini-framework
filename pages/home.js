import { Page } from "../components/page.js";
import { vNode, createNestedChild } from "../framework/engine.js";

export default class HomePage extends Page {
    constructor(win) {
        super()
        this.win = win
    }
    //renders the concerned page
    generatePage() {
        const div = vNode("div", { id: "container" })
        const h1 = vNode("h1", { id: "test" }, "This is a Form Title")
        const p = vNode("p", { id: "test" }, "This is a text cool, you need to be prepared to all bugs")
        // const form = new Form()
        // const input = new Input("text", "txt")
        // const password = new Input("password", "pass")
        // const button = new Input("submit", "submit")
        // button.props.value = "Submit"
        // form.onSubmit(e => { e.preventDefault(); getFormValues(e.target) })
        // const test = createNestedChild(form, input, password, button)
        const test = createNestedChild(div, h1, p)
        return test
    }
}