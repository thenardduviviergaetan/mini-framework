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
    onClick(f){
        this.props.onclick = f;
    }
    onChange(f){
        this.props.onchange = f;
    }
    ondblClick(f){
        this.props.ondblclick = f;
    }
    onSubmit(f){
        this.props.onsubmit = f
    }
}