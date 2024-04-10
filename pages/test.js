import { Page } from "../components/page.js";
import { vNode, createNestedChild } from "../framework/engine.js";

export default class TestPage extends Page {
    constructor() {
        super()
    }

    generatePage() {
        const div = vNode("div", { id: "container" })
        const h1 = vNode("h1", { id: "test" }, "This TEST")
        const p = vNode("p", { id: "test" }, "Tzfefzbeifubziebfs")
        const test = createNestedChild(div, h1, p)
        return test
    }
}