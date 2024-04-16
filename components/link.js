import { vNode } from "../framework/engine.js";
import Component from "./component.js";

/**
 * Represents a link component.
 * @class
 * @extends Component
 */
export default class Link extends Component {
    /**
     * Creates a new instance of the Link component.
     * @constructor
     * @param {string} content - The content of the link.
     */
    constructor(content){
        super("a")
        this.props.href = "#";
        this.props.content = content;
        this.props.className = "link"

        return vNode("a",this.props, this.props.content)
    }
}