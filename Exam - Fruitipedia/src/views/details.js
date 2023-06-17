import { html } from "../../node_modules/lit-html/lit-html.js";
import { del, getById } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (product, deleteItem) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${product.imageUrl}" alt="example1" />
            <p id="details-title">${product.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${product.description}</p>
                    <p id="nutrition">Nutrition</p>
                   <p id = "details-nutrition">${product.nutrition}</p>
              </div>
              ${product.isOwner ? html`
              <div id="action-buttons">
            <a href="/edit/${product._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${deleteItem}>Delete</a>
          </div>
              `: null}
            </div>
        </div>
      </section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const product = await getById(id);
    const userData = getUserData();
    if(userData){
        product.isOwner = product._ownerId == userData._id;  
    }
    ctx.render(detailsTemplate(product, deleteItem));

    async function deleteItem(e){
        e.preventDefault();
        const confirmation = confirm('Are you sure?');
        if(confirmation){
            del(id);
            ctx.page.redirect('/catalog');
        }   
    }
}