import { html } from "../../node_modules/lit-html/lit-html.js";
import { register } from "../data/auth.js";
import { createSubmitHandler } from "../util.js";

//TODO replace acc template
const registerTemplate = (onRegister) => html`
<h1></h1>
<form @submit=${onRegister}>
 <label>Email: <input type="text" name="email"></label> 
 <label>Password: <input type="password" name="password"></label> 
 <label>Repeat: <input type="password" name="repass"></label> 
 <button>Register</button>
</form>`;




export const registerPage = (ctx)=>{
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    //TODO change user obj based on the requirements
    async function onRegister({email, password, repass}, form){
        if (email == '' || password == '') {
            return alert('All fields are required!')
        }
        if (password != repass) {
            return alert('Passowrds don\'t match')
        }

        await register(email, password);
        form.reset();

        //TODO redirect to where is said
        ctx.page.redirect('/')
    }

}