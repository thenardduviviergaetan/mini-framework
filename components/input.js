import Component from "./component.js";

// Component input permettant de creer un element en fonction tu type entrer en constructor
export default class Input extends Component{
    constructor(props){
        super("input", props)
        this.props.className = "input"
    }
}