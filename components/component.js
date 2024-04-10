// Component de bas extends de tout les component
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
        if (classList.length === 1 && Array.isArray(classList[0])) {
            this.props.className = classList[0].join(" ")
        } else {
            this.props.className = classList.join(" ")
        }
    }
    appendChild(child) {
        this.children.push(child);
    }
}