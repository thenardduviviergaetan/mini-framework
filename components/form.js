import Component from "./component.js";

export default class Form extends Component{
    constructor(){
        super("form")
    }
    onSubmit(func){
        this.props.onsubmit = func;
    }
    onInput(func){
        this.props.oninput = func;
    }

}