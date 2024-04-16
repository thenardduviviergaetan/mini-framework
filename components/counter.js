import Component from './component.js'
import { render, diff, patch } from '../framework/engine.js'

/**
 * Represents a Counter component.
 * @class
 * @extends Component
 */
export default class Counter extends Component {
    /**
     * Creates an instance of Counter.
     * @constructor
     * @param {Object} props - The properties for the Counter component.
     */
    constructor(props) {
        super("span", props);
        this.children = "0 item left!";
        this.props.className = "counter";
        this.domNode = render(this);
    }

    /**
     * Updates the count and re-renders the Counter component.
     * @param {number} count - The new count value.
     */
    updateCount(count) {
        this.oldNode = this.domNode;
        this.children = count > 1 ? `${count} items left!` : `${count} item left!`;
        const patches = diff(this.oldNode, this);
        const rootNode = document.getElementById(this.props.id);
        patch(rootNode, patches);
        this.domNode = render(this);
    }
}