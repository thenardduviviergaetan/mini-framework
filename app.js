import Framework from "./framework/framework.js"
import { Home } from "./components/home.js"
import { vNode } from "./framework/engine.js"
import List from "./components/list.js"

const win = new Framework()

const home = new Home()
home.addElement(vNode("h1", {id: "title"}, "HOMEPAGE"))

const list = new List()
list.addElement("Element 1")
list.addElement("Element 2")
list.addElement("Element 3")

home.addElement(list)
win.addRoute("/", home )
win.router.navigateTo("/")
