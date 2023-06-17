import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../data/services.js";

const catalogTemplate = (products) => html`
<h2>Fruits</h2>
        <section id="dashboard">
          ${products.length > 0 ? html`
          ${products.map(product => html`
          <div class="fruit">
            <img src="${product.imageUrl}" alt="example1" />
            <h3 class="title">${product.name}</h3>
            <p class="description">${product.description}</p>
            <a class="details-btn" href="/details/${product._id}">More Info</a>
          </div>
          `)}
          `: html`
          <h2>No fruit info yet.</h2>
          `
          }  
        </section>   
`;

export async function catalogPage(ctx) {
    const products = await getAll();
    ctx.render(catalogTemplate(products));
}