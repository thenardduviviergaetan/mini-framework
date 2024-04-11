import Framework from "./framework/framework.js"
import Router from "./routes/router.js"
import HomePage from "./pages/home.js"
import TestPage from "./pages/test.js"

const win = new Framework()
const router = new Router(win)


const home = new HomePage(win)
const test = new TestPage(win)


const routes = {
    "/": home,
    "/test": test
}

// console.log(win.oldNode);
router.init(routes)

// document.getElementById('link').addEventListener('click', (event) => {
//     event.preventDefault()
//     router.navigateTo("/test")
// })

// router.navigateTo("/test")
