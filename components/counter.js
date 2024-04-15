import Component from './component.js'
import { render, diff, patch } from '../framework/engine.js'

export default class Counter extends Component {
    constructor(props) {
        super("div", props)
        this.props.className = "counter"
        this.state = this.initState();
        this.domNode = render(this)
    }

    initState() {
        return { count: 0 }
    }

    render() {
        const div = new Component("div", { className: "counter" })
        const button = new Component("button", { className: "increment" }, ["+"])
        button.actionListener('click', (e) => { this.increment() })
        const span = new Component("span", { className: "count" }, [this.state.count])
        div.addElement(button, span)
        return [div]
    }

   async increment() {
        this.setState({ count: this.state.count + 1 })
       await this.updateCount(this.state.count)
    }

   async decrement() {
        this.setState({ count: this.state.count - 1 })
       await this.updateCount(this.state.count)
    }

   async updateCount(count) {
        this.setState({ count: count })
        const patches = diff(this.domNode, this);
        const rootNode = document.getElementById('counter');
       await patch(rootNode, patches);
    }
}