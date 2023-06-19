import { html } from "../../node_modules/lit-html/lit-html.js";
import { create } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form">
        <h2>Create Offer</h2>
        <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="title" id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" placeholder="Salary" />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit({title, imageUrl, category, description, requirements, salary}, form) {
        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            return alert('All fields are required')
        }
        const data = {
            title, imageUrl, category, description, requirements, salary
        }
        
        await create(data)
        form.reset();

        ctx.page.redirect('/catalog')
    }
}