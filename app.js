import Framework from "./framework/framework.js"
import { Page } from "./components/page.js"
import { vNode, createNestedChild } from "./framework/engine.js";
import HomePage from "./pages/home.js"

const win = new Framework()
const router = new Router(win)


const home = new HomePage(win)
const dashboard = new DashboardPage()


const routes = {
    "/": home,
    "/dashboard": dashboard
}
// console.log(win.oldNode);
router.init(routes)
