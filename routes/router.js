export default class Router {
    constructor() {
        this.routes = [];
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
            this._loadInitialRoute();
        })
    }
    addRoute(route, f) {
        this.routes.push({ path: route, callback: f, params: {} })
    }
    _getCurrentURL() {
        return window.location.pathname;
    }
    _getPathSegments(path) {
        const pathNameSplit = window.location.pathname.split('/');
        return pathNameSplit.length > 1 ? pathNameSplit.slice(1) : [''];
    }
    _matchUrlToRoute(urlSegs) {
        for (const route of this.routes) {
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