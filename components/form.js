import { createNestedChild, patch, render } from "../framework/engine.js";
import Component from "./component.js";
import Input from "./input.js";
import { diff } from "../framework/engine.js";

export default class Form extends Component{
    constructor(props){
        super("form", props)
    }

    createForm(...inputs){
        const submit = new Input({ id: "submit", type: "submit", value: "Submit"})
        const form = createNestedChild(this,...inputs,submit)
        return form
    }

}