import Component from './component.js'
import { render, diff, patch } from '../framework/engine.js'

export default class Counter extends Component {
    constructor(props) {
        super("span", props)
        this.children = "0 items left !"
        this.props.className = "counter"
        this.domNode = render(this)
    }

    updateCount(count) {
        this.oldNode = this.domNode;
        this.children = `${count} items left !`
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById(this.props.id);
        patch(rootNode, patches);
        this.domNode = render(this);
    }
}