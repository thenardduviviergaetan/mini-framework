import { AuthButton, LoginPage, RegisterPage, HomePage, PostsPage, SinglePostPage, ProfilePage, ChatStatus } from "./pages_creator.js";
export class Renderer {
    constructor() {
        this.container = document.getElementById('container');
        this.fragment = document.createDocumentFragment();
        this.login = new LoginPage();
        this.register = new RegisterPage();
        this.home = new HomePage();
        this.posts = new PostsPage();
        this.post = new SinglePostPage();
        this.profile = new ProfilePage();
    }
    async clearPage() {
        const page = this.container.querySelectorAll('.page');
        if (page) page.forEach(element => {
            element.remove();
        });
    }
    async displayPage(page, data = null) {
        const errMsg = document.getElementById('error-msg');
        errMsg.innerHTML = "";
        AuthButton.generate(page);
        let option = null;
        if (page.includes("#")) [page, option] = page.split("#");
        await this[page].generate(option, data);
        this.clearPage();
        this.fragment.appendChild(this[page].page);
        this.container.appendChild(this.fragment);
    }
}