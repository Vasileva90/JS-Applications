import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

async function getAllItems() {
    const response = await fetch(url);
    let data = await response.json();
    return data;
}

let items = Object.values(await getAllItems());

let cardTemplate = html`${items.map(item => html`<option value=${item._id}>${item.text}</option>`)}`
let main = document.getElementById('menu');
render(cardTemplate, main);

document.querySelector('input[type="submit"]').addEventListener('click', addItem);

async function addItem(event) {
    event.preventDefault();

    let text = document.querySelector('#itemText').value;
    let response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text})
    });
    let data = await response.json();

    items.push(data);

    if (response.ok) {
        cardTemplate = html`${items.map(item => html`<option value=${item._id}>${item.text}</option>`)}`;
        render(cardTemplate, main);
    }
}