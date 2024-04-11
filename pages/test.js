import { Page } from "../components/page.js";
import { vNode, createNestedChild } from "../framework/engine.js";
import Input from "../components/input.js";

export default class TestPage extends Page {
    constructor(win) {
        super()
        this.win = win
    }

    generatePage() {
        const div = vNode("div", { id: "container" })
        const h1 = vNode("h1", { id: "test" }, "This TEST")
        const p = vNode("p", { id: "test" }, "Tzfefzbeifubziebfs")
        const link = new Input("button")
        link.props.id = "link"
        // link.props.href = "/test"
        link.props.value = "Go to home"
        link.onClick(() => this.win.router.navigateTo("/")
        )
        const test = createNestedChild(div, h1, p, link)
        return test
    }
}