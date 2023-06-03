import page from "./node_modules/page/page.mjs";
import { catalogView } from "./views/catalogView.js";
import { loginView } from "./views/loginView.js";
import { registerView } from "./views/registerView.js";
import {logoutView} from "./views/logoutView.js";
import { createView } from "./views/createView.js";
import {detailsView} from "./views/detailsView.js";
import {editView} from "./views/editView.js";
import {myFurnituresView} from "./views/myFurnituresView.js";


export function updateNav() {
    let userNav = document.getElementById('user');
    let guestNav = document.getElementById('guest');
    if (sessionStorage.getItem('userData') == null) {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    } else {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    }
}

//Start application
updateNav();

document.getElementById('logoutBtn').addEventListener('click', logoutView);


page('/', catalogView);
page('/login', loginView);
page('/register', registerView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);
page('/my-publications', myFurnituresView)
page.start();