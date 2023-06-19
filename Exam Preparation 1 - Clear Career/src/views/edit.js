import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, update } from "../data/services.js";

const editTemplate = (offer, onSubmit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="title" .value = ${offer.title} id="job-title" placeholder="Title" />
            <input type="text" name="imageUrl" .value = ${offer.imageUrl} id="job-logo" placeholder="Company logo url" />
            <input type="text" name="category" .value = ${offer.category} id="job-category" placeholder="Category" />
            <textarea id="job-description" name="description" .value = ${offer.description} placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" .value = ${offer.requirements} placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" .value = ${offer.salary} id="job-salary" placeholder="Salary" />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`;

export async function editPage(ctx) {
    const id = ctx.params.id;
    const offer = await getById(id);

    ctx.render(editTemplate(offer, onSubmit))

    async function onSubmit(e){
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const {title,imageUrl,category,description,requirements,salary} = Object.fromEntries(formData.entries())

        if (!title || !imageUrl || !category || !description || !requirements || !salary) {
            return alert('All fields are required')
        }
        const data = {
            title, imageUrl, category, description, requirements, salary
        }
        await update(id, data);
        form.reset();
        ctx.page.redirect(`/details/${id}`)
    }
}