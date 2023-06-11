import { html } from '../../node_modules/lit-html/lit-html.js';
import { createTeam } from '../api/data.js';


const createTemplate = (onSubmit, errorMsg) => html`
<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`;

export async function createPage(ctx) {
    ctx.render(createTemplate(onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
      const { name, logoUrl, description } = event.target.elements;
  
      name.disabled = logoUrl.disabled = description.disabled = true;
  
      try {
        if (name.value.length < 4) throw new Error('Team name must be at least 4 characters long.');
        if (description.value.length < 10) throw new Error('Description must be at least 10 characters long.');
        if (!logoUrl.value) throw new Error('Team logo is required.');
  
        const team = await createTeam({ name: name.value, description: description.value, logoUrl: logoUrl.value });
  
        event.target.reset();
        ctx.page.redirect(`/details/${team._id}`);
      } catch (err) {
        ctx.render(createTemplate(onSubmit, err.message));
      } finally {
        name.disabled = logoUrl.disabled = description.disabled = false;
      }
    }
  }