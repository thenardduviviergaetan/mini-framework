import { vNode, render } from "../framework/engine.js"
import Component from "./component.js"

export default class Counter extends Component {
    constructor(tag, props, children) {
        super(tag, props, children);
        this.domNode = render(this);
    }

    initState() {
        return { count: 0 };
    }

    increment() {
        this.setState({ count: this.state.count + 1 });
    }

    decrement() {
        this.setState({ count: this.state.count - 1 });
    }

    render() {
        return vNode(this.tag, this.props, `Count: ${this.state.count}`);
    }

    update() {
        this.domNode = render(this);
    }
    
    onClick(func) {
        this.props.onclick = (event) => {
            event.preventDefault();
            func();
        };
    }
}