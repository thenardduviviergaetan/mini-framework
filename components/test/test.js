// import { createNestedChild, render } from "../../framework/engine.js"
// import Input from "../input.js"

// class MyComponent extends HTMLElement {
//     constructor() {
//         super()
//         const shadow = this.attachShadow({ mode: "open" })
//     }

//     static get observedAttributes() {
//         return ["button-label"]
//     }

//     get buttonLabel() {
//         return this.getAttribute("button-label")
//     }
// }


// export default class CustomForm extends MyComponent{
//     constructor(){
//         super
//         this.className = "form"
//     }
//     createForm(...inputs){
//         const submit = new Input({ id: "submit", type: "submit", value: "Submit"})
//         const form = createNestedChild(this,...inputs,submit)
//         this.shadowRoot.appendChild(render(form))
//     }
// }

// customElements.define("form-component", CustomForm)