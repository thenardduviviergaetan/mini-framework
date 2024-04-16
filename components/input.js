import Component from "./component.js";

// Component input permettant de creer un element en fonction tu type entrer en constructor
/**
 * Represents an input component.
 * @class
 * @extends Component
 */
export default class Input extends Component {
    /**
     * Creates an instance of Input.
     * @constructor
     * @param {object} props - The properties for the input component.
     */
    constructor(props) {
        super("input", props);
        this.props.className = "input";
    }
}
