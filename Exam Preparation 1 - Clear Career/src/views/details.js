import { html } from "../../node_modules/lit-html/lit-html.js";
import { applyToOffer, checkApplys, checkUserApply, del, getById } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (offer, userData, deleteOffer, apply, applications, userApply) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${offer.imageUrl}" alt="example1" />
        <p id="details-title">${offer.title}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${applications}</strong></p>
        <div id="action-buttons">
           ${offer.isOwner ? html `
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click = ${deleteOffer}>Delete</a>` : null}
            ${!offer.isOwner && userData && userApply == 0 ? html`
            <a href="javascript:void(0)" id="apply-btn" @click = ${apply}>Apply</a>` : null}
        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;

    const offer = await getById(id);
    const applications = await checkApplys(offer._id);
    const userData = getUserData();
    const userApply = await checkUserApply(offer._id, userData._id);
    offer.isOwner = offer._ownerId == userData._id;

    ctx.render(detailsTemplate(offer, userData, deleteOffer, apply, applications, userApply));

    async function deleteOffer(e){
        e.preventDefault();
        const confirmation = confirm('Are you sure?')
        if(confirmation){
            del(id);
            ctx.page.redirect('/catalog')
        }
    }

    async function apply(e){
        e.preventDefault()
        applyToOffer(offer._id);
        ctx.page.redirect(`/details/${id}`)
    }
}