import {getFormValues, vNode } from "./framework/engine.js"
import Framework from "./framework/framework.js"
import Input from "./components/input.js"
import List from "./components/list.js"
import Form from "./components/form.js"
import Link from "./components/link.js"
import CustomForm from "./components/test/test.js"

new CustomForm().createForm(input)
//THIS COULD BE OUR REACT LIKE


// const win = new Framework()

// win.addComponent(vNode("h1", { id: "title" }, "TO:DO List"))
// const list = new List({ id: "list" })

// const input = new Input({ id: "input", placeholder: "Add your task here", name: "task"})

// const form = new Form({ id: "task-manager" }).createForm(input);

// form.onSubmit((e) => {
//     const task = getFormValues(e).task;
//     list.update(task)
// })

// const list_items = ["Task 1", "Task 2", "Task 3"]

// list_items.forEach((item) => {
//     list.addItem(item)
// })

// const box = vNode("div", {id: "box"})

// const itemsLeft = vNode("span", { id: "items-left" }, "0 items left")
// box.addElement(itemsLeft)

// const linkBox = vNode("div", {id: "link-box"})
// const link = new Link("Go to test")
// win.bindLink(link, "/test")
// linkBox.addElement(link)

// const link2 = new Link("Go back")
// win.bindLink(link2, "/")
// linkBox.addElement(link2)
// box.addElement(linkBox)

// const clear = new Link("Clear all")
// box.addElement(clear)

// win.addComponent(form)
// win.addComponent(list)
// win.addComponent(box)
