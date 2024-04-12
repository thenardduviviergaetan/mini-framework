export default class Router {
    constructor(win) {
        this.win = win;
        // this.win.router = this;
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
            this.init(this.win.routes)
        })
    }

    init(routes) {
        this.win.routes = Object.keys(routes).map(route => {
            return {
                path: route,
                callback: (params) => {
                    this.win.renderPage(routes[route].generatePage())
                }
            }
        })
        this._loadRoute()
    }
  
    _loadRoute() {
        const pathname = window.location.pathname;
        console.log(this.win.routes)
        const route = this.win.routes.find(r => r.path === pathname);
        if (!route) {
            return;
        }
        route.callback();
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this._loadRoute();
    }
}