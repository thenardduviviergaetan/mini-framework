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
        this.props.className = classList.join(" ")
    }
    appendChild(child) {
        this.children.push(child);
    }

    onClick(func) {
        this.props.onclick = (event) => {
            event.preventDefault();
            func();
        };
    }
    onChange(func) {
        this.props.onchange = (event) => {
            event.preventDefault();
            func();
        };
    }
    ondblClick(func) {
        this.props.ondblclick = (event) => {
            event.preventDefault();
            func();
        };
    }
    onSubmit(func) {
        this.props.onsubmit = (event => {
            event.preventDefault();
            func();
        });
    }
}