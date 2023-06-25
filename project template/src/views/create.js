import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

//TODO
const createTemplate = (onSubmit) => html`
@submit = ${onSubmit}
`;

export function createPage(ctx){
    ctx.render(createTemplate(createSubmitHandler(onSubmit)));


    //TODO
    async function onSubmit({el, el, el, el, el, el}, form){
        if(el == '' || el == '' || el == '' || el == '' || el == '' || el == ''){
            return alert('All fields are required')
        }
        await create({el, el, el, el, el, el});
        form.reset();
        //TODO
        ctx.page.redirect('/catalog')
    }
}