import { getFormValues } from "./framework/engine.js"
import Framework from "./framework/framework.js"
import Input from "./components/input.js"
import List from "./components/list.js"
import Form from "./components/form.js"
import Link from "./components/link.js"
import Component from "./components/component.js"

// Initialize the framework
const win = new Framework()


// Create the Header Component
const header = new Component("header", { id: "header","data-testid":"header"})
const title = new Component("h1",{}, ["todos"])
const input = new Input({ id: "todo-input", className:'new-todo', placeholder: "What needs to be done?", name: "task", type: "text", 'data-testid': "text-input" })
const checkAll = new Input({ id: "checkAll", type: "button",value:"Check all"})
const form = new Form({ className:"input-container" }, checkAll, input)
form.actionListener("submit", (e) => {
    const task = getFormValues(e).task;
    list.update(task, list.counter)
})
header.addElement(title, form)
win.addComponent(header)

// Create the Main Component
const main = new Component("main", { id: "main","data-testid":"main"})
const list = new List({ id: "list", className: 'todo-list', 'data-testid': 'todo-list' })
checkAll.actionListener('click', ()=>{
    list.checkAll()
})
main.addElement(list)
win.addComponent(main)

const listFooter = new Component("div", { id: "list-footer" })
const linkBox = new Component("div", { id: "link-box", className: "link-box" })
const link = new Link("All")
const link2 = new Link("Active")
const link3 = new Link("Completed")
const clear = new Input({ id: "clear-completed", type: "button", value: "Clear Completed" })
clear.actionListener('click', () => {
    list.clearCompleted()
})
win.bindLink(link, "/")
win.bindLink(link2, "/#/active")
win.bindLink(link3, "/#/completed")
linkBox.addElement(link, link2, link3)
listFooter.addElement(list.counter, linkBox, clear)
main.addElement(listFooter)

// Create the Footer Component
const footer = new Component("footer", { className: "info","data-testid": "footer" })
const p1 = new Component("p", {}, ["Double-click to edit a todo"])
const p2 = new Component("p", {}, ["Created by Dream Team"])
const p3 = new Component("p", {}, ["Part of mini-framework project"])
footer.addElement(p1, p2, p3)
win.addComponent(footer)
win.setRoutes([
    ["/", () => { list.all() }],
    ["/#/active", () => { list.filterChild(false)}],
    ["/#/completed", () => [ list.filterChild(true)]]
])

// Render the Page
win.render()