export default class Router {
    constructor(win) {
        this.win = win;
        this.routes = {};
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
            this._loadInitialRoute();
        })
    }

    init(routes) {
        const defaultCallback = (params) => {
            this.win.renderPage(routes[rPath].generatePage())
        }

        for (const [rPath, rCallback] of routes) {
            this.routes[rPath] = {
                path: rPath,
                callback: rCallback || defaultCallback,
            }
        }

        this._loadInitialRoute()
    }

    addRoutes(routes) {
        for (const [rPath, rCallback, rParams] of routes) {
            this.routes[rPath] = { path: rPath, callback: rCallback, params: rParams || {} }
        }
    }

    _getCurrentURL() {
        const url = window.location.href.split('/').slice(3).join('/')

        return `/${url}` || '/'
    }

    _getPathSegments(path) {
        const pathNameSplit = path.split('/');
        return pathNameSplit.length > 1 ? pathNameSplit.slice(1) : [''];
    }

    _matchUrlToRoute(urlSegs) {
        for (const [path, route] of Object.entries(this.routes)) {
            const routePathSegs = route.path.split('/').slice(1);
            if (routePathSegs.length !== urlSegs.length) {
                continue;
            }
            const params = {};
            const match = routePathSegs.every((routePathSeg, i) => {
                if (routePathSeg.startsWith(':')) {
                    params[routePathSeg.slice(1)] = urlSegs[i];
                    return true;
                }
                return routePathSeg === urlSegs[i];
            });
            if (match) {
                return { ...route, params };
            }
        }

        this.navigateTo('/')
    }

    _loadInitialRoute() {
        const pathSegs = this._getPathSegments(this._getCurrentURL());
        this.loadRoute(pathSegs);
    }

    loadRoute(urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);
        if (!matchedRoute) {
            throw new Error(`Route not found ${urlSegs}`);
        }
        matchedRoute.callback(matchedRoute.params);
    }

    navigateTo(path) {
        history.pushState({}, '', path);
        const pathSegs = this._getPathSegments(path);
        this.loadRoute(pathSegs);
    }
}