import Component from "./component.js";

export default class Input extends Component{
    constructor(inputType){
        super("input")
        this.props.type = inputType !== undefined ? inputType : "button"
    }
    label(value){
        if (this.props.type == "button"){
            this.props.value = value
        }
    }
    onClick(func){
        this.props.onclick = func;
    }
    onChange(func){
        this.props.onchange = func;
    }
    ondblClick(func){
        this.props.ondblclick = func;
    }
    onSubmit(func){
        this.props.onsubmit = func;
    }
}