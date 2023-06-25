import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

//TODO Replace with actual view

const registerTemplate = (onSubmit) => html`
@submit = ${onSubmit}
`;

export function registerPage(ctx){
    ctx.render(registerTemplate(createSubmitHandler(onSubmit)));
    //TODO change user object
    async function onSubmit({email, password, rePass}, form){
        if(email == '' || password == ''){
            return alert('All fields are required')
        }
        if(password != rePass){
            return alert('Password don\'t match')
        }
        await register(email, password);
        form.reset();
        //TODO use redirect from requirements
        ctx.page.redirect('/')
    }
}