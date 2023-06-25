import { html } from "../../node_modules/lit-html/lit-html.js";
import { del, getById, getLikes, getUserLike, like } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (element, likes, deleteItem, likeItem, userLike) => html`
`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    //const likes = await getLikes(id);
    const element = await getById(id);
    const userData = getUserData();
    //TODO
    if(userData){
        element.isOwner = element._ownerId == userData._id;
        const userLike = await getUserLike(id, userData._id);
        ctx.render(detailsTemplate(element, likes, deleteItem, likeItem, userLike))
    }else{
        ctx.render(detailsTemplate(element, likes, deleteItem, likeItem))
    }

    async function deleteItem(e){
        e.preventDefault();
        const confirmation = confirm('Are you sure?');
        if(confirmation){
            del(id);
            ctx.page.redirect('/catalog')
        }   
    }
    //TODO
    // async function likeItem(e){
    //     e.preventDefault();
    //     like(element._id);
    //     ctx.page.redirect(`/details/${id}`)
    // }
}