export default class Router {
    constructor(win) {
        this.win = win;
        this.win.router = this;
        this.routes = {};
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
            this.init(this.win.routes)
        })
    }

    init(routes) {
        this.routes = routes;
        this._loadRoute();
    }

    _loadRoute() {
        const path = window.location.pathname;
        const route = this.routes[path];
        if (route) {
            route();
        } else {
            console.log("404")
        }
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this._loadRoute();
    }
}