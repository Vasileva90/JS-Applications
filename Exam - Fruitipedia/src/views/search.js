import { html } from "../../node_modules/lit-html/lit-html.js";
import { search } from "../data/services.js";
import { getUserData } from "../util.js";

const searchTemplate = (searchAlbum) => html`
<section id="search">
<div class="form">
  <h2>Search</h2>
  <form class="search-form">
    <input type="text" name="search" id="search-input"/>
    <button class="button-list" @click = ${searchAlbum}>Search</button>
  </form>
</div>
<h4>Results:</h4>
</section>
`;

const resultTemplate = (searchAlbum, result, userData) => html`
<section id="search">

<div class="form">
  <h2>Search</h2>
  <form class="search-form">
    <input type="text" name="search" id="search-input"/>
    <button class="button-list" @click = ${searchAlbum}>Search</button>
  </form>
</div>
<h4>Results:</h4>
${result.length > 0 ? html`
<div class="search-result">
    ${result.map(el => html`
    <div class="fruit">
  <img src="${el.imageUrl}" alt="example1" />
  <h3 class="title">${el.name}</h3>
  <p class="description">${el.description}</p>
      ${userData ? html`
      <a class="details-btn" href="/details/${el._id}">More Info</a>
      `: null} 
</div>
    `)}
`: html `
<p class="no-result">No result.</p>
`
}
  </div>
        </section>
`;

export function searchPage(ctx) {
    const userData = getUserData();
    ctx.render(searchTemplate(searchAlbum));


    async function searchAlbum(e) {
        e.preventDefault();
        const input = document.getElementById('search-input');
        const result = await search(input.value);
        ctx.render(resultTemplate(searchAlbum, result, userData));
    }
}