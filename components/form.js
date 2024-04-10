import Component from "./component.js";
import Div from "./div.js";

export default class Form extends Component{
    constructor(){
        super("form")
    }
    newFormElement(element,label){
        let divElement = new Div();
        divElement.appendChild(label);
        divElement.appendChild(element);
        this.appendChild(divElement);
    }
    onSubmit(func){
        this.props.onsubmit = func;
    }
    onInput(func){
        this.props.oninput = func;
    }
}