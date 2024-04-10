import Component from "./component.js";
import Input from "./input.js";
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
    newTextinput(id,label,...className){
        const textInput = new Input("text");
        textInput.id(id);
        // input.value(label);
        textInput.className(className);
        this.newFormElement(textInput,label);
    }
    newCheckbox(id,label,value,...className){
        const checkboxInput = new Input("checkbox");
        checkboxInput.id(id);
        checkboxInput.value(value);
        checkboxInput.className(className);
        this.newFormElement(checkboxInput,label);
    }
    newRadioSelecteur(id,label,tabValue,...className){
        const divElement = new Div();
        divElement.id(id)
        tabValue.forEach(element => {
            const radioInput = new Input("radio");
            radioInput.id(id);
            radioInput.value(element);
            radioInput.className(className);
            divElement.appendChild(radioInput);
        });
        this.newFormElement(divElement,label);
    }
    onSubmit(func){
        this.props.onsubmit = func;
    }
    onInput(func){
        this.props.oninput = func;
    }
}