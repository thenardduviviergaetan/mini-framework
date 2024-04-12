import Component from "./component.js";

export default class Link extends Component {
    constructor({href,content,win}){
        super("a")
        this.props.href = href;
        this.children = content;
        this.props.onclick = (e)=>{
            e.preventDefault();
            win.router.navigateTo(href)
        };
    }

}