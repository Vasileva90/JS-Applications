import {del} from "../api.js";
import page from "../node_modules/page/page.mjs";


export function onClick(event) {
    let confirmDeletion = confirm('Are you sure you want to delete this furniture?');
    if (confirmDeletion) {
        del(`/data/catalog/${event.target.id}`);
        page.redirect('/');
    }
}