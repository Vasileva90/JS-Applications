import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAll } from "../data/services.js";

//TODO

const catalogTemplate = (data) => html`
//TODO
`;

export async function catalogPage(ctx) {
    const data = await getAll();
    ctx.render(catalogTemplate(data))
}