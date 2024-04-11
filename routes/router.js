export default class Router {
    constructor(win) {
        this.win = win;
        this.win.router = this;
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
        })
    }

    init(routes) {
        this.win.routes = Object.keys(routes).map(route => {
            console.log(routes[route].generatePage());
            return {
                path: route,
                callback: (params) => {
                    this.win.renderPage(routes[route].generatePage())
                }
            }
        })
        console.log(this.win.routes);
        this._loadRoute()
    }
  
    _loadRoute() {
        const pathname = window.location.pathname;
        console.log(pathname);
        const route = this.win.routes.find(r => r.path === pathname);
        if (!route) {
            console.log("problem");
            return;
        }
        route.callback();
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this._loadRoute();
    }
}