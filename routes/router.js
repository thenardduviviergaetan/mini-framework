import Framework from "../framework/framework.js";

/**
 * Represents a router for handling client-side routing in a mini-framework.
 */
export default class Router {
    /**
     * Creates a new instance of the Router class.
     * @param {Framework} win - The Framework object.
     */
    constructor(win) {
        this.win = win;
        this.routes = {};
        window.addEventListener('popstate', async (event) => {
            event.preventDefault();
            this._loadInitialRoute();
        })
    }

    /**
     * Initializes the router with the specified routes.
     * @param {Object} routes - The routes to be initialized.
     */
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

    /**
     * Adds additional routes to the router.
     * @param {Object} routes - The routes to be added.
     */
    addRoutes(routes) {
        for (const [rPath, rCallback, rParams] of routes) {
            this.routes[rPath] = { path: rPath, callback: rCallback, params: rParams || {} }
        }
    }

    /**
     * Gets the current URL.
     * @returns {string} The current URL.
     * @private
     */
    _getCurrentURL() {
        const url = window.location.href.split('/').slice(3).join('/')

        return `/${url}` || '/'
    }

    /**
     * Gets the path segments from the specified path.
     * @param {string} path - The path.
     * @returns {string[]} The path segments.
     * @private
     */
    _getPathSegments(path) {
        const pathNameSplit = path.split('/');
        return pathNameSplit.length > 1 ? pathNameSplit.slice(1) : [''];
    }

    /**
     * Matches the URL segments to a route.
     * @param {string[]} urlSegs - The URL segments.
     * @returns {Object} The matched route.
     * @private
     */
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

    /**
     * Loads the initial route when the page is loaded or the URL changes.
     * @private
     */
    _loadInitialRoute() {
        const pathSegs = this._getPathSegments(this._getCurrentURL());
        this.loadRoute(pathSegs);
    }

    /**
     * Loads the route based on the specified URL segments.
     * @param {string[]} urlSegs - The URL segments.
     */
    loadRoute(urlSegs) {
        const matchedRoute = this._matchUrlToRoute(urlSegs);
        if (!matchedRoute) {
            throw new Error(`Route not found ${urlSegs}`);
        }
        matchedRoute.callback(matchedRoute.params);
    }

    /**
     * Navigates to the specified path.
     * @param {string} path - The path to navigate to.
     */
    navigateTo(path) {
        history.pushState({}, '', path);
        const pathSegs = this._getPathSegments(path);
        this.loadRoute(pathSegs);
    }
}