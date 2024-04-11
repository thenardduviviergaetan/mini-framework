import Form from "../components/form.js";
import Input from "../components/input.js";
import { Page } from "../components/page.js";
import { vNode, createNestedChild } from "../framework/engine.js";
import List from "../components/list.js";


export default class HomePage extends Page {
    constructor(win) {
        super(win)
    }
    //renders the concerned page
    generatePage() {

        const h1 = vNode("h1", { id: "title" }, 'TODO List')

        const form = new Form({
            id: "form",
            name: "form",
        })
        form.onSubmit((data) => {
            let formData = getFormValues(data)
            console.log(this.win.oldNode.children)
            this.win.oldNode.children[2].addElement(formData.task)
            this.win.renderPage(this.win.oldNode);
        })

        const input = new Input({
            type: "text",
            name: "task",
            id: "task",
            placeholder: "Add a task"
        })

        const list = new List({ id: "list", name: "list" })

        const links = vNode('div', { id: 'links' })
        const link = new Input({
            type: "button",
            name: "l1",
            value: "Go to test",
        })
        link.onClick(() => this.win.router.navigateTo("/test"))

        const link2 = new Input({
            type: "button",
            name: "l2",
            value: "Go to home",
        })
        link2.onClick(() => this.win.router.navigateTo("/"))


        const link3 = new Input({
            type: "button",
            name: "l3",
            value: "Go to about",
        })
        link3.onClick(() => this.win.router.navigateTo("/about"))

        const t = createNestedChild(form, input)
        const l = createNestedChild(links, link, link2, link3)

        const todo = createNestedChild(this.root, h1, t, list, l)

        return todo
    }
}

const getFormValues = (form) => {
    const data = new FormData(form)
    const res = Object.fromEntries(data.entries())
    console.log(res)
    return res
}