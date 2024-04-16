import {patch, render } from "../framework/engine.js";
import { createNestedChild } from "../framework/hooks.js";
import Component from "./component.js";
import Input from "./input.js";

export default class Form extends Component{
    constructor(props,...inputs){
        super("form", props)
        this.props.className = "form"
        this.init(...inputs)
    }

    init(...inputs){
        const submit = new Input({ id: "submit", type: "submit", value: "Submit"})
        const form = createNestedChild(this,...inputs,submit)
        return form
    }

}