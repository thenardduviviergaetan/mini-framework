import Framework from "./framework/framework.js"
import { Page } from "./components/page.js"
import { vNode, createNestedChild } from "./framework/engine.js";
import HomePage from "./pages/home.js"
import Router from "./routes/router.js";
import DashboardPage from "./pages/dashboard.js";

const win = new Framework()
// const router = new Router()
const home = new HomePage()

// const dashboard = new DashboardPage()

// const routes = {
//     "/": home,
//     "/dashboard": dashboard
// }


// for (const [key, value] of Object.entries(routes)) {
//     router.addRoute(key, () => {
//         win.render(key, value.render())
//     })
// }
// win.render("/dashboard", dashboard.render())

win.render("/", home.render())
