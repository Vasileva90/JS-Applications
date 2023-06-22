import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

//TODO replace acc template
const loginTemplate = (onLogin) => html`
<h1></h1>
<form @submit=${onLogin}>
 <label>Email: <input type="text" name="email"></label> 
 <label>Password: <input type="password" name="password"></label> 
 <button>Login</button>
</form>`;




export const loginPage = (ctx)=>{
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    //TODO change user obj based on the requirements
    async function onLogin({email, password}, form){
        await login(email, password);
        form.reset();

        //TODO redirect to where is said
        ctx.page.redirect('/')
    }

}