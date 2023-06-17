import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (product, onSubmit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit = ${onSubmit} class="edit-form">
              <input type="text" name="name" .value = ${product.name} id="name" placeholder="Fruit Name"/>
              <input type="text" name="imageUrl" .value = ${product.imageUrl} id="Fruit-image" placeholder="Fruit Image URL"/>
              <textarea id="fruit-description" name="description" .value = ${product.description} placeholder="Description" rows="10" cols="50"
              ></textarea>
              <textarea id="fruit-nutrition" name="nutrition" .value = ${product.nutrition} placeholder="Nutrition" rows="10" cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>
`;

export async function editPage(ctx){
    const id = ctx.params.id;
    const product = await getById(id);

    ctx.render(editTemplate(product, createSubmitHandler(onSubmit)));

    async function onSubmit({name, imageUrl, description, nutrition}, form){
        if(name == '' || imageUrl == '' || description == '' || nutrition == ''){
            return alert('All fields are required')
        }
        await update(id, {name, imageUrl, description, nutrition});
        form.reset();
        ctx.page.redirect(`/details/${id}`)
    }
}