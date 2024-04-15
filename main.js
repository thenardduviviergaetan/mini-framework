class MyComponent extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: "open" })
        this.shadowRoot.innerHTML = `
      <label>some text</label>
      <button>${this.buttonLabel}</button>
    `
    }

    static get observedAttributes() {
        return ["button-label"]
    }

    get buttonLabel() {
        return this.getAttribute("button-label")
    }
}

customElements.define("my-component", MyComponent)