import page from '../node_modules/page/page.mjs' 
import { render } from '../node_modules/lit-html/lit-html.js';
import { getUserData } from './util.js';
import { layoutTemplate } from './views/layout.js';
import { homePage } from './views/homePage.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { createPage } from './views/create.js';
import { myBooksPage } from './views/my-books.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';

const root = document.getElementById('container');

page(decorateCtx);
page('index.js', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/create', createPage);
page('/my-books', myBooksPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

page.start();

function decorateCtx(ctx, next){
    ctx.render = renderView;

    next();
}

function renderView(content){
    let userData = getUserData()
     render(layoutTemplate(userData, content), root);
    
}

function logoutAction(ctx){
    logout();
    ctx.page.redirect('/')

}