import Form from "../components/form.js";
import Input from "../components/input.js";
import { Page } from "../components/page.js";
import { vNode, createNestedChild } from "../framework/engine.js";

export default class HomePage extends Page {
    constructor() {
        super()
    }
    //renders the concerned page
    render() {
        // const div = vNode("div", { id: "container" })
        // const h1 = vNode("h1", { id: "test" }, "This is a Form Title")
        // const p = vNode("p", { id: "test" }, "This is a text cool, you need to be prepared to all bugs")
        const form = new Form()
        const input = new Input("text", "txt")
        const password = new Input("password", "pass")
        const button = new Input("submit", "submit")
        button.props.value = "Submit"
        form.onSubmit(e => { e.preventDefault(); getFormValues(e.target) })
        const test = createNestedChild(form, input, password, button)
        return test
    }
}

const getFormValues = (form) => {
    const data = new FormData(form)
    const res = Object.fromEntries(data.entries())
    console.log(res)
}