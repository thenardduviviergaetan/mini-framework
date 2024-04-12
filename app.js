import { diff, getFormValues, patch, vNode } from "./framework/engine.js"
import Framework from "./framework/framework.js"
import Input from "./components/input.js"
import List from "./components/list.js"
import Form from "./components/form.js"
const win = new Framework()



win.addComponent(vNode("h1", { id: "title" }, "TO:DO List"))
const list = new List({ id: "list" })


const input = new Input({ id: "input", placeholder: "Add your task here", name: "task"})


const form = new Form({id:"task-manager"}).createForm(input);
form.onSubmit((e)=>{
    const task = getFormValues(e).task;
    list.addElement(task);
    const patches = diff(win.oldNode, list);
    patch(list,patches);
})

win.bind({
    href:"/test",
    content:"Go to test"
})

win.bind({
    href:"/",
    content:"Go back"
})
win.addComponent(form)
win.addComponent(list)
// list.addElement("Element 2")
// list.addElement("Element 3")
// list.addElement("Element 4")
// win.addComponent(test)