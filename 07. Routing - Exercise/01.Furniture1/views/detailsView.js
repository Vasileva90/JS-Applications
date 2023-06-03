import { render, html } from "../node_modules/lit-html/lit-html.js"
import {get} from "../api.js";
import {onClick} from "./deleteView.js";

const furnitureTemplate = (furniture) => html`<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="../${furniture.img}" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${furniture.make}</span></p>
        <p>Model: <span>${furniture.model}</span></p>
        <p>Year: <span>${furniture.year}</span></p>
        <p>Description: <span>${furniture.description}</span></p>
        <p>Price: <span>${furniture.price}</span></p>
        <p>Material: <span>${furniture.material}</span></p>
        <div>
            ${furniture._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="/edit/${furniture._id}" class="btn btn-info">Edit</a>` : null}
            ${furniture._ownerId === JSON.parse(sessionStorage.getItem('userData')).id ? html`<a href="javascript:void(0)" class="btn btn-red" id="${furniture._id}">Delete</a>` : null}
        </div>
    </div>
</div>`

export async function detailsView(context) {
    let furniture = await getDetails(context.params.id);
    render(furnitureTemplate(furniture), document.querySelector('body div.container'));
    document.querySelector('.btn-red').addEventListener('click', onClick);
}

async function getDetails(id) {
    return await get(`/data/catalog/${id}`);
}