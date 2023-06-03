import { render, html } from "../node_modules/lit-html/lit-html.js"
import {post} from "../api.js";
import { updateNav } from "../app.js";
import page from "../node_modules/page/page.mjs";


const loginTemplate = () => html`
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit="${onSubmit}">
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="email">Email</label>
                    <input class="form-control" id="email" type="text" name="email">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="password">Password</label>
                    <input class="form-control" id="password" type="password" name="password">
                </div>
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>`

export function loginView() {
    render(loginTemplate(), document.querySelector('body div.container'));
}

async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let data = await post('/users/login', {email, password});

    let userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    }
    sessionStorage.setItem('userData', JSON.stringify(userData));
    updateNav();
    page.redirect('/');
}