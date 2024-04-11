import Router from "../routes/router.js";
import { vNode, render, diff, patch } from "./engine.js";
export default class Framework {
  constructor() {
    this.routes = {};
    this.router = new Router()
    this._components = [];
    this.oldNode = {};
    this._init();
  }
  _init() {
    this.oldNode = vNode("main", { id: "container" }, ...this._components)
    const initNode = render(this.oldNode);
    document.body.appendChild(initNode);
  }

  // addRoute(path, component) {
  //   this.routes[path] = component;
  // }

  addComponent(component) {
    this._components.push(component);
    this.render(component);
  }

  render() {
    const newNode = vNode("main", { id: "container" }, ...this._components);
    const patches = diff(this.oldNode, newNode);
    patch(document.body.lastChild, patches);
    this.oldNode = newNode;
  }
}
