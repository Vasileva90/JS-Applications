import { html } from "../../node_modules/lit-html/lit-html.js";

//TODO replace acc template
const hometmplate = () => html`
<h1>Home Page</h1>
<p>Welcome</p>`




export async function homePage(ctx){
    ctx.render(hometmplate());
}