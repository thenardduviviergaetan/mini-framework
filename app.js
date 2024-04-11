import { vNode } from "./framework/engine.js"
import Framework from "./framework/framework.js"
import Input from "./components/input.js"
import List from "./components/list.js"

const win = new Framework()



win.addComponent(vNode("h1", { id: "title" }, "Hello World"))
win.addComponent(new Input({ id: "input", placeholder: "Enter your name" }))
const list = new List({ id: "list" })
list.addElement("Element 1")
list.addElement("Element 2")
list.addElement("Element 3")
win.addComponent(list)