export default class Framework {
  constructor() {
    this._components = [];
  }

  addComponent(component) {
    this._components.push(component);
  }

  get components() {
    return this._components;
  }
}

