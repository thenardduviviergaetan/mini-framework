// Component de bas extends de tout les component
export default class Component {
    constructor(type, props, children) {
        this.type = type;
        // this.props = {}
        this.props = props !== undefined ? props : {};
        this.children = children !== undefined ? children : [];
    }
    className(...classList) {
        this.props.className = classList.join(" ")
    }
    addChild(child) {
        this.children.push(child);
    }

    clearChildren(){
        for (let child of this.children) {
            child.remove();
        }
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
            func(event.target);
            event.target.children[0].value = ''
        });
    }
}