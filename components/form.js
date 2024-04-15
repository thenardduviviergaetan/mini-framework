import { createNestedChild, patch, render } from "../framework/engine.js";
import Component from "./component.js";
import Input from "./input.js";

export default class Form extends Component{
    constructor(props){
        super("form", props)
        this.props.className = "form"
    }

    createForm(...inputs){
        const submit = new Input({ id: "submit", type: "submit", value: "Submit"})
        const form = createNestedChild(this,...inputs,submit)
        return form
    }

}