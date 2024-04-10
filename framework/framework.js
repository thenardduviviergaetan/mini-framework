import Router from "../routes/router.js";
import { vNode, render, diff, patch } from "./engine.js";
export default class Framework {
  constructor() {
    this._components = [];
    this.routes = {};
    this.oldNode = {};
    this.router = new Router();
    this._init();
  }
  _init() {
    this.oldNode = vNode("main", { id: "app" }, ...this._components)
    const initNode = render(this.oldNode);
    document.body.appendChild(initNode);
  }
  addRoute(path, component) {
    this.router.addRoute(path, () => {
      const newNode = vNode(component.type, component.props, ...component.children || []);
      const patches = diff(this.oldNode, newNode);
      const app = document.getElementById('app');
      patch(app, patches);
      this.oldNode = newNode;
    })
  }
  addComponent(component) {
    this._components.push(component);
  }

  render(path, component) {
    this.addRoute(path, component);
    this.router.navigateTo(path);
  }
}
