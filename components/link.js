import { vNode } from "../framework/engine.js";
import Component from "./component.js";

export default class Link extends Component {
    constructor(content){
        super("a")
        this.props.href = "#";
        this.props.content = content;
        this.props.className = "link"

        return vNode("a",this.props, this.props.content)
    }

}