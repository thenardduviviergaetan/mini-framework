export default class Component {
    constructor(type) {
        this.type = type;
        this.props = {}
        this.children = []
    }
    id(id) {
        this.props.id = id;
    }
    className(...classList) {
        this.props.className = classList.join(" ")
    }
    appendChild(child) {
        // if (Array.isArray(child)){
        //     this.children = child;
        //     return;
        // }
        this.children.push(child);
    }
}