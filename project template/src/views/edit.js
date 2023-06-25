import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

//TODO
const editTemplate = (element, onSubmit) => html`
//TODO
@submit = ${onSubmit}
.value = ${element.something} 
`;

export async function editPage(ctx){
    const id = ctx.params.id;
    const element = await getById(id);

    ctx.render(editTemplate(element, createSubmitHandler(onSubmit)));

    async function onSubmit({el, el, el, el, el, el}, form){
        if(el == '' || el == '' || el == '' || el == '' || el == '' || el == ''){
            return alert('All fields are required')
        }

        await update(id, {el, el, el, el, el, el});
        form.reset();

        ctx.page.redirect(`/details/${id}`)
    }
}