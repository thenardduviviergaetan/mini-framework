import Framework from "./framework/framework.js"
import Router from "./routes/router.js"
import HomePage from "./pages/home.js"
import TestPage from "./pages/test.js"

const win = new Framework()

const home = new HomePage(win)
const test = new TestPage(win)


const routes = {
    "/": home,
    "/test": test
}

const router = new Router(win)
router.init(routes)
