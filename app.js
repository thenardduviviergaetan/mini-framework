import Framework from "./framework/framework.js"
import { Page } from "./components/page.js"
import { vNode, createNestedChild } from "./framework/engine.js";
import HomePage from "./pages/home.js"

const win = new Framework()

const home = new HomePage(win)



win.render("/", home.render())