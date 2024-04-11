export default class Router {
    constructor(win) {
        this.win = win;
        this.routes = [];
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
            this._loadInitialRoute();
        })
    }

    init(routes) {
        this.routes = Object.keys(routes).map(route => {
            console.log(routes[route].generatePage());
            return {
                path: route,
                callback: (params) => {
                    this.win.renderPage(routes[route].generatePage())
                }
            }
        })
        console.log(this.routes);
        this._loadRoute()
    }
  
    _loadRoute() {
        const pathname = window.location.pathname;
        console.log(pathname);
        const route = this.routes.find(r => r.path === pathname);
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