import Component from "./component.js";

// Component input permettant de creer un element en fonction tu type entrer en constructor
export default class Input extends Component{
    constructor(inputType,name){
        super("input")
        this.props.type = inputType !== undefined ? inputType : "button"
        this.props.name = name !== undefined ? name : inputType
    }
    
}