import { vNode, render, diff, patch } from "./engine.js";
export default class Framework {
  constructor() {
    this._components = [];
    this.routes = {};
    this.oldNode = {};
    // this.router = new Router();
    this.router = null;
    this._init();
  }
  _init() {
    this.oldNode = vNode("main", { id: "container" }, ...this._components)
    const initNode = render(this.oldNode);
    document.body.appendChild(initNode);
  }

  renderPage(component) {
    const newNode = vNode(component.type, component.props, ...component.children || []);
    const patches = diff(this.oldNode, newNode);
    const app = document.getElementById('container');
    patch(app, patches);
    this.oldNode = newNode;
  }
  
}
